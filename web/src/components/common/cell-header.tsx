import { Lucide } from "./lucide";

export const CellHeader =
  ({ header, order, orderBy, handler, currentOrderField }) =>
  // eslint-disable-next-line react/display-name
  () => {
    const arrowUpActive = order === "asc" && orderBy === currentOrderField;
    const arrowDownActive = order === "desc" && orderBy === currentOrderField;

    return (
      <div className="flex items-center justify-between">
        <span>{header}</span>{" "}
        <button onClick={() => handler(orderBy, order)}>
          <Lucide
            name="ChevronUp"
            size={14}
            color={arrowUpActive ? "blue" : "gray"}
          />
          <Lucide
            name="ChevronDown"
            size={14}
            color={arrowDownActive ? "blue" : "gray"}
          />
        </button>
      </div>
    );
  };
