import BlogsPageClient from "@/Components/BlogPage/BlogsPageClient";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export async function generateMetadata() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/seo/get-seo?page=blog`,
    { cache: "no-store" }
  );
console.log(seo)

  const data = await res.json();
  const seo = data?.data;

  const defaultMeta = {
    title:
      "How to Start a Business in Dubai | Step-by-Step UAE Business Setup Guide",
    description:
      "Learn the full process of starting a business in Dubai. ADL Business Solutions explains licensing, registration, and legal compliance for UAE entrepreneurs.",
    keywords: "business setup Dubai, start business UAE, company formation Dubai",
    canonical: "https://adlbusinesssolutions.com/blogs",
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

export default function Page() {
  return <BlogsPageClient />;
}
