import Projects from "../components/sections/Projects";
import PageNav from "../components/layout/PageNav";
import { useUI } from "../context/UIContext";

export default function WorkPage() {
  // Landing on /work/<id>/ gives the case study the page's H1.
  const { landingProjectId } = useUI();
  return (
    <>
      <Projects index={2} level={landingProjectId ? 2 : 1} />
      <PageNav />
    </>
  );
}
