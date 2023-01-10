import React, { FC, InputHTMLAttributes } from "react";
import { FaSearch } from "react-icons/fa";
import Button from "../UI/button/Button";
import Input from "../UI/input/Input";
import cl from "./Tools.module.scss";

interface ToolsProps {
  setQuery?: (query: string) => void;
  openModalAdd?: () => void;
  update?: () => void;
}

const Tools: FC<ToolsProps> = ({ setQuery, openModalAdd, update }) => {
  return (
    <div className={cl.tools}>
      <div className={cl.search}>
        <FaSearch className={cl.searchIcon} />
        <Input
          className={cl.searchInp}
          type="search"
          placeholder="Enter a query (For example: Family)"
          onChange={(e) => setQuery?.(e.target.value)}
        />
      </div>
      {!update ? (
        <></>
      ) : (
        <Button className={cl.btn} onClick={() => update?.()}>
          Update
        </Button>
      )}
      {!openModalAdd ? (
        <></>
      ) : (
        <Button className={cl.btn} onClick={() => openModalAdd?.()}>
          Add
        </Button>
      )}
    </div>
  );
};

export default Tools;
