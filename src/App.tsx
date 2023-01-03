import React from "react";
import "./App.scss";
import AppRouter from "./components/AppRouter";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar>
        <AppRouter />
      </Sidebar>
    </div>
  );
}

export default App;
