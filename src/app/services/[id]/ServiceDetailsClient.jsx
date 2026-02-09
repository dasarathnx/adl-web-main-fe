"use client";

import HeroSection from "@/Components/Common/HeroSection";
import InnerBanner from "@/Components/Common/InnerBanner";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import Blogs from "@/Components/ServiceDetails/blogs";
import BusinessJourney from "@/Components/ServiceDetails/BusinessJourney";
import WhyChooseDubai from "@/Components/ServiceDetails/Choose-Dubai";
import FAQSection from "@/Components/ServiceDetails/FAQSection";
import PointsSection from "@/Components/ServiceDetails/PointsSection";
import WhyChooseSection from "@/Components/ServiceDetails/WhyChooseSection";
import { serviceDetails } from "@/Datas/services";
import { blogInnerPage } from "@/lib/api/apis";
import { useEffect, useState, useMemo } from "react";

export default function ServiceDetailsClient({ id }) {
  const [blogData, setBlogData] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  const service = useMemo(() => {
    return serviceDetails.find(item => item.id === id);
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        setLoadingBlogs(true);
        const res = await blogInnerPage(id);
        setBlogData(res?.data || []);
      } catch (error) {
        console.error("Blog fetch error:", error);
        setBlogData([]);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (!service) return null;

  return (
    <div>
      <Navbar />

      <HeroSection {...service.heroSection} />

      <BusinessJourney {...service} />

      <PointsSection {...service.section2} />

      <WhyChooseSection {...service.section3} />

      <WhyChooseDubai
        {...service.section1}
        meetingTitle={service.meeting?.title}
        meetingDescription={service.meeting?.description}
      />

      <FAQSection faqs={service.faqs} />

      <Blogs blogs={blogData.length ? blogData : service.blogs} loading={loadingBlogs} />

      <InnerBanner {...service.cta} />

      <Footer />
    </div>
  );
}
