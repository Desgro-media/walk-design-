import type { Metadata } from "next";
import { HeroSequence } from "@/components/HeroSequence";
import { StudioIntro } from "@/components/StudioIntro";
import { InteriorStrip } from "@/components/InteriorStrip";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HeroSequence />
      <StudioIntro />
      <InteriorStrip />
    </>
  );
}
