import React, { FC, useState } from "react";
import cl from "./Sidebar.module.scss";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { menuItem } from "../../types/types";

interface SidebarProps {
  children: React.ReactNode;
  items: menuItem[];
}

const Sidebar: FC<SidebarProps> = ({ children, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div style={{ display: "flex" }}>
      <div className={cl.sidebar} style={{ width: isOpen ? "200px" : "50px" }}>
        <div className={cl.topSection}>
          <div
            className={cl.bars}
            style={{ marginLeft: isOpen ? "50px" : "0px" }}
          >
            <FaBars className={cl.faBars} onClick={toggle} />
          </div>
        </div>
        <div>
          {items.map((item, index) => (
            <NavLink
              to={item.path}
              key={item.path}
              className={({ isActive }) => (isActive ? cl.activeLink : cl.link)}
            >
              <div className={cl.icon}>{item.icon}</div>
              <div
                className={cl.linkText}
                style={{ display: isOpen ? "block" : "none" }}
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
