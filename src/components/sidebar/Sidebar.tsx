import React, { FC, useState } from "react";
import cl from "./Sidebar.module.scss";
import {
  FaBars,
  FaBookOpen,
  FaHome,
  FaUsers,
  FaBookReader,
  FaDesktop,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItems = [
    {
      path: "/",
      name: "Home",
      icon: <FaHome />,
    },
    {
      path: "/publications",
      name: "Publications",
      icon: <FaBookOpen />,
    },
    {
      path: "/subscribers",
      name: "Subscribers",
      icon: <FaUsers />,
    },
    {
      path: "/audit",
      name: "Audit",
      icon: <FaDesktop />,
    },
    // {
    //   path: "/subscriberPublications",
    //   name: "Subscriptions",
    //   icon: <FaBookReader />,
    // },
  ];
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
          {menuItems.map((item, index) => (
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
