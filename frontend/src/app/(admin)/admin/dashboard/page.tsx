import ECommerce from "@/components/Admin/Dashboard/E-commerce";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard page",
};

export default function AdminPage() {
  return <ECommerce />;
}
