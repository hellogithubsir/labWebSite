import { PageShell } from "@/components/page-shell";
import { Hero } from "@/components/home/hero";
import { IntroCopy } from "@/components/home/intro-copy";
import { Spotlight } from "@/components/home/spotlight";
import { QuickLinksStrip, SchwarzmanLogo } from "@/components/home/quick-links";

export default function Home() {
  return (
    <PageShell variant="home">
      <Hero />
      <IntroCopy />
      <Spotlight />
      <QuickLinksStrip />
      <SchwarzmanLogo />
    </PageShell>
  );
}
