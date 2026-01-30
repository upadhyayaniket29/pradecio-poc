import Breadcrumb from "@/components/Admin/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Admin/Tables/TableOne";
import TableThree from "@/components/Admin/Tables/TableThree";
import TableTwo from "@/components/Admin/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Admin/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
