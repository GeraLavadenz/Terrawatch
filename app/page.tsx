// src/app/page.tsx o src/pages/index.tsx (según estructura del proyecto)

import Dashboard from "@/components/Dashboard";
import Head from "next/head";
import { Component } from "../components/chart-bar-multiple"
import Components from "../components/chart-radial-text"
export default function Home() {
  return (
    <div className="p-4">
    <Component />
    <Components />
  </div>
  );
}
