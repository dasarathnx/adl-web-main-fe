import { serviceDetails } from "@/Datas/services";
import ServiceDetailsClient from "./ServiceDetailsClient";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const service = serviceDetails.find(
    s => String(s.id) === String(id)
  );

  if (!service) {
    return {
      title: "Service",
      description: "Service details",
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/seo/get-seo?page=services&innerPage=${service.id}`,
      { cache: "no-store" }
    );

    const data = await res.json();
    const seo = data?.data;

    if (!seo) throw new Error("No SEO");

    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      alternates: {
        canonical: seo.canonical,
      },
    };
  } catch {
    return {
      title: "Business Setup in Dubai | ADL Business Solutions",
      description:
        "Start your business in Dubai with expert guidance from ADL Business Solutions.",
    };
  }
}

export default async function Page({ params }) {
  const { id } = await params;
  return <ServiceDetailsClient id={id} />;
}
