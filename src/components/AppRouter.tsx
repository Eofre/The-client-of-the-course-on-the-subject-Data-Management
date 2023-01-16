import React from "react";
import { Route, Routes } from "react-router";
import Home from "../pages/home/Home";
import Publications from "../pages/publications/Publications";
import Subscribers from "../pages/subscribers/Subscribers";
import Audit from "../pages/audit/Audit";
import Subscriptions from "../pages/subscriptions/Subscriptions";

function AppRouter() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/publications" element={<Publications />} />
      <Route path="/subscribers" element={<Subscribers />} />
      <Route path="/subscriptions" element={<Subscriptions />} />
      <Route path="/audit" element={<Audit />} />
    </Routes>
  );
}

export default AppRouter;
