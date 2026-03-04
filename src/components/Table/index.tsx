import React from "react";

interface TableProps {
  headers: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
  tableClassName?: string;
  wrapperClassName?: string;
}

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
