import Education from "../components/sections/Education";
import Certifications from "../components/sections/Certifications";
import PageNav from "../components/layout/PageNav";

export default function EducationPage() {
  return (
    <>
      <Education level={1} />
      <Certifications />
      <PageNav />
    </>
  );
}
