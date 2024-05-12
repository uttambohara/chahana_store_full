"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
} from "react";
import useDebounce from "../Hooks/use-debounce";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

type PaginationInputProps = {
  filterBy: string;
  urlPathParam: string;
} & ComponentPropsWithoutRef<"input">;

export default function PaginationInput({
  filterBy,
  urlPathParam,
  ...other
}: PaginationInputProps) {
  //...
  const router = useRouter();
  const { inputValue, setInputValue, searchResult } = useDebounce();
  const urlParam = urlPathParam;

  // Adjst input value in query-string
  const updateRoute = useMemo(() => {
    const qs = queryString.stringifyUrl(
      {
        url: `${urlParam}`,
        query: {
          search: searchResult,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    return qs;
  }, [searchResult, urlPathParam]);

  useEffect(() => {
    router.push(updateRoute);
  }, [updateRoute]);

  function handleInputValue(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  return (
    <div className="relative">
      <Input
        {...other}
        placeholder={`Filter ${filterBy}`}
        value={inputValue}
        onChange={handleInputValue}
      />
      <Search
        className="absolute left-2 top-2.5 text-muted-foreground"
        size={20}
      />
    </div>
  );
}
