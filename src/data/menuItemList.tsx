import {
  FaBookOpen,
  FaBookReader,
  FaDesktop,
  FaHome,
  FaUsers,
} from "react-icons/fa";
import { menuItem } from "../types/types";

export const menuItems: menuItem[] = [
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
    path: "/subscriptions",
    name: "Subscriptions",
    icon: <FaBookReader />,
  },
  {
    path: "/audit",
    name: "Audit",
    icon: <FaDesktop />,
  },
];
