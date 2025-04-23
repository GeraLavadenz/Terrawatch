'use client'
import { useSensores } from "@/context/SensorContext"

export default function Page() {
  const { datos } = useSensores()

  if (!datos) return <p>⏳ Cargando datos...</p>

  return (
    <div>
      <h1>📊 Página principal</h1>
      <p>🌱 Humedad: {datos.humedad}</p>
      <p>🌡️ Temperatura: {datos.temperatura} °C</p>
      <p>☔ Lluvia: {datos.lluvia === 0 ? "Sí" : "No"}</p>
    </div>
  )
}
