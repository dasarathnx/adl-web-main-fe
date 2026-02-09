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
  const freezone = freezoneDetails.find(
    s => String(s.id) === String(id)
  );

  // ✅ SAFETY GUARD
  if (!freezone) {
    return {
      title: "Freezone Company Setup in UAE | ADL Business Solutions",
      description:
        "ADL Business Solutions offers Freezone company setup services across the UAE.",
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/seo/get-seo?page=freezone&innerPage=${freezone.id}`,
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
  } catch (error) {
    console.error("Freezone SEO fetch failed (build-safe):", error);

    // ✅ FALLBACK (BUILD NEVER FAILS)
    return {
      title: "Freezone Company Setup in UAE | 100% Ownership | ADL Business Solutions",
      description:
        "Get 100% ownership, zero tax, and fast Freezone company setup in UAE with ADL Business Solutions.",
      keywords:
        "UAE Freezone company setup, Dubai Freezone license, business setup UAE",
    };
  }
}

export default function LicenseLayout({ children }) {
  return <>{children}</>;
}
