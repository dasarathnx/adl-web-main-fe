import { freezoneDetails } from "@/Datas/freezoneDetails";
import { getSeo } from "@/lib/api/apis";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export function generateStaticParams() {
  return freezoneDetails.map(item => ({
    id: String(item.id),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const freezone = freezoneDetails.find((s) => String(s.id) === String(id));

  const defaultMeta = {
    title: "Freezone Company Setup in UAE | ADL Business Solutions",
    description:
      "ADL Business Solutions offers Freezone company setup services across the UAE.",
  };

  const safeDetails = freezone
    ? {
      title:
        freezone.metaTitle ||
        "Freezone Company Setup in UAE | ADL Business Solutions",
      description:
        freezone.metaDescription ||
        "ADL Business Solutions offers Freezone company setup services across the UAE.",
    }
    : defaultMeta;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/seo/get-seo?page=freezone&innerPage=${id}`,
      { cache: "no-store" }
    );

    const data = await res.json();
    const seo = data?.data;

    const meta = seo ?? safeDetails;

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
  } catch (error) {
    return {
      metadataBase: new URL("https://adlbusinesssolutions.com"),
      ...safeDetails,
      openGraph: {
        title: safeDetails.title,
        description: safeDetails.description,
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
        title: safeDetails.title,
        description: safeDetails.description,
        images: ["/assets/images/about/modern-infrastructure.png"],
      },
    };
  }
}

export default function LicenseLayout({ children }) {
  return <>{children}</>;
}
