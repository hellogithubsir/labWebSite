import type { ReactNode } from "react";
import styles from "./AdvantageDiagram.module.css";

type DiagramKind = "hero" | "distillation" | "orchestration" | "edge" | "runtime" | "memory" | "selection" | "device" | "learning";
type GlyphKind = "network" | "compact" | "transfer" | "knowledge" | "signal" | "context" | "interaction" | "vision" | "chip" | "skill" | "memory" | "samples" | "selected" | "verify" | "update";

function Glyph({ kind }: { kind: GlyphKind }) {
  let drawing: ReactNode;
  switch (kind) {
    case "network":
      drawing = <>{[10,24,38,52].flatMap(y => [12,25,38,51].map(target => <path key={`${y}-${target}`} d={`M9 ${y} 31 ${target}`} opacity=".35" />))}{[12,25,38,51].flatMap(y => [18,32,46].map(target => <path key={`${y}-${target}`} d={`M31 ${y} 55 ${target}`} opacity=".5" />))}{[[9,10],[9,24],[9,38],[9,52],[31,12],[31,25],[31,38],[31,51],[55,18],[55,32],[55,46]].map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" fill="var(--diagram-fill, #f3f9f9)" />)}</>;
      break;
    case "compact":
      drawing = <><path d="m18 20 28 12-28 12V20Zm0 0 14 12-14 12M32 32h14" /><circle cx="18" cy="20" r="4" /><circle cx="18" cy="44" r="4" /><circle cx="32" cy="32" r="4" /><circle cx="46" cy="32" r="4" /></>;
      break;
    case "transfer":
      drawing = <><path d="M14 15h36L37 32v13l-10 5V32L14 15Z" /><path d="M23 22h18M28 28h8" /></>;
      break;
    case "knowledge":
      drawing = <><path d="M14 15h17v36H14zM36 15h14v36H36zM19 22h7M19 29h7M41 22h4M41 29h4M19 44h7M41 44h4" /></>;
      break;
    case "signal":
      drawing = <><path d="M10 32h7l5-15 9 30 7-24 5 9h11" /><path d="M12 12v40M52 12v40" opacity=".35" /></>;
      break;
    case "context":
      drawing = <><circle cx="32" cy="32" r="17" /><circle cx="32" cy="32" r="7" /><path d="M32 7v8M32 49v8M7 32h8M49 32h8" /></>;
      break;
    case "interaction":
      drawing = <><path d="M12 15h40v29H29L18 52v-8h-6V15Z" /><path d="M21 25h22M21 33h15" /></>;
      break;
    case "vision":
      drawing = <><path d="M12 23V12h11M41 12h11v11M52 41v11H41M23 52H12V41" /><rect x="22" y="22" width="20" height="20" rx="2" /><path d="M16 32h32M32 16v32" opacity=".4" /></>;
      break;
    case "chip":
      drawing = <><rect x="18" y="18" width="28" height="28" rx="3" /><rect x="25" y="25" width="14" height="14" rx="1" /><path d="M25 10v8M39 10v8M25 46v8M39 46v8M10 25h8M10 39h8M46 25h8M46 39h8" /></>;
      break;
    case "skill":
      drawing = <><path d="m23 20-13 12 13 12M41 20l13 12-13 12M36 15l-8 34" /></>;
      break;
    case "memory":
      drawing = <><ellipse cx="32" cy="17" rx="19" ry="7" /><path d="M13 17v30c0 9 38 9 38 0V17M13 27c0 9 38 9 38 0M13 37c0 9 38 9 38 0" /></>;
      break;
    case "samples":
    case "selected":
      drawing = <>{Array.from({ length: kind === "selected" ? 6 : 20 }, (_, index) => {
        const columns = kind === "selected" ? 2 : 4;
        const size = kind === "selected" ? 10 : 6;
        const gap = kind === "selected" ? 22 : 13;
        const x = (kind === "selected" ? 16 : 8) + (index % columns) * gap, y = (kind === "selected" ? 7 : 4) + Math.floor(index / columns) * (kind === "selected" ? 18 : 12);
        const common = { fill: "currentColor", opacity: .3 + (index % 3) * .3 };
        return index % 3 === 1 ? <circle key={index} cx={x + size / 2} cy={y + size / 2} r={size / 2} {...common} /> : index % 3 === 2 ? <path key={index} d={`M${x + size / 2} ${y} ${x + size} ${y + size} ${x} ${y + size}Z`} {...common} /> : <rect key={index} x={x} y={y} width={size} height={size} rx="1" {...common} />;
      })}</>;
      break;
    case "verify":
      drawing = <><circle cx="32" cy="32" r="21" /><path d="m21 32 8 8 15-17" /></>;
      break;
    case "update":
      drawing = <><path d="M49 25a19 19 0 0 0-33-6l-5 7M11 14v12h12M15 39a19 19 0 0 0 33 6l5-7M53 50V38H41" /></>;
      break;
  }
  return <svg className={styles.glyph} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{drawing}</svg>;
}

function Node({ label, glyph, accent = false }: { label: string; glyph?: GlyphKind; accent?: boolean }) {
  return <div className={styles.node} data-accent={accent}>{glyph && <Glyph kind={glyph} />}<span>{label}</span></div>;
}

function Arrow({ reverse = false }: { reverse?: boolean }) {
  return <svg className={styles.arrow} data-reverse={reverse} viewBox="0 0 40 20" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M2 10h34m-6-5 6 5-6 5" /></svg>;
}

export function AdvantageDiagram({ kind, labels, description }: { kind: DiagramKind; labels: readonly string[]; description: string }) {
  let content: ReactNode;
  switch (kind) {
    case "hero":
      content = <div className={styles.layers}>
        <svg className={styles.planes} viewBox="0 0 280 300" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
          {[0, 1, 2].map(index => <g key={index} transform={`translate(0 ${index * 82})`}>
            <path d="m16 66 120-48 128 48-128 50Z" fill="var(--diagram-fill, #f3f9f9)" stroke="var(--diagram-accent, #009d92)" />
            <path d="m46 54 120 50M76 42l120 50M106 30l120 50M46 78l120-48M76 90l120-48M106 102l120-48" opacity=".1" />
            {index === 0 ? <><path d="M49 67c17 18 24-37 42-18s21 37 41 3 30 12 45 7 16-22 34-6" stroke="var(--diagram-accent, #009d92)" strokeWidth="2" />{[[49,67],[91,49],[132,52],[177,59],[211,53]].map(([cx,cy]) => <circle key={cx} cx={cx} cy={cy} r="3" fill="var(--diagram-accent, #009d92)" />)}</> : index === 1 ? <><path d="m60 61 43 16 38-34 58 22-62 28-34-16" />{[[60,61],[103,77],[141,43],[199,65],[137,93]].map(([cx,cy]) => <g key={cx}><circle cx={cx} cy={cy} r="7" fill="var(--diagram-fill, #f3f9f9)" /><circle cx={cx} cy={cy} r="2" fill="var(--diagram-accent, #009d92)" /></g>)}</> : <><path d="m57 64 28-12 31 13-29 13Zm75-17 23-9 23 9-23 10Zm5 36 31-12 31 12-31 13Z" /><path d="M57 64v9l30 14 29-13v-9M132 47v10l23 10 23-10V47M137 83v7l31 13 31-13v-7M87 78v9M155 57v10M168 96v7" opacity=".55" /></>}
          </g>)}
        </svg>
        <div className={styles.planeLabels}>{labels.map(label => <span key={label}>{label}</span>)}</div>
      </div>;
      break;
    case "distillation":
    case "edge":
    case "selection": {
      const glyphs: readonly GlyphKind[] = kind === "distillation" ? ["network", "transfer", "compact"] : kind === "edge" ? ["vision", "transfer", "chip"] : ["samples", "transfer", "selected"];
      content = <div className={styles.flow}>{labels.map((label, index) => <div className={styles.step} key={label}><Node label={label} glyph={glyphs[index]} accent={index === 1} />{index < 2 && <Arrow />}</div>)}</div>;
      break;
    }
    case "orchestration":
      content = <div className={styles.converge}><div className={styles.inputs}><Node label={labels[0]} glyph="knowledge" /><Node label={labels[1]} glyph="signal" /></div><div className={styles.junction}><Arrow /></div><Node label={labels[2]} glyph="context" accent /><Arrow /><Node label={labels[3]} glyph="interaction" /></div>;
      break;
    case "runtime":
      content = <div className={styles.runtime}><Node label={labels[0]} glyph="skill" accent /><Arrow /><div className={styles.environments}>{labels.slice(1, 4).map(label => <Node label={label} glyph="chip" key={label} />)}</div><div className={styles.feedback}><Arrow reverse /><span>{labels[4]}</span></div></div>;
      break;
    case "memory":
      content = <div><div className={styles.memoryLayers}>{labels.slice(0, 3).map((label, index) => <Node key={label} label={label} glyph={index === 2 ? "context" : "memory"} accent={index === 1} />)}</div><div className={styles.controls}>{labels.slice(3).map(label => <span key={label}>{label}</span>)}</div></div>;
      break;
    case "device":
      content = <div className={styles.device}><div className={styles.flow}>{labels.slice(0, 3).map((label, index) => <div className={styles.step} key={label}><Node label={label} glyph={(["signal", "update", "chip"] as const)[index]} accent={index === 1} />{index < 2 && <Arrow />}</div>)}</div><div className={styles.localMemory}><Node label={labels[3]} glyph="memory" /></div></div>;
      break;
    case "learning":
      content = <div className={styles.learning}><div className={styles.cycleTop}><Node label={labels[0]} glyph="network" /><Arrow /><Node label={labels[1]} glyph="verify" accent /></div><div className={styles.version}><span>{labels[4]}</span></div><div className={styles.cycleBottom}><Node label={labels[3]} glyph="update" /><Arrow reverse /><Node label={labels[2]} glyph="signal" /></div></div>;
      break;
  }
  return <figure className={styles.diagram} role="img" aria-label={`${description} ${labels.join(" · ")}`} data-diagram={kind}>{content}</figure>;
}
