import { serviceDetails } from "@/Datas/services";
import ServiceDetailsClient from "./ServiceDetailsClient";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const service = serviceDetails.find((s) => String(s.id) === String(id));

  const defaultMeta = {
    title: "Business Setup in Dubai | ADL Business Solutions",
    description:
      "Start your business in Dubai with expert guidance from ADL Business Solutions.",
    keywords: "Business setup Dubai, UAE company formation",
  };

  if (!service) {
    return {
      metadataBase: new URL("https://adlbusinesssolutions.com"),
      ...defaultMeta,
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/seo/get-seo?page=services&innerPage=${service.id}`,
      { cache: "no-store" }
    );

    const data = await res.json();
    const seo = data?.data;

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
  } catch {
    return {
      metadataBase: new URL("https://adlbusinesssolutions.com"),
      ...defaultMeta,
      openGraph: {
        title: defaultMeta.title,
        description: defaultMeta.description,
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
        title: defaultMeta.title,
        description: defaultMeta.description,
        images: ["/assets/images/about/modern-infrastructure.png"],
      },
    };
  }
}

export default async function Page({ params }) {
  const { id } = await params;
  return <ServiceDetailsClient id={id} />;
}
