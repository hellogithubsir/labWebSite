"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type React from "react";

import styles from "./circuit-scene.module.css";

export type CircuitRenderer = "webgl" | "fallback";

export type CircuitSceneProps = {
  frame: number;
  className?: string;
  onRendererChange?: (renderer: CircuitRenderer) => void;
};

type SceneResources = {
  program: WebGLProgram;
  vertexShader: WebGLShader;
  fragmentShader: WebGLShader;
  buffer: WebGLBuffer;
  positionLocation: number;
  resolutionLocation: WebGLUniformLocation;
  frameLocation: WebGLUniformLocation;
};

type WebGLLoseContextExtension = {
  loseContext: () => void;
  restoreContext: () => void;
};

const MAX_DEVICE_PIXEL_RATIO = 1.75;
const TERMINAL_FRAME = 375;
const useClientLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const VERTEX_SHADER = `
attribute vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;

uniform vec2 uResolution;
uniform float uFrame;

float saturate(float value) {
  return clamp(value, 0.0, 1.0);
}

mat2 rotate2d(float angle) {
  float sine = sin(angle);
  float cosine = cos(angle);
  return mat2(cosine, -sine, sine, cosine);
}

float sdBox(vec2 point, vec2 halfSize) {
  vec2 delta = abs(point) - halfSize;
  return length(max(delta, 0.0)) + min(max(delta.x, delta.y), 0.0);
}

float sdRoundedBox(vec2 point, vec2 halfSize, float radius) {
  vec2 delta = abs(point) - halfSize + radius;
  return min(max(delta.x, delta.y), 0.0) + length(max(delta, 0.0)) - radius;
}

float sdSegment(vec2 point, vec2 start, vec2 end) {
  vec2 segment = end - start;
  float position = clamp(dot(point - start, segment) / dot(segment, segment), 0.0, 1.0);
  return length(point - start - segment * position);
}

float roundedOutline(vec2 point, vec2 halfSize, float radius, float thickness) {
  return 1.0 - smoothstep(
    thickness,
    thickness * 2.6,
    abs(sdRoundedBox(point, halfSize, radius))
  );
}

float traceLine(vec2 point, vec2 start, vec2 end, float sharpness) {
  return exp(-sharpness * sdSegment(point, start, end));
}

float traceNode(vec2 point, vec2 center, float radius) {
  return 1.0 - smoothstep(radius, radius * 2.7, length(point - center));
}

float polylineRoute(
  vec2 point,
  vec2 first,
  vec2 second,
  vec2 third,
  vec2 fourth,
  float sharpness
) {
  return
    traceLine(point, first, second, sharpness) +
    traceLine(point, second, third, sharpness) +
    traceLine(point, third, fourth, sharpness);
}

float openRoundedRoute(
  vec2 point,
  vec2 center,
  vec2 halfSize,
  float radius,
  float thickness,
  float openingWidth
) {
  float frame = roundedOutline(point - center, halfSize, radius, thickness);
  float opening = 1.0 - smoothstep(
    openingWidth,
    openingWidth + thickness * 2.0,
    abs(point.x - center.x)
  );
  return frame * (1.0 - opening * step(center.y, point.y));
}

vec2 stageCoordinates(vec2 screenPoint) {
  float aspectRatio = uResolution.x / max(uResolution.y, 1.0);
  return vec2(
    screenPoint.x / (aspectRatio * 2.0) + 0.5,
    0.5 - screenPoint.y * 0.5
  );
}

float plateBox(vec2 point, vec2 center, vec2 halfSize, float edge) {
  float distance = sdBox(point - center, halfSize);
  return 1.0 - smoothstep(edge, edge * 2.8, distance);
}

float plateQuad(
  vec2 point,
  vec2 first,
  vec2 second,
  vec2 third,
  vec2 fourth,
  float sharpness
) {
  return
    traceLine(point, first, second, sharpness) +
    traceLine(point, second, third, sharpness) +
    traceLine(point, third, fourth, sharpness) +
    traceLine(point, fourth, first, sharpness);
}

float chipIsland(vec2 point, vec2 center, vec2 halfSize) {
  float outline = roundedOutline(point - center, halfSize, 0.018, 0.008);
  float core = plateBox(point, center, halfSize * 0.78, 0.022) * 0.22;
  return outline + core;
}

float dotPatch(vec2 point, vec2 center, vec2 halfSize, vec2 density) {
  vec2 local = point - center;
  float mask = 1.0 - smoothstep(0.0, 0.080, max(abs(local.x) - halfSize.x, abs(local.y) - halfSize.y));
  float dot = 1.0 - smoothstep(0.070, 0.150, length(fract(local * density) - 0.5));
  return dot * mask;
}

float pinStrip(vec2 point, vec2 start, vec2 end, float count) {
  vec2 axis = end - start;
  float axisLength = max(length(axis), 0.0001);
  vec2 direction = axis / axisLength;
  vec2 local = point - start;
  float along = dot(local, direction) / axisLength;
  float across = abs(local.x * direction.y - local.y * direction.x);
  float stripMask = step(0.0, along) * step(along, 1.0);
  float pin = 1.0 - smoothstep(0.16, 0.40, abs(fract(along * count) - 0.5));
  return pin * (1.0 - smoothstep(0.003, 0.009, across)) * stripMask;
}

vec2 lowAngleBoardCoordinates(
  vec2 stage,
  float horizon,
  float farWidth,
  float nearWidth
) {
  float depth = saturate((stage.y - horizon) / max(1.0 - horizon, 0.001));
  float width = mix(farWidth, nearWidth, pow(depth, 0.78));
  return vec2(0.5 + (stage.x - 0.5) / max(width, 0.002), depth);
}

float lowAngleBoardMask(vec2 board) {
  float horizontal =
    smoothstep(-0.045, 0.018, board.x) *
    (1.0 - smoothstep(0.982, 1.045, board.x));
  float vertical = smoothstep(-0.025, 0.040, board.y);
  return horizontal * vertical;
}

vec2 middleActSupportCoordinates(vec2 point, float frontality) {
  vec2 stage = stageCoordinates(point);
  float cameraProgress = smoothstep(0.25, 0.72, frontality);
  float depth = saturate((stage.y - 0.120) / 0.880);
  float projectedWidth = mix(0.780, 1.000, pow(depth, 0.72));
  float width = mix(projectedWidth, 1.000, cameraProgress);
  float projectedY = 0.120 + (stage.y - 0.120) * 0.900;

  return vec2(
    0.500 + (stage.x - 0.500) / max(width, 0.002),
    mix(projectedY, stage.y, cameraProgress)
  );
}

vec3 lowAngleBoardField(vec2 stage, float frame) {
  // Each primary route below is fixed against a measured high-salience envelope.
  // The finite dots and short support traces are deliberately low-energy support,
  // not a fabricated micro-route inventory or a board perimeter.
  float f12Envelope =
    step(0.171, stage.x) * step(stage.x, 0.856) *
    step(0.292, stage.y) * step(stage.y, 0.533);
  float f12Core =
    traceLine(stage, vec2(0.176, 0.420), vec2(0.228, 0.362), 700.0) +
    polylineRoute(stage, vec2(0.307, 0.454), vec2(0.338, 0.404), vec2(0.421, 0.404), vec2(0.425, 0.452), 620.0) +
    traceLine(stage, vec2(0.497, 0.327), vec2(0.497, 0.451), 850.0) +
    traceLine(stage, vec2(0.634, 0.391), vec2(0.773, 0.391), 850.0) +
    traceLine(stage, vec2(0.675, 0.436), vec2(0.802, 0.440), 520.0) +
    traceLine(stage, vec2(0.6583, 0.3093), vec2(0.7802, 0.3093), 660.0) +
    traceLine(stage, vec2(0.7802, 0.3093), vec2(0.8526, 0.3870), 660.0);
  float f12MacroCluster =
    polylineRoute(stage, vec2(0.316, 0.444), vec2(0.344, 0.354), vec2(0.474, 0.354), vec2(0.482, 0.426), 660.0) +
    traceLine(stage, vec2(0.355, 0.305), vec2(0.355, 0.452), 790.0) +
    traceLine(stage, vec2(0.388, 0.326), vec2(0.486, 0.326), 840.0) +
    traceLine(stage, vec2(0.404, 0.430), vec2(0.485, 0.430), 820.0);
  float f12Bloom =
    traceLine(stage, vec2(0.176, 0.420), vec2(0.228, 0.362), 112.0) +
    polylineRoute(stage, vec2(0.307, 0.454), vec2(0.338, 0.404), vec2(0.421, 0.404), vec2(0.425, 0.452), 100.0) +
    traceLine(stage, vec2(0.497, 0.327), vec2(0.497, 0.451), 148.0) +
    traceLine(stage, vec2(0.634, 0.391), vec2(0.773, 0.391), 148.0) +
    traceLine(stage, vec2(0.675, 0.436), vec2(0.802, 0.440), 86.0);
  float f12Presence = smoothstep(8.0, 12.0, frame) * (1.0 - smoothstep(30.0, 48.0, frame));

  // The inferred camera proxy is intentionally used only as a density envelope:
  // no calibration or literal board silhouette is asserted.
  vec2 f45Board = lowAngleBoardCoordinates(stage, 0.360, 0.185, 1.28);
  float f45Mask = step(0.360, stage.y) * lowAngleBoardMask(f45Board);
  float f45Routes =
    polylineRoute(f45Board, vec2(0.025, 0.920), vec2(0.105, 0.742), vec2(0.286, 0.742), vec2(0.360, 0.588), 540.0) +
    polylineRoute(f45Board, vec2(0.426, 0.950), vec2(0.430, 0.696), vec2(0.560, 0.610), vec2(0.704, 0.610), 520.0) +
    polylineRoute(f45Board, vec2(0.690, 0.945), vec2(0.692, 0.692), vec2(0.820, 0.620), vec2(0.955, 0.620), 490.0) +
    polylineRoute(f45Board, vec2(0.725, 0.835), vec2(0.775, 0.734), vec2(0.900, 0.734), vec2(0.970, 0.645), 500.0);
  float f45Macro =
    plateQuad(f45Board, vec2(0.560, 0.900), vec2(0.560, 0.610), vec2(0.740, 0.610), vec2(0.812, 0.862), 330.0) +
    plateQuad(f45Board, vec2(0.125, 0.822), vec2(0.202, 0.680), vec2(0.330, 0.680), vec2(0.355, 0.822), 390.0) +
    chipIsland(f45Board, vec2(0.420, 0.660), vec2(0.045, 0.027)) +
    chipIsland(f45Board, vec2(0.880, 0.700), vec2(0.042, 0.024));
  float f45Dots = dotPatch(
    f45Board,
    vec2(0.165, 0.760),
    vec2(0.190, 0.245),
    vec2(14.0, 13.0)
  );
  float f45Support =
    traceLine(f45Board, vec2(0.075, 0.570), vec2(0.285, 0.570), 760.0) +
    traceLine(f45Board, vec2(0.742, 0.510), vec2(0.928, 0.510), 760.0) +
    traceLine(f45Board, vec2(0.640, 0.765), vec2(0.710, 0.765), 1060.0);
  float handoff = smoothstep(45.0, 96.0, frame);
  float f45Presence = smoothstep(25.0, 45.0, frame) * (1.0 - smoothstep(76.0, 108.0, frame)) * (1.0 - handoff);

  vec2 f96Board = lowAngleBoardCoordinates(stage, 0.260, 0.235, 1.22);
  float f96Mask = step(0.260, stage.y) * lowAngleBoardMask(f96Board);
  float f96Macro =
    plateQuad(f96Board, vec2(0.215, 0.960), vec2(0.260, 0.700), vec2(0.430, 0.630), vec2(0.465, 0.960), 330.0) +
    plateQuad(f96Board, vec2(0.480, 0.960), vec2(0.480, 0.650), vec2(0.600, 0.510), vec2(0.760, 0.510), 315.0) +
    plateQuad(f96Board, vec2(0.780, 0.820), vec2(0.915, 0.770), vec2(0.925, 0.870), vec2(0.805, 0.925), 430.0) +
    traceLine(f96Board, vec2(0.740, 0.540), vec2(0.740, 0.980), 230.0);
  float f96Routes =
    polylineRoute(f96Board, vec2(0.050, 0.930), vec2(0.182, 0.720), vec2(0.360, 0.660), vec2(0.402, 0.500), 570.0) +
    polylineRoute(f96Board, vec2(0.440, 0.950), vec2(0.440, 0.670), vec2(0.580, 0.510), vec2(0.760, 0.510), 540.0) +
    polylineRoute(f96Board, vec2(0.770, 0.960), vec2(0.770, 0.650), vec2(0.900, 0.600), vec2(0.965, 0.460), 520.0) +
    traceLine(f96Board, vec2(0.820, 0.340), vec2(0.980, 0.430), 700.0);
  float f96Dots = dotPatch(
    f96Board,
    vec2(0.160, 0.735),
    vec2(0.165, 0.255),
    vec2(12.0, 10.0)
  );
  float f96Support =
    chipIsland(f96Board, vec2(0.350, 0.610), vec2(0.040, 0.025)) +
    chipIsland(f96Board, vec2(0.690, 0.590), vec2(0.052, 0.030)) +
    traceLine(f96Board, vec2(0.080, 0.520), vec2(0.310, 0.520), 820.0) +
    traceLine(f96Board, vec2(0.690, 0.430), vec2(0.925, 0.430), 840.0);
  float f96Presence = smoothstep(72.0, 96.0, frame) * (1.0 - smoothstep(104.0, 132.0, frame)) * handoff;

  float f12Signal = f12Core + f12MacroCluster * 0.88 + f12Bloom * 0.48;
  float f45Signal = (f45Routes + f45Macro * 1.08 + f45Dots * 0.68 + f45Support * 0.22) * f45Mask;
  float f96Signal = (f96Macro * 1.10 + f96Routes + f96Dots * 0.70 + f96Support * 0.34) * f96Mask;
  float signal = f12Signal * f12Presence * f12Envelope + f45Signal * f45Presence + f96Signal * f96Presence;
  float core =
    (f12Core + f12MacroCluster * 0.72) * f12Presence * f12Envelope +
    (f45Routes + f45Macro * 0.62) * f45Presence * f45Mask +
    (f96Macro + f96Routes) * f96Presence * f96Mask;

  return
    vec3(0.002, 0.030, 0.120) * signal +
    vec3(0.010, 0.145, 0.52) * signal +
    vec3(0.040, 0.45, 1.26) * core * 0.76;
}

float cameraFrontality(float frame) {
  // The camera contract is anchored at the evidence frames. Keeping it
  // piecewise makes every later visual assertion inspectable instead of
  // relying on an arbitrary easing curve.
  if (frame < 96.0) {
    return mix(0.0, 0.10, smoothstep(12.0, 96.0, frame));
  }

  if (frame < 133.0) {
    return mix(0.10, 0.25, smoothstep(96.0, 133.0, frame));
  }

  if (frame < 168.0) {
    return mix(0.25, 0.45, smoothstep(133.0, 168.0, frame));
  }

  if (frame < 192.0) {
    return mix(0.45, 0.72, smoothstep(168.0, 192.0, frame));
  }

  return mix(0.72, 1.0, smoothstep(192.0, 216.0, frame));
}

vec3 circuitFloor(vec2 point, float frame) {
  return lowAngleBoardField(stageCoordinates(point), frame);
}

vec3 glyphAssembly(vec2 point, float frame, float frontality) {
  // A4 owns the wordmark. This scene layer stays non-readable and uses only
  // the measured oblique envelopes plus faint deterministic support.
  vec2 stage = stageCoordinates(point);
  vec2 supportStage = middleActSupportCoordinates(point, frontality);
  vec2 f133Oblique = rotate2d(0.436332) * (supportStage - vec2(0.515, 0.625)) + vec2(0.515, 0.625);
  float f133Core =
    polylineRoute(stage, vec2(0.421, 0.779), vec2(0.516, 0.678), vec2(0.653, 0.548), vec2(0.830, 0.337), 235.0) +
    polylineRoute(stage, vec2(0.468, 0.742), vec2(0.574, 0.658), vec2(0.634, 0.604), vec2(0.702, 0.516), 300.0) +
    plateQuad(stage, vec2(0.406, 0.810), vec2(0.494, 0.632), vec2(0.686, 0.522), vec2(0.830, 0.734), 245.0) +
    plateQuad(stage, vec2(0.606, 0.612), vec2(0.700, 0.530), vec2(0.738, 0.568), vec2(0.646, 0.651), 245.0);
  float f133Details =
    chipIsland(stage, vec2(0.455, 0.630), vec2(0.040, 0.038)) +
    chipIsland(stage, vec2(0.568, 0.258), vec2(0.025, 0.024)) +
    traceLine(stage, vec2(0.420, 0.890), vec2(0.660, 0.970), 430.0) +
    pinStrip(stage, vec2(0.544, 0.235), vec2(0.594, 0.282), 8.0) +
    dotPatch(stage, vec2(0.3079, 0.5917), vec2(0.0787, 0.0824), vec2(9.0, 10.0));
  float f133Support =
    plateQuad(f133Oblique, vec2(0.205, 0.720), vec2(0.495, 0.720), vec2(0.540, 0.795), vec2(0.255, 0.795), 285.0) +
    openRoundedRoute(f133Oblique, vec2(0.600, 0.530), vec2(0.095, 0.140), 0.022, 0.008, 0.030) +
    traceLine(f133Oblique, vec2(0.640, 0.400), vec2(0.855, 0.400), 430.0);
  float f133Presence = smoothstep(108.0, 133.0, frame) * (1.0 - smoothstep(151.0, 174.0, frame));

  vec2 f168Oblique = rotate2d(-0.174533) * (stage - vec2(0.555, 0.365)) + vec2(0.555, 0.365);
  float f168Core =
    polylineRoute(stage, vec2(0.348, 0.249), vec2(0.348, 0.106), vec2(0.416, 0.055), vec2(0.416, 0.055), 330.0) +
    plateQuad(stage, vec2(0.378, 0.005), vec2(0.494, 0.005), vec2(0.494, 0.137), vec2(0.378, 0.137), 245.0) +
    plateQuad(stage, vec2(0.647, 0.342), vec2(0.766, 0.378), vec2(0.744, 0.458), vec2(0.647, 0.422), 250.0) +
    traceLine(stage, vec2(0.658, 0.519), vec2(0.658, 0.693), 440.0) +
    traceLine(stage, vec2(0.845, 0.680), vec2(0.910, 0.760), 510.0);
  float f168Mass =
    plateQuad(f168Oblique, vec2(0.323, 0.115), vec2(0.492, 0.085), vec2(0.565, 0.265), vec2(0.385, 0.310), 260.0) +
    plateQuad(f168Oblique, vec2(0.476, 0.430), vec2(0.670, 0.345), vec2(0.787, 0.535), vec2(0.600, 0.635), 255.0) +
    openRoundedRoute(f168Oblique, vec2(0.655, 0.330), vec2(0.120, 0.180), 0.030, 0.008, 0.026) +
    polylineRoute(f168Oblique, vec2(0.420, 0.720), vec2(0.530, 0.660), vec2(0.620, 0.680), vec2(0.690, 0.590), 360.0);
  float f168Details =
    pinStrip(stage, vec2(0.382, 0.020), vec2(0.486, 0.020), 11.0) +
    pinStrip(stage, vec2(0.662, 0.688), vec2(0.748, 0.688), 8.0) +
    dotPatch(stage, vec2(0.790, 0.830), vec2(0.200, 0.167), vec2(12.0, 10.0)) +
    chipIsland(stage, vec2(0.690, 0.550), vec2(0.023, 0.045));
  float f168Presence = smoothstep(146.0, 168.0, frame) * (1.0 - smoothstep(180.0, 192.0, frame));

  float core = f133Core * f133Presence + (f168Core + f168Mass * 0.72) * f168Presence;
  float details =
    (f133Details + f133Support * 0.12) * f133Presence +
    (f168Details + f168Mass * 0.14) * f168Presence;
  float bloom =
    f133Core * f133Presence * 0.54 +
    (f168Core + f168Mass * 0.36) * f168Presence * 0.48 +
    details * 0.20;

  return
    vec3(0.004, 0.055, 0.22) * (core + details * 0.54) +
    vec3(0.018, 0.24, 0.76) * bloom +
    vec3(0.034, 0.46, 1.22) * core * 0.78;
}

vec3 obliqueAssemblyBoard(vec2 point, float frame, float frontality) {
  // f192 is the near-frontal handoff: measured peripheral core paths remain
  // behind A4's verified DOM logo, with deterministic low-energy support.
  // The support coordinates are not measurement evidence.
  vec2 stage = stageCoordinates(point);
  vec2 supportStage = middleActSupportCoordinates(point, frontality);
  float upperRight =
    polylineRoute(stage, vec2(0.871, 0.110), vec2(0.970, 0.110), vec2(0.970, 0.330), vec2(0.970, 0.330), 780.0) +
    polylineRoute(stage, vec2(0.943, 0.170), vec2(0.999, 0.170), vec2(0.999, 0.318), vec2(0.999, 0.318), 580.0);
  float lowerRight =
    plateQuad(stage, vec2(0.800, 0.720), vec2(0.840, 0.720), vec2(0.840, 0.910), vec2(0.800, 0.910), 470.0) +
    traceLine(stage, vec2(0.685, 0.840), vec2(0.738, 0.950), 520.0);
  float upperMid = traceLine(stage, vec2(0.480, 0.130), vec2(0.610, 0.180), 800.0);
  float leftDots = dotPatch(stage, vec2(0.240, 0.420), vec2(0.100, 0.120), vec2(9.0, 9.0));
  float peripheralSupport =
    polylineRoute(supportStage, vec2(0.660, 0.420), vec2(0.760, 0.420), vec2(0.790, 0.510), vec2(0.920, 0.510), 720.0) +
    traceLine(supportStage, vec2(0.735, 0.610), vec2(0.930, 0.610), 820.0) +
    chipIsland(supportStage, vec2(0.885, 0.470), vec2(0.045, 0.030));
  float pins = pinStrip(stage, vec2(0.805, 0.730), vec2(0.805, 0.900), 12.0);
  float presence = smoothstep(184.0, 192.0, frame) * (1.0 - smoothstep(204.0, 218.0, frame));
  float core = upperRight + lowerRight + upperMid;
  float detail = leftDots * 0.38 + pins * 0.60 +
    peripheralSupport * 0.12 + dotPatch(supportStage, vec2(0.835, 0.620), vec2(0.100, 0.055), vec2(10.0, 6.0)) * 0.07;

  return (
    vec3(0.003, 0.040, 0.16) * (core + detail) +
    vec3(0.014, 0.19, 0.62) * core * 0.62 +
    vec3(0.028, 0.37, 1.02) * (upperRight + lowerRight * 0.72)
  ) * presence;
}

vec3 rightResidualCircuit(vec2 stage, float frame) {
  // Measurements recover the residual field envelope, not its individual
  // micro-routes. These are finite, faint deterministic support fragments
  // inside those envelopes; they intentionally avoid rails, panels and grids.
  float f192Core =
    polylineRoute(stage, vec2(0.615, 0.102), vec2(0.690, 0.102), vec2(0.724, 0.185), vec2(0.812, 0.185), 1180.0) +
    polylineRoute(stage, vec2(0.700, 0.382), vec2(0.756, 0.322), vec2(0.824, 0.405), vec2(0.918, 0.405), 1080.0) +
    polylineRoute(stage, vec2(0.662, 0.742), vec2(0.734, 0.620), vec2(0.842, 0.680), vec2(0.960, 0.590), 980.0) +
    traceLine(stage, vec2(0.910, 0.080), vec2(0.985, 0.120), 1350.0);
  float f192Detail =
    traceNode(stage, vec2(0.724, 0.185), 0.005) +
    traceNode(stage, vec2(0.824, 0.405), 0.005) +
    dotPatch(stage, vec2(0.845, 0.560), vec2(0.100, 0.070), vec2(9.0, 6.0)) * 0.34;
  float f192Presence = smoothstep(184.0, 192.0, frame) * (1.0 - smoothstep(212.0, 223.0, frame));

  float f216Core =
    polylineRoute(stage, vec2(0.625, 0.062), vec2(0.752, 0.062), vec2(0.775, 0.150), vec2(0.925, 0.150), 1240.0) +
    polylineRoute(stage, vec2(0.660, 0.320), vec2(0.735, 0.380), vec2(0.782, 0.510), vec2(0.935, 0.510), 1120.0) +
    polylineRoute(stage, vec2(0.706, 0.710), vec2(0.785, 0.620), vec2(0.870, 0.660), vec2(0.995, 0.590), 1080.0) +
    polylineRoute(stage, vec2(0.814, 0.840), vec2(0.850, 0.754), vec2(0.930, 0.754), vec2(0.985, 0.690), 1180.0);
  float f216Detail =
    traceNode(stage, vec2(0.775, 0.150), 0.0045) +
    traceNode(stage, vec2(0.782, 0.510), 0.0045) +
    dotPatch(stage, vec2(0.868, 0.614), vec2(0.085, 0.058), vec2(9.0, 6.0)) * 0.30;
  float f216Presence = smoothstep(204.0, 216.0, frame) * (1.0 - smoothstep(221.0, 233.0, frame));

  float f228Core =
    polylineRoute(stage, vec2(0.620, 0.115), vec2(0.714, 0.115), vec2(0.746, 0.202), vec2(0.900, 0.202), 1320.0) +
    polylineRoute(stage, vec2(0.668, 0.418), vec2(0.735, 0.352), vec2(0.806, 0.460), vec2(0.940, 0.460), 1200.0) +
    polylineRoute(stage, vec2(0.748, 0.690), vec2(0.806, 0.604), vec2(0.900, 0.650), vec2(0.970, 0.590), 1240.0);
  float f228Detail =
    traceNode(stage, vec2(0.746, 0.202), 0.0045) +
    traceNode(stage, vec2(0.806, 0.460), 0.0045) +
    dotPatch(stage, vec2(0.865, 0.615), vec2(0.070, 0.050), vec2(8.0, 5.0)) * 0.24;
  float f228Presence = smoothstep(219.0, 228.0, frame) * (1.0 - smoothstep(244.0, 258.0, frame));

  float f252Core =
    polylineRoute(stage, vec2(0.510, 0.145), vec2(0.620, 0.145), vec2(0.676, 0.232), vec2(0.808, 0.232), 1450.0) +
    polylineRoute(stage, vec2(0.704, 0.405), vec2(0.760, 0.350), vec2(0.840, 0.455), vec2(0.966, 0.455), 1320.0) +
    polylineRoute(stage, vec2(0.800, 0.670), vec2(0.846, 0.595), vec2(0.930, 0.635), vec2(0.988, 0.585), 1420.0);
  float f252Detail =
    traceNode(stage, vec2(0.676, 0.232), 0.0040) +
    traceNode(stage, vec2(0.840, 0.455), 0.0040) +
    dotPatch(stage, vec2(0.900, 0.592), vec2(0.060, 0.040), vec2(8.0, 5.0)) * 0.19;
  float f252Presence = smoothstep(244.0, 252.0, frame) * (1.0 - smoothstep(264.0, 278.0, frame));

  float f270Core =
    polylineRoute(stage, vec2(0.662, 0.132), vec2(0.716, 0.132), vec2(0.744, 0.205), vec2(0.845, 0.205), 1580.0) +
    polylineRoute(stage, vec2(0.758, 0.410), vec2(0.804, 0.360), vec2(0.874, 0.446), vec2(0.968, 0.446), 1480.0) +
    traceLine(stage, vec2(0.872, 0.615), vec2(0.960, 0.570), 1600.0);
  float f270Detail = traceNode(stage, vec2(0.744, 0.205), 0.0038) + traceNode(stage, vec2(0.874, 0.446), 0.0038);
  float f270Presence = smoothstep(264.0, 270.0, frame) * (1.0 - smoothstep(280.0, 295.0, frame));

  float f288Core =
    polylineRoute(stage, vec2(0.758, 0.170), vec2(0.812, 0.170), vec2(0.838, 0.235), vec2(0.928, 0.235), 1820.0) +
    polylineRoute(stage, vec2(0.815, 0.480), vec2(0.850, 0.430), vec2(0.910, 0.505), vec2(0.982, 0.455), 1760.0) +
    traceLine(stage, vec2(0.880, 0.630), vec2(0.958, 0.592), 1880.0);
  float f288Detail = traceNode(stage, vec2(0.838, 0.235), 0.0033) + traceNode(stage, vec2(0.910, 0.505), 0.0033);
  float f288Presence = smoothstep(280.0, 288.0, frame) * (1.0 - smoothstep(300.0, 324.0, frame));

  // Preserve the existing moving pre-terminal tail: it keeps every f350–374
  // distinct while the scene fades to black exactly at f375.
  float terminalTailPresence = smoothstep(344.0, 351.0, frame) * (1.0 - smoothstep(374.0, 375.0, frame));
  float terminalTail = traceLine(
    stage,
    vec2(0.930 - (frame - 350.0) * 0.0014, 0.704),
    vec2(0.967 - (frame - 350.0) * 0.0014, 0.704),
    1650.0
  );

  float core =
    f192Core * f192Presence +
    f216Core * f216Presence +
    f228Core * f228Presence * 0.78 +
    f252Core * f252Presence * 0.64 +
    f270Core * f270Presence * 0.42 +
    f288Core * f288Presence * 0.20;
  float details =
    f192Detail * f192Presence +
    f216Detail * f216Presence +
    f228Detail * f228Presence * 0.72 +
    f252Detail * f252Presence * 0.54 +
    f270Detail * f270Presence * 0.34 +
    f288Detail * f288Presence * 0.16;
  vec3 residual =
    vec3(0.0018, 0.024, 0.096) * (core + details) +
    vec3(0.006, 0.105, 0.38) * core * 0.50 +
    vec3(0.012, 0.240, 0.72) * details * 0.28;

  return residual + vec3(0.002, 0.008, 0.025) * terminalTail * terminalTailPresence;
}

void main() {
  float frame = clamp(floor(uFrame + 0.5), 0.0, 375.0);

  if (frame >= 375.0) {
    gl_FragColor = vec4(vec3(0.0), 1.0);
    return;
  }

  vec2 screenPoint = (gl_FragCoord.xy * 2.0 - uResolution.xy) / uResolution.y;
  float frontality = cameraFrontality(frame);
  float planarBlend = smoothstep(202.0, 234.0, frame);
  float exitProgress = smoothstep(270.0, 338.0, frame);
  float preludeFade = 1.0 - smoothstep(156.0, 236.0, frame) * 0.52;
  float earlyReveal = smoothstep(0.0, 12.0, frame);
  vec2 floorPoint = screenPoint;
  vec2 backgroundPoint = mix(floorPoint, screenPoint, planarBlend);

  vec3 background = mix(
    vec3(0.00025, 0.00070, 0.00220),
    vec3(0.00100, 0.00320, 0.01200),
    planarBlend
  );
  float vignette = smoothstep(0.38, 1.18, length(backgroundPoint * vec2(0.76, 1.0)));
  background *= 1.0 - vignette * 0.72;

  // The reference opens with one restrained, left-of-centre trace before the
  // board plane has enough energy to be visible.
  vec2 openingCenter = vec2(-1.084, 0.181);
  float openingTrace = exp(-680.0 * sdSegment(screenPoint, vec2(-1.115, 0.181), vec2(-1.054, 0.181)));
  float openingBloom = exp(-980.0 * dot(screenPoint - openingCenter, screenPoint - openingCenter));
  float openingFade = 1.0 - smoothstep(0.0, 14.92, frame);
  // Calibrated against the frozen f0 pulse: the geometry is intentionally
  // tiny, but it must carry a visible blue-violet signal rather than render
  // as an all-black QA candidate.
  vec3 opening = (
    vec3(0.132, 0.132, 0.292) * openingTrace +
    vec3(0.010, 0.010, 0.038) * openingBloom
  ) * openingFade;

  vec3 floor = circuitFloor(floorPoint, frame) * earlyReveal * preludeFade;
  vec3 glyph = glyphAssembly(screenPoint, frame, frontality);
  float obliqueIn = smoothstep(106.0, 136.0, frame);
  float obliqueOut = 1.0 - smoothstep(198.0, 226.0, frame);
  vec3 oblique = obliqueAssemblyBoard(screenPoint, frame, frontality) * obliqueIn * obliqueOut;
  float logoReveal = smoothstep(192.0, 269.0, frame);
  float centerClear = 1.0 - smoothstep(0.16, 0.70, length(screenPoint * vec2(1.35, 1.0)));
  floor *= (1.0 - obliqueIn * 0.88) * (1.0 - planarBlend) * (1.0 - logoReveal * (0.26 + centerClear * 0.70));
  glyph *= (1.0 - planarBlend) * (1.0 - logoReveal * (0.18 + centerClear * 0.62));

  vec3 residual = vec3(0.0);

  if (frame >= 192.0) {
    residual = rightResidualCircuit(stageCoordinates(screenPoint), frame);
  }

  vec3 departingScene = background + opening + floor + glyph + oblique;
  departingScene *= 1.0 - exitProgress * 0.96;
  vec3 color = departingScene + residual;

  gl_FragColor = vec4(color, 1.0);
}
`;

function clampFrame(frame: number): number {
  if (!Number.isFinite(frame)) {
    return 0;
  }

  return Math.max(0, Math.min(TERMINAL_FRAME, Math.floor(frame)));
}

function joinClassNames(...classNames: Array<string | undefined>): string {
  return classNames.filter((className) => Boolean(className)).join(" ");
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function destroyResources(gl: WebGLRenderingContext, resources: SceneResources): void {
  gl.deleteBuffer(resources.buffer);
  gl.deleteProgram(resources.program);
  gl.deleteShader(resources.vertexShader);
  gl.deleteShader(resources.fragmentShader);
}

function createResources(gl: WebGLRenderingContext): SceneResources | null {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

  if (!vertexShader || !fragmentShader) {
    if (vertexShader) {
      gl.deleteShader(vertexShader);
    }

    if (fragmentShader) {
      gl.deleteShader(fragmentShader);
    }

    return null;
  }

  const program = gl.createProgram();

  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }

  const buffer = gl.createBuffer();

  if (!buffer) {
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }

  const positionLocation = gl.getAttribLocation(program, "aPosition");
  const resolutionLocation = gl.getUniformLocation(program, "uResolution");
  const frameLocation = gl.getUniformLocation(program, "uFrame");

  if (positionLocation < 0 || !resolutionLocation || !frameLocation) {
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );

  return {
    program,
    vertexShader,
    fragmentShader,
    buffer,
    positionLocation,
    resolutionLocation,
    frameLocation,
  };
}

export function CircuitScene({
  frame,
  className,
  onRendererChange,
}: CircuitSceneProps): React.ReactElement {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef<() => void>(() => undefined);
  const latestFrameRef = useRef(clampFrame(frame));
  // `null` is a real pending state. Reporting fallback before the WebGL
  // capability check completes makes the parent expose the static f375
  // lockup for a moment and then replay f0, which violates the intro
  // timeline. Only an actual context failure is allowed to enter fallback.
  const [renderer, setRenderer] = useState<CircuitRenderer | null>(null);
  const safeFrame = clampFrame(frame);

  useClientLayoutEffect(() => {
    if (renderer) {
      onRendererChange?.(renderer);
    }
  }, [onRendererChange, renderer]);

  useEffect(() => {
    latestFrameRef.current = safeFrame;
    drawRef.current();
  }, [safeFrame]);

  useClientLayoutEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;

    if (!host || !canvas) {
      return undefined;
    }

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
      preserveDrawingBuffer: false,
      stencil: false,
    });

    if (!gl) {
      setRenderer("fallback");
      return undefined;
    }

    const loseContextExtension = gl.getExtension(
      "WEBGL_lose_context",
    ) as WebGLLoseContextExtension | null;
    let disposed = false;
    // IntersectionObserver reports asynchronously in Chromium. A QA route
    // can therefore reach its first two RAFs before the observer callback;
    // starting false made a valid f0 silently remain black. Draw the mounted
    // stage once, then let the observer suppress later off-screen redraws.
    let isVisible = true;
    let resources: SceneResources | null = null;
    let contextReleaseRequested = false;
    let restoreOnPageShow = false;

    const setActiveRenderer = (nextRenderer: CircuitRenderer) => {
      if (!disposed) {
        setRenderer((currentRenderer) =>
          currentRenderer === nextRenderer ? currentRenderer : nextRenderer,
        );
      }
    };

    const draw = () => {
      if (disposed || !isVisible || !resources) {
        return;
      }

      gl.useProgram(resources.program);
      gl.bindBuffer(gl.ARRAY_BUFFER, resources.buffer);
      gl.enableVertexAttribArray(resources.positionLocation);
      gl.vertexAttribPointer(resources.positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resources.resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(resources.frameLocation, latestFrameRef.current);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      if (disposed) {
        return;
      }

      const bounds = host.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
      const width = Math.max(1, Math.round(bounds.width * pixelRatio));
      const height = Math.max(1, Math.round(bounds.height * pixelRatio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      draw();
    };

    const initialiseResources = () => {
      if (disposed) {
        return;
      }

      const nextResources = createResources(gl);

      if (!nextResources) {
        setActiveRenderer("fallback");
        return;
      }

      resources = nextResources;
      setActiveRenderer("webgl");
      resize();
    };

    const releaseContext = () => {
      if (contextReleaseRequested) {
        return;
      }

      if (resources) {
        destroyResources(gl, resources);
        resources = null;
      }

      // Deleting buffers and shaders is not enough for a page that gets
      // mounted/closed hundreds of times in the same Chromium process: the
      // browser can keep the underlying context until GC. Lose it explicitly
      // only after this scene is no longer active (cleanup/pagehide).
      if (!loseContextExtension) {
        return;
      }

      contextReleaseRequested = true;
      loseContextExtension.loseContext();
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      resources = null;

      if (!contextReleaseRequested) {
        setActiveRenderer("fallback");
      }
    };

    const handleContextRestored = () => {
      contextReleaseRequested = false;
      restoreOnPageShow = false;
      initialiseResources();
    };

    const handlePageHide = (event: PageTransitionEvent) => {
      // A persisted page can return from the back/forward cache. It is safe
      // to release while hidden, provided pageshow asks the extension to
      // restore before the scene becomes visible again.
      if (event.persisted && !loseContextExtension) {
        return;
      }

      restoreOnPageShow = event.persisted;
      releaseContext();
    };

    const handlePageShow = () => {
      if (
        disposed ||
        !restoreOnPageShow ||
        !contextReleaseRequested ||
        !loseContextExtension
      ) {
        return;
      }

      try {
        loseContextExtension.restoreContext();
      } catch {
        contextReleaseRequested = false;
        restoreOnPageShow = false;
        setActiveRenderer("fallback");
      }
    };

    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
    const intersectionObserver =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              isVisible = entry?.isIntersecting ?? false;

              if (isVisible) {
                resize();
              }
            },
            { threshold: 0.01 },
          );

    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("pageshow", handlePageShow);
    resizeObserver?.observe(host);
    intersectionObserver?.observe(host);

    if (!resizeObserver) {
      window.addEventListener("resize", resize);
    }

    drawRef.current = draw;
    initialiseResources();

    return () => {
      disposed = true;

      if (drawRef.current === draw) {
        drawRef.current = () => undefined;
      }

      releaseContext();
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("pageshow", handlePageShow);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();

      if (!resizeObserver) {
        window.removeEventListener("resize", resize);
      }

    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={joinClassNames(styles.root, className)}
      data-frame-state={safeFrame >= TERMINAL_FRAME ? "terminal" : "active"}
      data-renderer={renderer ?? "pending"}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={styles.canvas}
        data-starlab-scene="circuit"
        data-renderer={renderer ?? "pending"}
      />
      {renderer === "fallback" ? (
        <div aria-hidden="true" className={styles.fallback}>
          <div className={styles.fallbackGrid} />
          <div className={styles.fallbackGlow} />
        </div>
      ) : null}
    </div>
  );
}
