"use client";
import React, { useState } from "react";
import { Input } from "../ui";
import cn from "classnames";
import { Lucide } from "./lucide";

type Props = {
  placeholder?: string;
  onSearch: (value: string) => void;
  onClearSearch?: () => void;
  className?: string;
};

export const SearchInput: React.FC<Props> = ({
  placeholder,
  className,
  onSearch,
  onClearSearch,
}) => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClearQuery = () => {
    if (typeof onClearSearch === "function") onClearSearch();
    setQuery("");
  };

  return (
    <div className={cn("flex items-center relative", className)}>
      <Lucide
        name="Search"
        size={16}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-20"
        color="#718EBF"
      />
      <Input
        value={query}
        placeholder={placeholder}
        onChange={handleChange}
        className="w-full "
        inputClassName="pl-6"
      />
      {query && (
        <button
          onClick={handleClearQuery}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20"
        >
          <Lucide name="CircleX" size={12} color="#718EBF" />
        </button>
      )}
    </div>
  );
};
