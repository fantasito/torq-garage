import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import Services from "@/components/home/Services";
import Guarantees from "@/components/home/Guarantees";
import Process from "@/components/home/Process";
import PartsTeaser from "@/components/home/PartsTeaser";
import Cases from "@/components/home/Cases";
import Testimonials from "@/components/home/Testimonials";
import CtaBand from "@/components/home/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <Guarantees />
      <Process />
      <PartsTeaser />
      <Cases />
      <Testimonials />
      <CtaBand />
    </>
  );
}
