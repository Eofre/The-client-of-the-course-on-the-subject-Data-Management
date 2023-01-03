import React, { FC, TableHTMLAttributes } from "react";
import cl from "./Table.module.scss";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  headers: string[];
  data: object[];
}

const Table: FC<TableProps> = ({ data, headers, ...rest }) => {
  return (
    <table className={cl.table} cellSpacing="15" {...rest}>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
