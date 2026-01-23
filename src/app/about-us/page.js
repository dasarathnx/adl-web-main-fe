import AboutScheduleMeeting from "@/Components/aboutPage/AboutScheduleMeeting";
import AboutSection from "@/Components/aboutPage/AboutSection";
import CTASection from "@/Components/aboutPage/CTASection ";
import InsightsSection from "@/Components/aboutPage/InsightsSection ";
import TeamSection from "@/Components/aboutPage/TeamSection";
import WhyChooseSection from "@/Components/aboutPage/WhyChooseSection";
import WhyUAEParallax from "@/Components/aboutPage/WhyUAEParallax ";
import HeroSection from "@/Components/Common/HeroSection";
import InnerBanner from "@/Components/Common/InnerBanner";
import Footer from "@/Components/Footer/Footer";
import ScheduleMeeting from "@/Components/HomePage/ScheduleMeeting/ScheduleMeeting";
import Navbar from "@/Components/Navbar/Navbar";
import React from "react";
import { buildSEO } from "../lib/seo";
import { getSeo } from "@/lib/api/apis";

export async function generateMetadata() {
  const seo = await getSeo("about");
  

  if (!seo) {
    return {
 title: 
 "About ADL Business Solutions | Dubai Company Formation Consultants ",
  description:
   
  "Learn about ADL Business Solutions  trusted company formation consultants in Dubai helping entrepreneurs with business setup, licensing & support services. ",
  keywords:
    "best business setup consultants uae,business setup consultants dubai,company formation consultants uae,top business setup companies uae,business setup experts dubai,uae company formation advisors",
  canonical: "https://adlbusinesssolutions.com/about-us",
  type: "article",
  image: "/assets/images/about/global-business-hub.png",
    };
  }

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical,
    },
      image: "/assets/images/about/global-business-hub.png",

  };
}

const page = () => {
  return (
    <div>
      <Navbar />
      <HeroSection 
      title={"Business Setup Consultants in UAE"} 
      decription={"ADL Business Solutions simplifies the entire process of company setup in Dubai and across the UAE — from trade licensing to operational compliance."} buttonText={"Get a Free Consultation"} url={"#schedule-meeting"} />
      <InsightsSection />
      <AboutSection />
      <AboutScheduleMeeting/>
      <WhyUAEParallax/>
      <TeamSection />
      <WhyChooseSection />
      {/* <CTASection/> */}
      <InnerBanner
        title={"Ready to Launch Your Business in Dubai"}
        description={
          "Start smart with ADL Business Solutions. We manage licensing, paperwork, and compliance so you can focus on building your business empire."
        }
        buttonText={"Start Your Business Now"}
        link={"/contact"}
      />
      <Footer />
    </div>
  );
};

export default page;
