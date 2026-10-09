import Hero from "../components/sections/Hero";
import StackTicker from "../components/sections/StackTicker";
import About from "../components/sections/About";
import FeaturedWork from "../components/sections/FeaturedWork";
import Faq from "../components/sections/Faq";
import CtaBand from "../components/sections/CtaBand";
import PageNav from "../components/layout/PageNav";

// The overview: who, what, proof, and a way in to every other page.
export default function HomePage() {
  return (
    <>
      <Hero />
      <StackTicker />
      <About index={1} />
      <FeaturedWork index={2} />
      <Faq index={3} />
      <CtaBand />
      <PageNav />
    </>
  );
}
