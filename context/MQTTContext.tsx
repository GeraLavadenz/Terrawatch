'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import mqtt from 'mqtt'

type DatosSensores = {
  humedad: number
  temperatura: number
  lluvia: number
}

const MQTTContext = createContext<{ datos: DatosSensores | null }>({ datos: null })

export const MQTTProvider = ({ children }: { children: ReactNode }) => {
  const [datos, setDatos] = useState<DatosSensores | null>(null)

  useEffect(() => {
    const client = mqtt.connect('ws://192.168.1.X:9001')
    
    client.on('connect', () => {
      console.log('✅ Conectado al broker MQTT')
      client.subscribe('iot/sensores')
    })
  
    client.on('message', (_, message) => {
      try {
        const payload = JSON.parse(message.toString())
        setDatos(payload)
      } catch (e) {
        console.error('❌ Error al parsear mensaje MQTT', e)
      }
    })
  
    return () => {
      if (client.connected) {
        client.end()
      }
    }
  }, [])
  

  return <MQTTContext.Provider value={{ datos }}>{children}</MQTTContext.Provider>
}

export const useMQTT = () => useContext(MQTTContext)
