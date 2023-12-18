"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useEffect, useState } from "react";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  //   const categoryId = searchParams.get("categoryId");
  //   const name = searchParams.get("name");

  const [value, setValue] = useState("");

  const debouncedValue = useDebounce<String>(value, 500);

  const onChange = (term: string) => {
    setValue(term);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedValue) {
      params.set("query", debouncedValue as string);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [value, debouncedValue, pathname, replace, searchParams]);

  return (
    <div className="relative pt-4">
      <Search className="absolute  h-4 w-4 top-7 left-3 text-muted-foreground " />
      <Input
        placeholder="Search..."
        className="pl-10 bg-primary/10"
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
}
