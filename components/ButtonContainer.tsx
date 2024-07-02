"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

type ButtonContainerProps = {
  currentPage: number;
  totalPages: number;
};

const ButtonContainer = ({ totalPages, currentPage }: ButtonContainerProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    const defaultParams = {
      search: searchParams.get("search") ?? "",
      jobStatus: searchParams.get("jobStatus") ?? "",
      page: String(page),
    };

    let params = new URLSearchParams(defaultParams).toString();

    router.push(`${pathname}?${params}`);
  };
  return (
    <div className="flex gap-x-2">
      {pageButtons.map((page) => (
        <Button
          key={page}
          size={"icon"}
          variant={currentPage === page ? "default" : "outline"}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      ))}
    </div>
  );
};

export default ButtonContainer;
