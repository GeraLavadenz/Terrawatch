'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Lunes", lluvia: 5, humedad: 30 },
  { name: "Martes", lluvia: 0, humedad: 10 },
  { name: "Miércoles", lluvia: 12, humedad: 50 },
];

export default function Chart() {
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
