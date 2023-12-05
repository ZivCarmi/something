import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getPayments } from "@/db/queries";

export default async function Contacts() {
  const data = await getPayments();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
