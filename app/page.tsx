import AllCategories from "@/components/AllCategories";
import { Suspense } from "react";
export default function Home({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  console.log("query", searchParams?.query);
  return (
    <div className="relative px-40 mx-auto  h-full  ">
      <Suspense>
        <AllCategories query={searchParams?.query} />
      </Suspense>
    </div>
  );
}
