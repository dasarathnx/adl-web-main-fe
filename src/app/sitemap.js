import { freezoneDetails } from "@/Datas/freezoneDetails";
import { licenseDetails } from "@/Datas/licenseDetails";
import { serviceDetails } from "@/Datas/services";
import { visaDetails } from "@/Datas/visaData";
import { blogsList } from "@/lib/api/apis";

export const revalidate = 3600; // 1 hour

export default async function sitemap() {
  const baseUrl = "https://adlbusinesssolutions.com";

  /* ---------------- CORE STATIC PAGES ---------------- */
  const staticRoutes = [
    "/",
    "/about-us",
    "/services",
    "/blogs",
    "/gallery",
    "/faqs",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
    "/uae-freezone-business-setup",
    "/mainland-company-formation-in-uae",
    "/offshore-company-formation-in-uae"
  ];

  const staticPages = staticRoutes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));

  /* ---------------- BLOGS (DYNAMIC) ---------------- */
  const blogs = (await blogsList()) || [];
  const blogPages = blogs.map(blog => ({
    url: `${baseUrl}/blogs/${blog.url}`,
    lastModified: new Date(blog.updatedAt || Date.now()),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  /* ---------------- SERVICES (DATA FILE) ---------------- */
  const servicePages = (serviceDetails || []).map(service => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date(service.updatedAt || Date.now()),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  /* ---------------- FREEZONES (DATA FILE) ---------------- */
  const freezonePages = (freezoneDetails || []).map(zone => ({
    url: `${baseUrl}/freezone/${zone.id}`,
    lastModified: new Date(zone.updatedAt || Date.now()),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  /* ---------------- VISAS (DATA FILE) ---------------- */
  const visaPages = (visaDetails || []).map(visa => ({
    url: `${baseUrl}/visa/${visa.id}`,
    lastModified: new Date(visa.updatedAt || Date.now()),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  /* ---------------- LICENSES (DATA FILE) ---------------- */
  const licensePages = (licenseDetails || []).map(license => ({
    url: `${baseUrl}/license/${license.id}`,
    lastModified: new Date(license.updatedAt || Date.now()),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  /* ---------------- FINAL SITEMAP ---------------- */
  return [
    ...staticPages,
    ...blogPages,
    ...servicePages,
    ...freezonePages,
    ...visaPages,
    ...licensePages,
  ];
}
