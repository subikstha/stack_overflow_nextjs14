"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeUrlFromQuery } from "@/lib/utils";

interface CustomInputProps {
  route: string;
  placeholder: string;
  iconPosition: string;
  imgSrc: string;
  otherClasses?: string;
}

function LocalSearchBar({
  route,
  placeholder,
  iconPosition,
  imgSrc,
  otherClasses,
}: CustomInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");
  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeUrlFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, route, router, pathname, searchParams, query]);
  // const query = queryString.stringify({ q: searchState });

  // const updateQueryString = useCallback(() => {
  //   const currentQuery = queryString.parse(window.location.search);

  //   const updatedQuery = queryString.stringify({
  //     ...currentQuery,
  //     searchState,
  //   });
  //   const newUrl = `${window.location.pathname}?${updatedQuery}`;
  //   console.log("this is the updated query", updatedQuery, newUrl);
  // }, [searchState]);
  // useEffect(() => {
  //   updateQueryString();
  // }, [searchState, updateQueryString]);
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] w-full grow items-center rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        value={search}
        placeholder={placeholder}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="paragraph-regular no-focus placeholder text-dark400_light700 background-light800_darkgradient border-none shadow-none outline-none"
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
}

export default LocalSearchBar;
