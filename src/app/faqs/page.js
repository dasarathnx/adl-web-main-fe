
import Blogs from "@/Components/BlogPage/Blogs";
import ExclusiveBlogs from "@/Components/BlogPage/ExclusiveBlogs";
import HeroSection from "@/Components/Common/HeroSection";
import FAQ from "@/Components/Faqs/Faqs";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import { blogs } from "@/Datas/blogs";
import { getSeo } from "@/lib/api/apis";

import React from "react";
export async function generateMetadata() {
    const seo = await getSeo("faqs");


    if (!seo) {
        return {
            title: "Dubai Business Setup FAQs | ADL Business Solutions",
            description:
                "Find answers to the most common questions about business setup in Dubai. Learn about trade licenses, company formation, visa processing, bank accounts, and UAE legal requirements.",
            keywords:
                "Dubai business setup FAQs, UAE company formation questions, start business Dubai FAQ, trade license FAQ, ADL Business Solutions support",
            canonical: "https://adlbusinesssolutions.com/faqs",
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
