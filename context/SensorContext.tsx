'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type DatosSensores = {
  humedad: number
  temperatura: number
  lluvia: number
}

const SensorContext = createContext<{ datos: DatosSensores | null }>({ datos: null })

export const SensorProvider = ({ children }: { children: ReactNode }) => {
  const [datos, setDatos] = useState<DatosSensores | null>(null)

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const res = await fetch("http://192.168.1.50/datos")
        const json = await res.json()
        setDatos(json)
      } catch (err) {
        console.error("❌ Error al obtener datos del ESP32:", err)
      }
    }

    const intervalo = setInterval(fetchDatos, 3000)
    return () => clearInterval(intervalo)
  }, [])

  return (
    <SensorContext.Provider value={{ datos }}>
      {children}
    </SensorContext.Provider>
  )
}

export const useSensores = () => useContext(SensorContext)
