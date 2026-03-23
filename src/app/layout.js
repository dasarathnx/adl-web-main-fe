import BackToTopButton from "@/Components/Common/BackToTopButton";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
    metadataBase: new URL("https://adlbusinesssolutions.com"), // 👈 ADD THIS

  title: "ADL Business Solutions",
  description:
    "Professional business setup services in UAE by ADL Business Solutions. Expert support for company formation, licensing, visas, and PRO services.",
  verification: {
    google: "sKOgyWsAKMY3Fd_rE7Ij7R3MF1ACVdVqGaY7czz2wf8",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
        <script
          src="https://www.googletagmanager.com/gtag/js?id=G-8E5N4PMC1Q"
          strategy="afterInteractive"
        />
        <script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8E5N4PMC1Q');
          `}
        </script>
      </head>
      <body className="font-sans">
        <Toaster position="top-right" />
        {children}
        <BackToTopButton />
      </body>
    </html>
  );
}
