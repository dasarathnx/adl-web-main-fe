import { visaDetails } from "@/Datas/visaData";
import { getSeo } from "@/lib/api/apis";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export function generateStaticParams() {
  return visaDetails.map(item => ({
    id: String(item.id),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const visa = visaDetails.find((v) => String(v.id) === String(id));

const defaultMeta = {
  title: "UAE Visa Services | ADL Business Solutions",
  description:
    "Professional UAE visa services including employment, residency, and Golden Visa support.",
  keywords:
    "UAE visa services, Dubai visa, UAE residency visa, employment visa UAE, Golden Visa UAE, investor visa UAE, family visa UAE, business visa UAE, ADL Business Solutions",
};


  const safeDetails = visa
    ? {
      title: `${visa.title} | ADL Business Solutions`,
      description:
        visa.description ||
        "Fast and reliable UAE visa services. Work permit, medical, Emirates ID & residency stamping support.",
    }
    : defaultMeta;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/seo/get-seo?page=visa&innerPage=${id}`,
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
