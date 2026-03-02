import Header from "./components/Header";
import AboutUs from "./components/AboutUs";
import OurObjectives from "./components/OurObjectives";
import OurImpact from "./components/OurImpact";
import Partners from "./components/Partners";
import Themes from "./components/Themes";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div
    style={{color: "var(--primary_color)"}}
    className="flex min-h-screen w-full min-w-full flex-col pt-16">
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
      <div id="partners">
        <Partners />
      </div>
      <div id="themes">
        <Themes />
      </div>
      <Footer />
    </div>
  );
}
