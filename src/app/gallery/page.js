
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

  const defaultMeta = {
    title: "Gallery | ADL Business Solutions | Our Work & Achievements",
    description:
      "Explore the ADL Business Solutions gallery showcasing our events, client interactions, business setup achievements, and corporate milestones across the UAE.",
    keywords:
      "ADL Business Solutions gallery, UAE business setup gallery, corporate events UAE, business consultancy images, ADL achievements, Dubai business setup portfolio",
    canonical: "https://adlbusinesssolutions.com/gallery",
    image: "/assets/images/gallery/gallery_img1.jpg",
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
          url: "/assets/images/gallery/gallery_img1.jpg",
          width: 1200,
          height: 630,
          alt: "ADL Business Solutions",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/assets/images/gallery/gallery_img1.jpg"],
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
      <GalleryCollage />

      <Footer />
    </div>
  );
};

export default page;
