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
    <div className="flex justify-between">
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
        containerClassName="flex items-center gap-6   text-slate-500"
        activeLinkClassName="text-green-500"
        nextLinkClassName="block transition p-3 rounded-xl hover:shadow-lg hover:text-black dark:text-white dark:hover:bg-white"
        previousLinkClassName="block transition p-3 rounded-xl hover:shadow-lg hover:text-black dark:text-white dark:hover:bg-white"
      />
    </div>
  );
};
