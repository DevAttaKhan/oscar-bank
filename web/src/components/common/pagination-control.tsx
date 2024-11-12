"use client";
import { ResponseMeta } from "@/interfaces/types";
import ReactPaginate from "react-paginate";
import { Lucide } from ".";

type Props = {
  meta?: ResponseMeta;
  gotoPage: (page: number) => void;
};

export const PaginationControl: React.FC<Props> = ({ meta, gotoPage }) => {
  return (
    <div className="flex justify-between mt-2 leading-none ">
      <div></div>
      <ReactPaginate
        forcePage={meta?.currentPage && meta?.currentPage - 1}
        breakLabel="..."
        nextLabel={<Lucide name="ArrowRight" size={16} />}
        onPageChange={({ selected }) => gotoPage(selected + 1)}
        pageRangeDisplayed={5}
        pageCount={meta?.totalPages || 0}
        previousLabel={<Lucide name="ArrowLeft" size={16} />}
        renderOnZeroPageCount={null}
        pageLinkClassName="p-2 block w-8 grid place-items-center rounded border bg-white"
        containerClassName="flex items-center gap-2"
        activeLinkClassName="text-green-500"
        nextLinkClassName="p-2 block w-8 grid place-items-center rounded border bg-white"
        previousLinkClassName="p-2 block w-8 grid place-items-center rounded border bg-white"
      />
    </div>
  );
};
