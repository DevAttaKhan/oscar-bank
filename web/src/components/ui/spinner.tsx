import cn from "classnames";
export const Spinner = ({ classNames }: { classNames?: string }) => {
  return (
    <div>
      <div className={cn("loader mx-auto", classNames)}></div>
    </div>
  );
};
