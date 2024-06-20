import { ReactNode } from "react";

interface Column<T> {
  accessor: string;
  header: string;
  render?: (item: T) => ReactNode;
}

interface Props<T> {
  children?: (item: T, column: Column<T>) => ReactNode;
  columns: Column<T>[];
  columnsWidth?: (string | null)[];
  data?: T[];
  defaultColumns?: string[];
}

export const Table = <T extends { [key: string]: any }>({
  data,
  columns,
  children,
  columnsWidth,
}: Props<T>) => {
  return (
    <div className="p-4 bg-white rounded-2xl w-full ">
      <div className="w-full overflow-x-auto">
        <table
          className={`w-full text-xs text-left text-customBlue-900 font-normal ${
            columnsWidth && columnsWidth?.length > 0
              ? "table-fixed"
              : "table-auto"
          }`}
        >
          <thead className="text-xs text-customBlue-500 font-bold border-b border-customBlue-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 pb-4 ${
                    columnsWidth?.[index] ? columnsWidth[index] : ""
                  } whitespace-nowrap`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => {
              return (
                <tr>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 pt-4">
                      {typeof children === "function"
                        ? children(item, column)
                        : column.accessor in item && item[column.accessor]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
