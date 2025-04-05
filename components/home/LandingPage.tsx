import ExperienceSection from "./ExperienceSection";
import HeroSection from "./HeroSection";
import PortfolioSection from "./PortfolioSection";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";
import Header from "../Header";
import Footer from "../Footer";

const LandingPage = () => {
  return (
    <>
      <Header />
      <main className="w-full mx-auto">
        <HeroSection />
        <PortfolioSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
