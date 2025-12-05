import { buildSEO } from "@/app/lib/seo";
import { licenseDetails } from "@/Datas/licenseDetails";
import { getSeo } from "@/lib/api/apis";

export function generateStaticParams() {
  return licenseDetails.map(item => ({
    id: item.id,
  }));
}
export async function generateMetadata(props) {
      const params = await props.params;

  const license = licenseDetails.find(s => s.id === params.id);

  const seo = await getSeo("license",license.id);
  

  if (!seo) {
    return {
  title: "UAE Employment Visa Processing | Work Visa UAE | ADL Business Solutions",
  description:
    "Fast and reliable UAE employment visa services. Work permit, medical, Emirates ID & residency stamping support by ADL Business Solutions.",
  keywords:
    "UAE work visa, Dubai employment visa, UAE labour visa, residency visa UAE",
  canonical: "https://adlbusinesssolutions.com/freezone-company-setup",
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
