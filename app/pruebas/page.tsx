"use client";

import { useContext } from "react";
import { MQTTContext } from "@/context/MQTTContext"; // o SensorContext si usas ese nombre

export default function Page() {
  const data = useContext(MQTTContext);

  return (
    <div>
      <h2>Humedad del suelo</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

