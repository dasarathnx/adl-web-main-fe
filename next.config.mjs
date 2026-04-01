// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',
//   trailingSlash: true,
//   images: {
//     unoptimized: true,
//   },
// };

// export default nextConfig;
// const nextConfig = {
//   images: {
//     unoptimized: true,
//   },
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  async redirects() {
    return [
      // Fix blogs with double slashes and /blog/ segment
      {
        source: "/blogs//blog/:slug",
        destination: "/blogs/:slug",
        permanent: true,
      },
      {
        source: "/blogs/blog/:slug",
        destination: "/blogs/:slug",
        permanent: true,
      },
      // Root level blog posts (404s)
      {
        source: "/how-start-mainland-company-uae-2026",
        destination: "/blogs/how-start-mainland-company-uae-2026",
        permanent: true,
      },
      {
        source: "/key-benefits-of-virtual-office",
        destination: "/blogs/key-benefits-of-virtual-office",
        permanent: true,
      },
      {
        source: "/whats-the-process-renew-emirates-id-in-uae",
        destination: "/blogs/whats-the-process-renew-emirates-id-in-uae",
        permanent: true,
      },
      {
        source: "/moa-uae-key-clauses-drafting-guide",
        destination: "/blogs/moa-uae-key-clauses-drafting-guide",
        permanent: true,
      },
      {
        source: "/foreign-entrepreneurs-start-business-in-dubai-2026",
        destination: "/blogs/foreign-entrepreneurs-start-business-in-dubai-2026",
        permanent: true,
      },
      // Nested service/blog pages pointing to offshore page
      {
        source: "/blogs/multi-currency-accounts-uae/offshore-company-formation-in-uae",
        destination: "/offshore-company-formation-in-uae",
        permanent: true,
      },
      {
        source: "/services/business-setup-services-dubai/offshore-company-formation-in-uae",
        destination: "/offshore-company-formation-in-uae",
        permanent: true,
      },
      {
        source: "/freezone-company-setup/offshore-company-formation-in-uae",
        destination: "/offshore-company-formation-in-uae",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;


// Production 
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//       },
//     ],
//   },
// };

// export default nextConfig;

