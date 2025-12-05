import { buildSEO } from "@/app/lib/seo";
import { serviceDetails } from "@/Datas/services";
import { getSeo } from "@/lib/api/apis";

export function generateStaticParams() {
  return serviceDetails.map(item => ({
    id: item.id,
  }));
}

export async function generateMetadata(props) {
    const params = await props.params;
  const service = serviceDetails.find(s => s.id === params.id);

  const seo = await getSeo("services",service.id);
  

  if (!seo) {
    return {
     title: "Business Setup in Dubai | Start Your UAE Company with ADL Business Solutions",
  description:
    "Start your business in Dubai with expert guidance from ADL Business Solutions. We handle trade licenses, approvals, and documentation to help you launch your company smoothly in Mainland, Freezone, or Offshore zones.",
  keywords:
    "Business setup in Dubai, UAE company formation, business license Dubai, mainland company setup, freezone business setup, start a company in UAE",
  canonical: "https://adlbusinesssolutions.com/services",
  type: "article",
    };
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



export default function LicenseLayout({ children }) {
  return <>{children}</>;
}
