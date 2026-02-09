import { serviceDetails } from "@/Datas/services";

export function generateStaticParams() {
  return serviceDetails.map(item => ({
    id: item.id,
  }));
}

export default function LicenseLayout({ children }) {
  return <>{children}</>;
}
