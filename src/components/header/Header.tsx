import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import Container from "../сontainer/Container";
import cl from "./Header.module.scss";

function Header() {
  return (
    <header className={cl.header}>
      <Container>
        <div className={cl.headerInner}>
          <Link to="/" className={cl.logo}>
            Subscription<span>service</span>
          </Link>
          <Navigation />
        </div>
      </Container>
    </header>
  );
}

export default Header;
