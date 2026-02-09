
import HeroSection from "@/Components/Common/HeroSection";
import PolicyHeroSection from "@/Components/Common/PolicyHeroSection";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import PrivacyPolicySection from "@/Components/TermsAndPolicy/policy/PrivacyPolicySection";
import React from "react";
import { getSeo } from "@/lib/api/apis";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export async function generateMetadata() {
   const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/seo/get-seo?page=privacy`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const seo = data?.data;
  

  if (!seo) {
    return {
  title:
    "Company Formation in Dubai| ADL | Privacy Policy ",
  description:
    "Learn how ADL Business Solutions collects, uses, and protects your information. Read our privacy policy for company formation and business setup services in Dubai. ",
  keywords:
    "best business setup consultants uae,business setup consultants dubai,company formation consultants uae,top business setup companies uae,business setup experts dubai,uae company formation advisors",
  canonical: "https://adlbusinesssolutions.com/privacy-policy",
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
      title={"Privacy Policy"} 
      LastUpdationDate={"November 2025"}
      // decription={"ADL Business Solutions simplifies the entire process of company setup in Dubai and across the UAE — from trade licensing to operational compliance."} 
      // buttonText={"Get a Free Consultation"} 
      // url={"#schedule-meeting"} 
      />
      <PrivacyPolicySection/>
      <Footer />
    </div>
  );
};

export default page;
