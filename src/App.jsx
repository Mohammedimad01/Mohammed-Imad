import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import PrefsProvider from "./context/PrefsProvider";
import UIProvider from "./context/UIProvider";
import RouterProvider from "./router/RouterProvider";
import { useRouter } from "./router/RouterContext";
import { usePrefs } from "./context/PrefsContext";
import { ScrollTrigger } from "./lib/gsap";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PrintResume from "./components/layout/PrintResume";

import HomePage from "./pages/HomePage";
import ExperiencePage from "./pages/ExperiencePage";
import WorkPage from "./pages/WorkPage";
import SkillsPage from "./pages/SkillsPage";
import EducationPage from "./pages/EducationPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

import ProjectDetailModal from "./components/modals/ProjectDetailModal";
import CommandPalette from "./components/modals/CommandPalette";
import ResumeModal from "./components/modals/ResumeModal";

const PAGE_COMPONENTS = {
  home: HomePage,
  experience: ExperiencePage,
  work: WorkPage,
  skills: SkillsPage,
  education: EducationPage,
  contact: ContactPage,
  notfound: NotFoundPage,
};

function Site() {
  const { page, settle } = useRouter();
  const { reducedMotion } = usePrefs();
  const t = (d) => (reducedMotion ? 0 : d);
  const Page = PAGE_COMPONENTS[page.id];

  // Web fonts change line lengths, and so every scroll trigger's position.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        {/* Old page fades out, settle() scrolls/focuses, the new one fades in;
            scroll triggers measure again once it has landed. */}
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => {
            settle();
            ScrollTrigger.refresh();
          }}
        >
          <motion.div
            key={page.id}
            className={`page page--${page.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: t(0.5), ease: [0.25, 1, 0.5, 1] } }}
            exit={{ opacity: 0, transition: { duration: t(0.2), ease: [0.65, 0, 0.35, 1] } }}
          >
            <Page />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <ProjectDetailModal />
      <ResumeModal />
      <CommandPalette />
      <PrintResume />
    </>
  );
}

export default function App({ initialPath = "/" }) {
  return (
    <PrefsProvider>
      <RouterProvider initialPath={initialPath}>
        <UIProvider>
          <Site />
        </UIProvider>
      </RouterProvider>
    </PrefsProvider>
  );
}
