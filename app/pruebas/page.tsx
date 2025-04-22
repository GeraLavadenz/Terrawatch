'use client'
import { useMQTT } from '@/context/MQTTContext'

export default function Page() {
  const { datos } = useMQTT()

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard de Sensores</h1>
      <p>🌱 Humedad: {datos?.humedad ?? 'Cargando...'}</p>
      <p>🌡️ Temperatura: {datos?.temperatura ?? 'Cargando...'} °C</p>
      <p>🌧️ Lluvia: {datos?.lluvia === 0 ? 'Lluvia' : 'Sin lluvia'}</p>
    </div>
  )
}