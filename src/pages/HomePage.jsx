import Hero from "../components/sections/Hero";
import Highlights from "../components/sections/Highlights";
import About from "../components/sections/About";
import FeaturedWork from "../components/sections/FeaturedWork";
import Faq from "../components/sections/Faq";
import CtaBand from "../components/sections/CtaBand";
import PageNav from "../components/layout/PageNav";

// The overview: who, proof, how, work, answers, and a way in to every page.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <About />
      <FeaturedWork />
      <Faq />
      <CtaBand />
      <PageNav />
    </>
  );
}
