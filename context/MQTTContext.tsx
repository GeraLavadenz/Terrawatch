'use client'
import mqtt from 'mqtt'
import { createContext, useContext, useEffect, useState } from 'react'

type Datos = {
  humedad: number
  temperatura: number
  lluvia: number
}

const MQTTContext = createContext<{ datos: Datos | null }>({ datos: null })

export const MQTTProvider = ({ children }: { children: React.ReactNode }) => {
  const [datos, setDatos] = useState<Datos | null>(null)

  useEffect(() => {
    const options = {
      username: "esp32",
      password: "clave123",
      reconnectPeriod: 1000,
      clean: true,
      connectTimeout: 4000
    }
  
    const client = mqtt.connect(
      "wss://1c0e807b9c70494ea9102f49a21c3da0.s1.eu.hivemq.cloud:8884/mqtt",
      options
    )
  
    client.on("connect", () => {
      console.log("✅ Conectado a HiveMQ WS")
      client.subscribe("esp32/sensores", (err) => {
        if (err) console.error("❌ Error al suscribirse", err)
        else console.log("🟢 Suscrito a esp32/sensores")
      })
    })
  
    client.on("message", (_, message) => {
      try {
        const data = JSON.parse(message.toString())
        setDatos(data)
      } catch (e) {
        console.error("❌ Error al parsear mensaje:", e)
      }
    })
  
    // 🔁 Retornar una función que limpia el efecto
    return () => {
      client.end()
      console.log("🔌 Cliente MQTT desconectado")
    }
  }, [])
  

  return (
    <MQTTContext.Provider value={{ datos }}>
      {children}
    </MQTTContext.Provider>
  )
}

export const useMQTT = () => useContext(MQTTContext)
