import HeroSection from "@/Components/Common/HeroSection";
import InnerBanner from "@/Components/Common/InnerBanner";
import ContactForm from "@/Components/Contact/ContactForm";
import Footer from "@/Components/Footer/Footer";
import PartnersSection from "@/Components/HomePage/PartnersSection/PartnersSection";
import ScheduleMeeting from "@/Components/HomePage/ScheduleMeeting/ScheduleMeeting";
import Navbar from "@/Components/Navbar/Navbar";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export async function generateMetadata() {
   const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/seo/get-seo?page=contact`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const seo = data?.data;


  if (!seo) {
    return {
  title: "Contact ADL Business Solutions | Company Setup in Dubai",
  description:
    "Get in touch with ADL Business Solutions, Dubai’s trusted business setup consultants. Contact us today for expert company formation, visa, and PRO support tailored to your needs. ",
  keywords:
    "best business setup consultants uae,business setup consultants dubai,company formation consultants uae,top business setup companies uae,business setup experts dubai,uae company formation advisors",
  canonical: "https://adlbusinesssolutions.com/contact",
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


export default function Contact() {
  return (
    <div>
        <Navbar/>
        <ContactForm/>
        <PartnersSection/>
        <ScheduleMeeting/>
                <InnerBanner title={"Ready to Launch Your Business in Dubai"} description={"Let ADL Business Solutions handle the paperwork while you focus on growth. We make business setup seamless, fast, and affordable."} buttonText={"Start Your Business Now"}/>
        
        <Footer/>
    </div>
  )}