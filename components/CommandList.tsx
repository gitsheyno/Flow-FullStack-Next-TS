"use client";
import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "@/context/context";
import { SearchCheckIcon } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

interface Data {
  id: string;
  type: string;
  name: string;
}

export default function Commands({ data }: { data: Data[] }) {
  // -------------<< necessary hooks and context >>-------------

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const ctx = useContext(StoreContext);

  // -------------<< State hooks for managing input and results >>-------------

  const [inputValue, setInputValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const debouncedValue = useDebounce<string>(inputValue, 500);
  const [filteredData, setFilteredData] = useState<Data[]>(data);

  // -------------<< Handling input changes >>-------------

  const handleInputChange = (term: string) => {
    setInputValue(term);
  };
  // -------------<< Handling focus >>-------------

  const handleFocus = () => {
    setShowResults(true);
  };
  // -------------<< Handling list item click >>-------------

  const handleClickList = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term as string);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);

    // -------------<< Adding selected data to store >>-------------

    const selected = filteredData.filter((item) => item.id === term);

    ctx?.setData((prev) => [...prev, ...selected]);

    setShowResults(false);
    replace(`${pathname}`);
  };

  useEffect(() => {
    //--------<< Filter the data based on the debounced input value >>--------
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(debouncedValue.toLowerCase()) ||
        item.type.toLowerCase().includes(debouncedValue.toLowerCase())
    );
    setFilteredData(filtered);
  }, [debouncedValue, data]);

  useEffect(() => {
    // const params = new URLSearchParams(searchParams);
    // if (debouncedValue) {
    //   params.set("query", debouncedValue as string);
    // }
    // replace(`${pathname}?${params.toString()}`);
    // setShowResults(false);
  }, [debouncedValue, pathname, replace, searchParams]);

  return (
    <div className="flex flex-col items-center mb-10">
      <div className="relative flex items-center w-full max-w-md mt-5 ">
        <input
          type="text"
          placeholder="Type a command or search..."
          value={inputValue}
          onChange={(e) => {
            handleInputChange(e.target.value);
          }}
          onFocus={handleFocus}
          className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:border-blue-500 w-full"
        />
        <SearchCheckIcon className="h-6 w-6 text-gray-400 absolute right-3" />
      </div>

      {showResults && (
        <div className="w-full max-w-md mt-4">
          <ul className="bg-white border border-gray-300 rounded-md shadow-md">
            {filteredData.map((item) => {
              return (
                <li
                  onClick={() => {
                    handleClickList(item.id);
                  }}
                  key={item.id}
                  className="p-3 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
