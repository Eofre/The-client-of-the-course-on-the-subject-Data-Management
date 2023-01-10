import React, { FC, TableHTMLAttributes } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import cl from "./Table.module.scss";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  headers: string[];
  data: object[];
  deleteItem?: (id: any) => void;
  updateItem?: (id: number | string, title: string, cost: string) => void;
}

const Table: FC<TableProps> = ({
  data,
  headers,
  deleteItem,
  updateItem,
  ...rest
}) => {
  return (
    <table className={cl.table} cellSpacing="7" {...rest}>
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
        {data.map((row, index) => (
          <tr key={index} style={{ cursor: "pointer" }}>
            {Object.values(row).map((item, index) => (
              <th key={`${index}fdfd`} className={cl.row}>
                {item}
              </th>
            ))}
            {!updateItem ? (
              <></>
            ) : (
              <th>
                <button
                  onClick={() =>
                    updateItem?.(
                      Object.values(row)[0],
                      Object.values(row)[1],
                      Object.values(row)[2]
                    )
                  }
                >
                  <FaPencilAlt className={cl.icon} />
                </button>
              </th>
            )}
            {!deleteItem ? (
              <></>
            ) : (
              <th>
                <button onClick={() => deleteItem?.(Object.values(row)[0])}>
                  <FaTrashAlt className={cl.icon} />
                </button>
              </th>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
