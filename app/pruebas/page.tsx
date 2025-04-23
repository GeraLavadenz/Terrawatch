'use client'
import { useMQTT } from "@/context/MQTTContext"

export default function Home() {
  const { datos } = useMQTT()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📡 Sensores ESP32 (HiveMQ)</h1>

      {!datos ? (
        <p className="text-gray-500">Esperando datos del ESP32...</p>
      ) : (
        <ul className="text-lg space-y-2">
          <li>🌱 <strong>Humedad:</strong> {datos.humedad}</li>
          <li>🌡️ <strong>Temperatura:</strong> {datos.temperatura} °C</li>
          <li>☔ <strong>Lluvia:</strong> {datos.lluvia === 0 ? "Sí" : "No"}</li>
        </ul>
      )}
    </div>
  )
}
