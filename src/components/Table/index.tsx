import React from "react";

interface TableProps {
  headers: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
  tableClassName?: string;
  wrapperClassName?: string;
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
  footer,
  tableClassName = "",
  wrapperClassName = "overflow-x-auto",
}) => {
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
        {footer && <tfoot>{footer}</tfoot>}
      </table>
    </div>
  );
};

export default Table;
