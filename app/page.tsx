// src/app/page.tsx o src/pages/index.tsx (según estructura del proyecto)

import Dashboard from "@/components/Dashboard";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard de Clima</title>
      </Head>
      <main className="min-h-screen p-4 bg-gray-50">
        <Dashboard />
      </main>
    </>
  );
}
