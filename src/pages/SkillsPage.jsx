import SkillsAnalytics from "../components/sections/SkillsAnalytics";
import PageNav from "../components/layout/PageNav";

export default function SkillsPage() {
  return (
    <>
      <SkillsAnalytics index={3} level={1} />
      <PageNav />
    </>
  );
}
