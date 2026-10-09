import Education from "../components/sections/Education";
import Certifications from "../components/sections/Certifications";
import PageNav from "../components/layout/PageNav";

export default function EducationPage() {
  return (
    <>
      <Education index={4} level={1} />
      <Certifications />
      <PageNav />
    </>
  );
}
