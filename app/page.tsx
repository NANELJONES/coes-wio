import Header from "./components/Header";
import AboutUs from "./components/AboutUs";
import OurObjectives from "./components/OurObjectives";
import OurImpact from "./components/OurImpact";
import Themes from "./components/Themes";
import AppreciatedPartner from "./components/AppreciatedPartner";
import SchoolPartners from "./components/SchoolPartners";
import Partners from "./components/Partners";
import AffiliatedActions from "./components/AffiliatedActions";
import FeaturedMentions from "./components/FeaturedMentions";
import SummerSchools from "./components/SummerSchools";
import ClosingSection from "./components/ClosingSection";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
// import PopUp from "./components/PopUp";


export default function Home() {
  return (
    <div
      style={{ color: "var(--primary_color)" }}
      className="flex min-h-screen w-full min-w-full flex-col pt-16"
    >
      {/* <PopUp signupHref="#contact" /> */}
      <div id="home">
        <Header />
      </div>
      <div id="about">
        <AboutUs />
      </div>
      <div id="objectives">
        <OurObjectives />
      </div>
      <div id="impact">
        <OurImpact />
      </div>
      <div id="themes">
        <Themes />
      </div>
      <div id="partners" className="bg-primary_color text-white px-4 md:px-8 lg:px-12 flex flex-col gap-4 md:gap-6 regular_div">
        <AppreciatedPartner />
        <SchoolPartners />
        <Partners />
        <div id="affiliated">
          <AffiliatedActions />
        </div>
        <FeaturedMentions />
      </div>
      <SummerSchools />
      {/* <ClosingSection /> */}
      <ContactForm
        siteName="COES-WIO"
        siteLink="https://coeswio.org"
        imageLink="/day 3/comp-1.jpg"
      />
      <Footer />
    </div>
  );
}
