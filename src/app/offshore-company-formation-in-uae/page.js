
import HeroSection from "@/Components/Common/HeroSection";
import InnerBanner from "@/Components/Common/InnerBanner";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import ComparisonAtAGlance from "@/Components/OffshorePage/ComparisonAtAGlance";
import OffshoreFAQAndBenefits from "@/Components/OffshorePage/OffshoreFAQAndBenefits";
import OffshoreFormationServices from "@/Components/OffshorePage/OffshoreFormationServices";
import OffshoreTypes from "@/Components/OffshorePage/OffshoreTypes";
import WhychooseOffshore from "@/Components/OffshorePage/WhychooseOffshore";
import React from "react";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function generateMetadata() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/seo/get-seo?page=offshore&t=${new Date().getTime()}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const seo = data?.data;

  const defaultMeta = {
    title:
      "Offshore Company Formation in UAE | Dubai, RAK & Ajman Offshore | ADL Business Solutions",
    description:
      "Set up your UAE offshore company with ADL Business Solutions. We provide fast & compliant offshore company formation in Dubai, RAK, and Ajman with bank account assistance, documentation, and full advisory. Start your tax-efficient global business today.",
    keywords:
      "UAE offshore company, Dubai offshore setup, RAK offshore company formation, Ajman offshore business setup, tax-free UAE company, offshore bank account UAE, business setup UAE, ADL Business Solutions",
    canonical:
      "https://adlbusinesssolutions.com/offshore-company-formation-in-uae",
  };

  const meta = seo ?? defaultMeta;

  return {
    metadataBase: new URL("https://adlbusinesssolutions.com"),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: meta.canonical,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      siteName: "ADL Business Solutions",
      images: [
        {
          url: "/assets/images/offshore/offshore-company-formation.png",
          width: 1200,
          height: 630,
          alt: "ADL Business Solutions",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/assets/images/offshore/offshore-company-formation.png"],
    },
  };
}


const page = () => {
  return (
    <div>
      <Navbar />
      <HeroSection
        title={"Offshore Company"}
        subTitle={"Formation in UAE"}
        decription={"we help you establish a compliant, tax-efficient, and globally recognized offshore entity in the UAE — offering confidential structure, 100% foreign ownership, and international banking support."}
        buttonText={"Get a Free Consultation"}
        url={"#schedule-meeting"} />

      <WhychooseOffshore />
      <OffshoreTypes />
      <OffshoreFormationServices />
      <ComparisonAtAGlance />
      <OffshoreFAQAndBenefits />
      <InnerBanner title={"Start Your UAE Offshore Company Today"} description={"Vorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit"} buttonText={"Book a Free Consultation"} />

      <Footer />
    </div>
  );
};

export default page;
