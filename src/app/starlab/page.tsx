import type { Metadata } from "next";

import { StarlabIntro } from "@/components/starlab/starlab-intro";

export const metadata: Metadata = {
  title: "Starlab Technology",
  description: "Deterministic WebGL recreation of the Starlab technology intro.",
};

type StarlabPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function getQaFrame(value: string | undefined): number {
  if (!value || !/^\d+$/.test(value)) {
    return 0;
  }

  return Math.min(449, Number.parseInt(value, 10));
}

export default async function StarlabPage({ searchParams }: StarlabPageProps) {
  const query = await searchParams;
  const qaMode = getSingleValue(query.qa) === "1";
  const requestedFrame = getQaFrame(getSingleValue(query.frame));

  return (
    <StarlabIntro
      frame={requestedFrame}
      mode={qaMode ? "fixed" : "autoplay"}
    />
  );
}
