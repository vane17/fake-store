import classNames from "classnames";
interface ColumnProps {
  header: string;
  accessor: string;
}

interface LoadingProps {
  column: ColumnProps;
  isLoading: boolean;
}
export const LoadingTableProduct = ({ column, isLoading }: LoadingProps) => {
  const classes = classNames({
    "!bg-zinc-200 dark:!bg-zinc-700 rounded animate-pulse": isLoading,
  });

  if (column.accessor === "image") {
    return (
      <div className="flex items-center justify-center">
        <div
          className={`h-8 w-8 rounded-md flex overflow-hidden ${classes}`}
        ></div>
      </div>
    );
  }

  if (column.accessor === "title") {
    return <p className={`${classes} w-full h-5`}></p>;
  }

  if (column.accessor === "category") {
    return <p className={`${classes} w-full h-5`}></p>;
  }

  if (column.accessor === "description") {
    return <p className={`${classes} w-full h-5`}></p>;
  }

  if (column.accessor === "price") {
    return <p className={`${classes} w-full h-5`}></p>;
  }

  if (column.accessor === "actions") {
    return (
      <section className="flex items-center gap-2 ">
        <div
          className={`h-7 w-7 rounded-md flex overflow-hidden ${classes}`}
        ></div>

        <div
          className={`h-7 w-7 rounded-md flex overflow-hidden ${classes}`}
        ></div>
        <div
          className={`h-7 w-7 rounded-md flex overflow-hidden ${classes}`}
        ></div>
      </section>
    );
  }

  return null;
};
