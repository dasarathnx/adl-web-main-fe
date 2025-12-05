import { buildSEO } from "@/app/lib/seo";
import { blogs } from "@/Datas/blogs";
import { visaDetails } from "@/Datas/visaData";
import { getSeo } from "@/lib/api/apis";

export function generateStaticParams() {
  return visaDetails.map(item => ({
    id: item.id,
  }));
}
export async function generateMetadata(props) {
      const params = await props.params;

  const visa = visaDetails.find(s => s.id === params.id);

  const seo = await getSeo("visa",visa.id);
  

  if (!seo) {
    return {
  title: "UAE Employment Visa Processing | Work Visa UAE | ADL Business Solutions",
  description:
    "Fast and reliable UAE employment visa services. Work permit, medical, Emirates ID & residency stamping support by ADL Business Solutions.",
  keywords:
    "UAE work visa, Dubai employment visa, UAE labour visa, residency visa UAE",
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
