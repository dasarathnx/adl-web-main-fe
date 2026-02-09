
import HeroSection from "@/Components/Common/HeroSection";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import GalleryCollage from "@/Components/galleryPage/GalleryCollage";
import { getSeo } from "@/lib/api/apis";

import React from "react";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export async function generateMetadata() {
   const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/seo/get-seo?page=gallery`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const seo = data?.data;
  

  if (!seo) {
    return {
    title: "Gallery | ADL Business Solutions | Our Work & Achievements",
  description:
    "Explore the ADL Business Solutions gallery showcasing our events, client interactions, business setup achievements, and corporate milestones across the UAE.",
  keywords:
    "ADL Business Solutions gallery, UAE business setup gallery, corporate events UAE, business consultancy images, ADL achievements, Dubai business setup portfolio",
  canonical: "https://adlbusinesssolutions.com/gallery",
  type: "website",
  image: "/assets/images/gallery/gallery_img1.jpg", 
    };
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
            {/* <HeroSection
                title={"Our Gallery"}
                
                decription={"Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. cnt per "}
                
                /> */}
<GalleryCollage/>

            <Footer />
        </div>
    );
};

export default page;
