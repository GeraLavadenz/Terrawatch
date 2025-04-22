'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Recibe la prop `data`
export default function Chart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="lluvia" fill="#0ea5e9" />
        <Bar dataKey="humedad" fill="#22c55e" />
      </BarChart>
    </ResponsiveContainer>
  );
}
