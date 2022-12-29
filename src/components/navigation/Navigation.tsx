import React from "react";
import cl from "./Navigation.module.scss";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <ul className={cl.list}>
        <li className={cl.item}>
          <Link className={cl.link} to="/">
            Home
          </Link>
        </li>
        <li className={cl.item}>
          <Link className={cl.link} to="/publications">
            Publications
          </Link>
        </li>
        <li className={cl.item}>
          <Link className={cl.link} to="/subscribers">
            Subscribers
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
