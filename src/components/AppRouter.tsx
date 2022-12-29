import React from "react";
import { Route, Routes } from "react-router";
import Home from "../pages/home/Home";
import Publications from "../pages/publications/Publications";

function AppRouter() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/publications" element={<Publications />} />
    </Routes>
  );
}

export default AppRouter;
