
import HeroSection from "@/Components/Common/HeroSection";
import PolicyHeroSection from "@/Components/Common/PolicyHeroSection";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import PrivacyPolicySection from "@/Components/TermsAndPolicy/policy/PrivacyPolicySection";
import TermsAndConditionsSection from "@/Components/TermsAndPolicy/Terms/TermsAndConditionsSection";
import { getSeo } from "@/lib/api/apis";
import React from "react";
export async function generateMetadata() {
  const seo = await getSeo("terms");


  if (!seo) {
    return {
      title: "Terms and Conditions | ADL Business Solutions | Business setup ",
      description:
        "Read the Terms and Conditions for using ADL Business Solutions website and services, including company formation, business setup, licensing, and support in Dubai. ",
      keywords:
        "best business setup consultants uae,business setup consultants dubai,company formation consultants uae,top business setup companies uae,business setup experts dubai,uae company formation advisors",
      canonical: "https://adlbusinesssolutions.com/terms-and-conditions",
      type: "article",
    }
  }

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical,
    },
  };
}



const page = () => {
  return (
    <div>
      <Navbar />
      <PolicyHeroSection
        title={"Terms and Conditions"}
        LastUpdationDate={"November 2025"}
      // decription={"ADL Business Solutions simplifies the entire process of company setup in Dubai and across the UAE — from trade licensing to operational compliance."} 
      // buttonText={"Get a Free Consultation"} 
      // url={"#schedule-meeting"} 
      />
      <TermsAndConditionsSection />
      <Footer />
    </div>
  );
};

export default page;
