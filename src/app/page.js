import Banner from "@/Components/Common/Banner";
import Footer from "@/Components/Footer/Footer";
import AboutSection from "@/Components/HomePage/AboutSection/AboutSection";
import BlogSection from "@/Components/HomePage/BlogSection/BlogSection";
import BusinessSection from "@/Components/HomePage/BusinessSection/BusinessSection";
import Companyformation from "@/Components/HomePage/CompanyFormation/Companyformation";
import FAQSection from "@/Components/HomePage/FaqSection/FaqSection";
import HeroSection from "@/Components/HomePage/Herosection/Herosection";
import ManagerSection from "@/Components/HomePage/ManagerSection/ManagerSection ";
import PackageSection from "@/Components/HomePage/PackageSection/PackageSection";
import PartnersSection from "@/Components/HomePage/PartnersSection/PartnersSection";
import ScheduleMeeting from "@/Components/HomePage/ScheduleMeeting/ScheduleMeeting";
import BusinessServices from "@/Components/HomePage/ServiceSection/BusinessService";
import ServicesSection from "@/Components/HomePage/ServiceSection/ServiceSetion";
import SocialMediaSection from "@/Components/HomePage/SocialMediaSection/SocialMediaSection";
import SubscribeSection from "@/Components/HomePage/SubscribeSection/SubscribeSection";
import TeamSection from "@/Components/HomePage/TeamSection/TeamSection";
import TestimonialSection from "@/Components/HomePage/Testimonial/Testimonial";
import ValuesSection from "@/Components/HomePage/ValuesSection/ValuesSection";
import VisaTypesSection from "@/Components/HomePage/VisaTypes/VisaTypesSection";



export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function generateMetadata() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/seo/get-seo?page=home&t=${new Date().getTime()}`,
    { cache: "no-store" } // Ensure no caching
  );

  const data = await res.json();
  const seo = data?.data;
  

  const defaultMeta = {
    title: "Business Setup Services in UAE | ADL Business Solutions | #UAE",
    description:
      "Professional business setup services in UAE by ADL Business Solutions. Expert support for company formation, licensing, visas, and PRO services.",
    keywords:
      "business setup services uae,business setup services dubai,company formation uae,company formation services uae,business setup consultants dubai,dubai business setup,uae company formation experts,start business in dubai,business setup support dubai,business consulting dubai",
    canonical: "https://adlbusinesssolutions.com",
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
          url: "/assets/images/about/modern-infrastructure.png",
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
      images: ["/assets/images/about/modern-infrastructure.png"],
    },
  };
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <Companyformation />
      <AboutSection />
      <ScheduleMeeting />
      <ManagerSection />
      <TeamSection />
      <ServicesSection />
      <BusinessServices />
      <BusinessSection />
      <PackageSection />
      <Banner />
      <VisaTypesSection />
      <ValuesSection />
      <PartnersSection />
      <BlogSection />
      <TestimonialSection />
      <SocialMediaSection />
      <FAQSection />
      <SubscribeSection />
      <Footer />

    </div>
  );
}
