'use client';

import { useEffect, useState } from 'react';

// 1️⃣ Definir la interfaz de los datos que recibimos del ESP32
interface DatosSensores {
  temperatura: number;
  humedad_suelo: number;
  lluvia: number;
}

export default function Pruebas() {
  // 2️⃣ Tipar el estado: puede ser null o DatosSensores
  const [datos, setDatos] = useState<DatosSensores | null>(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch('/api/sensores'); // o la IP del ESP32 si no usas proxy
        const data: DatosSensores = await res.json();
        setDatos(data);
      } catch (error) {
        console.error('Error al obtener datos del ESP32:', error);
      }
    };

    obtenerDatos();

    const intervalo = setInterval(obtenerDatos, 10000); // Actualiza cada 10s
    return () => clearInterval(intervalo); // Limpia el intervalo
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Sensores 🌾</h1>

      {datos ? (
        <div className="space-y-2">
          <p>🌡️ Temperatura: {datos.temperatura} °C</p>
          <p>💧 Humedad del Suelo: {datos.humedad_suelo}</p>
          <p>🌧️ Lluvia: {datos.lluvia}</p>
        </div>
      ) : (
        <p>Cargando datos del ESP32...</p>
      )}
    </div>
  );
}
