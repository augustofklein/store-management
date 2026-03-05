import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { PageInfo } from "../../../model/general/type";
import { TABLE_PAGE_SIZE } from "@/constants";

interface TableProps {
  headers: React.ReactNode;
  body: React.ReactNode;
  tableClassName?: string;
  wrapperClassName?: string;
  pageInfo: PageInfo;
}

interface TableColumnHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface TableColumnCellProps {
  children: React.ReactNode;
  className?: string;
}

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
}

interface TableBooleanBadgeProps {
  value: boolean;
  trueLabel?: string;
  falseLabel?: string;
}

export const TableColumnHeader: React.FC<TableColumnHeaderProps> = ({
  children,
  className = "",
}) => {
  return <th className={`py-3 px-6 text-left ${className}`}>{children}</th>;
};

export const TableColumnCell: React.FC<TableColumnCellProps> = ({
  children,
  className = "",
}) => {
  return <td className={`py-3 px-6 text-left ${className}`}>{children}</td>;
};

export const TableRow: React.FC<TableRowProps> = ({
  children,
  className = "",
}) => {
  return (
    <tr
      className={`border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 ${className}`}
    >
      {children}
    </tr>
  );
};

export const TableBooleanBadge: React.FC<TableBooleanBadgeProps> = ({
  value,
  trueLabel = "Active",
  falseLabel = "Inactive",
}) => {
  return (
    <span
      className={`py-1 px-3 rounded-full text-xs ${
        value ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"
      }`}
    >
      {value ? trueLabel : falseLabel}
    </span>
  );
};

const Table: React.FC<TableProps> = ({
  headers,
  body,
  tableClassName = "",
  wrapperClassName = "overflow-x-auto",
  pageInfo,
}) => {
  const [page, setPage] = useState<number>(pageInfo.pageNumber);
  const totalPages =
    pageInfo.totalPages ??
    Math.max(1, Math.ceil((pageInfo.totalCount ?? 0) / TABLE_PAGE_SIZE));

  useEffect(() => {
    setPage(pageInfo.pageNumber);
  }, [pageInfo.pageNumber]);

  return (
    <div className={wrapperClassName}>
      <table
        className={`min-w-full bg-white dark:bg-gray-700 shadow-md rounded ${tableClassName}`}
      >
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 uppercase text-sm leading-normal">
            {headers}
          </tr>
        </thead>
        <tbody className="text-gray-600 dark:text-gray-200 text-sm font-light">
          {body}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={7} className="py-3 px-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-200">
                  Page {page} of {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="muted"
                    onClick={() => setPage(1)}
                    disabled={page === 1}
                  >
                    {"<<"}
                  </Button>
                  <Button
                    variant="muted"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    {"<"}
                  </Button>
                  <Button
                    variant="muted"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                  >
                    {">"}
                  </Button>
                  <Button
                    variant="muted"
                    onClick={() => setPage(totalPages)}
                    disabled={page === totalPages}
                  >
                    {">>"}
                  </Button>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
