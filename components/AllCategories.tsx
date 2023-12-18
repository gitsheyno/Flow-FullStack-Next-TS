import { fetchAll } from "@/lib/data";
import Commands from "./CommandList";
import Flow from "./Flow";

interface Data {
  id: string;
  type: string;
  name: string;
}

interface AllCategoriesProps {
  query: string;
}
export default async function AllCategories({ query }: AllCategoriesProps) {
  const categores: Data[] = await fetchAll(query);

  return (
    <div className="border-slate-700 border-2 flex flex-col gap-10 h-full">
      <Commands data={categores} />
      <Flow />
    </div>
  );
}
