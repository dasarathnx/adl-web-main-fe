
import Blogs from "@/Components/BlogPage/Blogs";
import ExclusiveBlogs from "@/Components/BlogPage/ExclusiveBlogs";
import HeroSection from "@/Components/Common/HeroSection";
import FAQ from "@/Components/Faqs/Faqs";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import { blogs } from "@/Datas/blogs";
import { getSeo } from "@/lib/api/apis";

import React from "react";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export async function generateMetadata() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/seo/get-seo?page=faqs`,
        { cache: "no-store" }
    );

    const data = await res.json();
    const seo = data?.data;

    const defaultMeta = {
        title: "Dubai Business Setup FAQs | ADL Business Solutions",
        description:
            "Find answers to the most common questions about business setup in Dubai. Learn about trade licenses, company formation, visa processing, bank accounts, and UAE legal requirements.",
        keywords:
            "Dubai business setup FAQs, UAE company formation questions, start business Dubai FAQ, trade license FAQ, ADL Business Solutions support",
        canonical: "https://adlbusinesssolutions.com/faqs",
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


const page = () => {
    return (
        <div>
            <Navbar />
            <HeroSection
                title={"Faqs"}

                decription={"Learn more about business setup, company formation, visas, compliance, and other essential UAE business services in our articles. Read more blogs to stay informed and make smarter decisions for your business. "}

            />
            <FAQ />


            <Footer />
        </div>
    );
};

export default page;
