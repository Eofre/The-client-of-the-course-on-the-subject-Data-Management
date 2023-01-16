import React, { FC, TableHTMLAttributes } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { Publication, Subscriber, Subscription } from "../../../types/types";
import cl from "./Table.module.scss";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  headers: string[];
  data: object[];
  deleteItem?: (item: any) => void;
  updateItem?: (item: any) => void;
  isLoading?: boolean;
}

const Table: FC<TableProps> = ({
  data,
  headers,
  deleteItem,
  updateItem,
  isLoading,
  ...rest
}) => {
  return (
    <table className={cl.table} cellSpacing="8" {...rest}>
      <thead>
        <tr>
          {headers.map((row) => (
            <th className={cl.header} key={row}>
              {row}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <p className={cl.message}>
            {isLoading ? "Loading..." : "No matches..."}
          </p>
        ) : (
          data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((item, index) => (
                <th key={`${index}fdfd`} className={cl.row}>
                  {item}
                </th>
              ))}
              {!updateItem ? (
                <></>
              ) : (
                <th>
                  <button onClick={() => updateItem?.(row)}>
                    <FaPencilAlt className={cl.icon} />
                  </button>
                </th>
              )}
              {!deleteItem ? (
                <></>
              ) : (
                <th>
                  {/* deleteItem?.(Object.values(row)[0]) */}
                  <button onClick={() => deleteItem?.(row)}>
                    <FaTrashAlt className={cl.icon} />
                  </button>
                </th>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
