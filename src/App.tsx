import React from "react";
import {
  FaBookOpen,
  FaBookReader,
  FaDesktop,
  FaHome,
  FaUsers,
} from "react-icons/fa";
import "./App.scss";
import AppRouter from "./components/AppRouter";
import Sidebar from "./components/sidebar/Sidebar";
import { menuItems } from "./data/menuItemList";
import { menuItem } from "./types/types";

function App() {
  return (
    <div className="App">
      <Sidebar items={menuItems}>
        <AppRouter />
      </Sidebar>
    </div>
  );
}

export default App;
