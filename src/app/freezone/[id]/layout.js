import { buildSEO } from "@/app/lib/seo";
import { freezoneDetails } from "@/Datas/freezoneDetails";
import { getSeo } from "@/lib/api/apis";

export function generateStaticParams() {
  return freezoneDetails.map(item => ({
    id: item.id,
  }));
}

export async function generateMetadata(props) {
  const params = await props.params;
  const freezone = freezoneDetails.find(s => s.id === params.id);

  const seo = await getSeo("freezone", freezone.id);


  if (!seo) {
    return {
      title: "Freezone Company Setup in UAE | 100% Ownership | ADL Business Solutions",
      description:
        "ADL Business Solutions offers Freezone company setup services in Dubai, Abu Dhabi, Sharjah, and across the UAE. Get 100% foreign ownership, zero tax, and quick licensing for your business.",
      keywords:
        "UAE Freezone company setup, Dubai Freezone license, business setup in UAE, start business in Freezone, 100% ownership UAE, Freezone consultancy Dubai, ADL Business Solutions",
      canonical: "https://adlbusinesssolutions.com/freezone-company-setup",
      type: "article",
      image: "/assets/images/freezone/uae-freezone-business-setup-service.png",
    };
  }

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical,
      image: "/assets/images/freezone/uae-freezone-business-setup-service.png",

    },
  };
}

export default function LicenseLayout({ children }) {
  return <>{children}</>;
}
