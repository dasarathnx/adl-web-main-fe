import { licenseDetails } from "@/Datas/licenseDetails";
import { getSeo } from "@/lib/api/apis";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store"
export function generateStaticParams() {
  return licenseDetails.map(item => ({
    id: String(item.id),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const license = licenseDetails.find(
    l => String(l.id) === String(id)
  );

  // ✅ SAFETY: license not found
  if (!license) {
    return {
      title: "Business License Services in UAE | ADL Business Solutions",
      description:
        "Professional business licensing services in UAE including commercial, professional, and industrial licenses.",
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/seo/get-seo?page=license&innerPage=${license.id}`,
      { cache: "no-store" }
    );

    const data = await res.json();
    const seo = data?.data;
    if (!seo) throw new Error("SEO not found");

    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      alternates: {
        canonical: seo.canonical,
      },
    };
  } catch {
    // ✅ NORMAL FALLBACK (NO BUILD FAILURE)
    return {
      title: `${license.licenseType} in UAE | ADL Business Solutions`,
      description:
        license.description ||
        "Get expert assistance for UAE business license services with ADL Business Solutions.",
    };
  }
}

export default function LicenseLayout({ children }) {
  return <>{children}</>;
}
