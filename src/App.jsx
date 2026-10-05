import PrefsProvider from "./context/PrefsProvider";
import UIProvider from "./context/UIProvider";
import { NAV } from "./data/meta";
import { useScrollSpy } from "./hooks/useScrollSpy";

import CustomCursor from "./components/common/CustomCursor";
import GridBackground from "./components/layout/GridBackground";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PrintResume from "./components/layout/PrintResume";

import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import SkillsAnalytics from "./components/sections/SkillsAnalytics";
import Education from "./components/sections/Education";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";

import ProjectDetailModal from "./components/modals/ProjectDetailModal";
import CommandPalette from "./components/modals/CommandPalette";
import ResumeModal from "./components/modals/ResumeModal";

const SPY_IDS = NAV.map((n) => n.id);

function Site() {
  const active = useScrollSpy(SPY_IDS);
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <GridBackground />
      <CustomCursor />
      <Navbar active={active} />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <SkillsAnalytics />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <ProjectDetailModal />
      <ResumeModal />
      <CommandPalette />
      <PrintResume />
    </>
  );
}

export default function App() {
  return (
    <PrefsProvider>
      <UIProvider>
        <Site />
      </UIProvider>
    </PrefsProvider>
  );
}
