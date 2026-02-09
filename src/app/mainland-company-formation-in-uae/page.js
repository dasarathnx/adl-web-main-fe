import HeroSection from "@/Components/Common/HeroSection";
import InnerBanner from "@/Components/Common/InnerBanner";
import Footer from "@/Components/Footer/Footer";
import AboutMainland from "@/Components/mainlandPage/AboutMainland";
import FAQSection from "@/Components/mainlandPage/FaqSection";
import MainlandFormation from "@/Components/mainlandPage/MainlandFormation";
import MainlandSetup from "@/Components/mainlandPage/MainlandSetup";
import MainlandWhyChoose from "@/Components/mainlandPage/MainlandWhyChoose";
import SuggestedBlogs from "@/Components/mainlandPage/SuggestedBlogs";
import Navbar from "@/Components/Navbar/Navbar";
import { Blogposts, MainlandFaqs } from "@/Datas/mainlandData";
import { getSeo } from "@/lib/api/apis";
import React from "react";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export async function generateMetadata() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/seo/get-seo?page=mainland`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const seo = data?.data;

  const defaultMeta = {
    title:
      "Mainland Company Formation in UAE | Dubai, Abu Dhabi & Sharjah Mainland Setup | ADL Business Solutions",
    description:
      "Start your UAE mainland business with ADL Business Solutions. We offer expert mainland company setup in Dubai, Abu Dhabi, and Sharjah with full licensing, visa, office, and bank account support. 100% ownership options available.",
    keywords:
      "UAE mainland license, Dubai mainland company setup, Abu Dhabi LLC formation, Sharjah business license, mainland business setup UAE, corporate services Dubai, ADL Business Solutions, Dubai business setup consultant",
    canonical: "https://adlbusinesssolutions.com/mainland-company-formation-in-uae",
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
          url: "/assets/images/mainland/mainland-company-formation.png",
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
      images: ["/assets/images/mainland/mainland-company-formation.png"],
    },
  };
}



const page = () => {
  return (
    <div>
      <Navbar />
      <HeroSection
        title={"Mainland Company"}
        subTitle={"Formation in UAE"}
        decription={
          "Start your UAE business with full access to the local market, 100% ownership options, visa quota, and corporate banking support. ADL Business Solutions makes your mainland setup simple, fast, and fully compliant."
        }
        buttonText={"Get a Free Consultation"}
        url={"#schedule-meeting"}
      />

      <AboutMainland />
      <MainlandSetup />
      <MainlandFormation />
      <MainlandWhyChoose />
      <FAQSection faqs={MainlandFaqs} />
      <SuggestedBlogs blogs={Blogposts} />
      <InnerBanner
        title={"Start Your IFZA Freezone Company Today"}
        description={
          "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit,"
        }
        buttonText={"Book a Free Consultation"}
      />

      <Footer />
    </div>
  );
};

export default page;
