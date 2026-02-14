import BusinessGuideSection from "@/Components/BlogDetailPage/BusinessGuideSection";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
// ✅ 1. BUILD TIME: Generate all static blog pages
export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/get-blogs?page=1&limit=50`,
      { next: { revalidate: 60 } }
    );

    const data = await res.json();

    return (data?.data || []).map((blog) => ({
      slug: blog.url,
    }));
  } catch (error) {
    console.error("Static params fetch failed", error);
    return [];
  }
}

// ✅ 2. ✅ SEO METADATA PER BLOG (VERY IMPORTANT)
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/get-blog/${slug}`,
    { next: { revalidate: 60 } } // ISR
  );

  const blogRes = await res.json();
  const blog = blogRes?.data?.[0];

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "This blog does not exist.",
      metadataBase: new URL("https://adlbusinesssolutions.com"),
    };
  }

  return {
    metadataBase: new URL("https://adlbusinesssolutions.com"),
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    keywords: blog.metaKeywords || "",

    alternates: {
      canonical: blog.canonical || `/blogs/${blog.url}`,
    },

    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      url: blog.canonical || `/blogs/${blog.url}`,
      siteName: "ADL Business Solutions",
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: [blog.image],
    },
  };
}

// ✅ 3. PAGE LOAD: Fetch only ONE blog
export default async function Page({ params }) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/get-blog/${slug}`,
    { next: { revalidate: 60 } } // ISR

  );

  const blog = await res.json();

  if (!blog?.data?.length) {
redirect("/blogs");
  }

  const blogData = blog.data[0];

  return (
    <div>
      <Navbar />
      <BusinessGuideSection blog={blogData} />
      <Footer />
    </div>
  );
}
