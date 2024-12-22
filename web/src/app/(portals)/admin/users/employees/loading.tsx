import { Spinner } from "@/components/ui";
import React from "react";

const PageLoader = () => {
  return (
    <div className="h-screen grid place-items-center">
      <div>
        <Spinner classNames="mb-2 w-12  h-12 p-1 bg-blue-500" />
      </div>
    </div>
  );
};

export default PageLoader;
