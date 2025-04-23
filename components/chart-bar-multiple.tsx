"use client"

import { AlertTriangle, Droplets, Flame } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

const chartData = [
  { month: "Enero", temperatura: 22, humedad: 65, lluvia: 15 },
  { month: "Febrero", temperatura: 24, humedad: 60, lluvia: 10 },
  { month: "Marzo", temperatura: 21, humedad: 70, lluvia: 25 },
  { month: "Abril", temperatura: 18, humedad: 75, lluvia: 35 },
  { month: "Mayo", temperatura: 16, humedad: 80, lluvia: 45 },
  { month: "Junio", temperatura: 14, humedad: 85, lluvia: 40 },
]

const chartConfig = {
  temperatura: {
    label: "Temperatura (°C)",
    color: "hsl(0, 80%, 60%)",
  },
  humedad: {
    label: "Humedad (%)",
    color: "hsl(210, 80%, 60%)",
  },
  lluvia: {
    label: "Lluvia (mm)",
    color: "hsl(270, 80%, 60%)",
  },
} satisfies ChartConfig

// Función para analizar si hay condiciones de sequía o inundación
function analizarCondicionesClimaticas(datos) {
  // Tomamos el último mes para el análisis actual
  const datoActual = datos[datos.length - 1]

  // Definimos umbrales para cada condición
  const umbralSequiaTemperatura = 20 // °C
  const umbralSequiaHumedad = 70 // %
  const umbralSequiaLluvia = 20 // mm

  const umbralInundacionTemperatura = 18 // °C
  const umbralInundacionHumedad = 75 // %
  const umbralInundacionLluvia = 35 // mm

  // Calculamos puntuación para sequía e inundación
  let puntuacionSequia = 0
  let puntuacionInundacion = 0

  // Análisis de temperatura
  if (datoActual.temperatura > umbralSequiaTemperatura) {
    puntuacionSequia += 2
  } else if (datoActual.temperatura < umbralInundacionTemperatura) {
    puntuacionInundacion += 1
  }

  // Análisis de humedad
  if (datoActual.humedad < umbralSequiaHumedad) {
    puntuacionSequia += 2
  } else if (datoActual.humedad > umbralInundacionHumedad) {
    puntuacionInundacion += 2
  }

  // Análisis de lluvia
  if (datoActual.lluvia < umbralSequiaLluvia) {
    puntuacionSequia += 3
  } else if (datoActual.lluvia > umbralInundacionLluvia) {
    puntuacionInundacion += 3
  }

  // Determinamos la condición predominante
  if (puntuacionSequia > puntuacionInundacion) {
    return {
      condicion: "sequía",
      puntuacionSequia,
      puntuacionInundacion,
      nivel: puntuacionSequia > 5 ? "severa" : "moderada",
      explicacion: `Condiciones de sequía ${puntuacionSequia > 5 ? "severa" : "moderada"} detectadas debido a ${datoActual.temperatura > umbralSequiaTemperatura ? "alta temperatura" : ""} ${datoActual.humedad < umbralSequiaHumedad ? (datoActual.temperatura > umbralSequiaTemperatura ? "y " : "") + "baja humedad" : ""} ${datoActual.lluvia < umbralSequiaLluvia ? (datoActual.temperatura > umbralSequiaTemperatura || datoActual.humedad < umbralSequiaHumedad ? "y " : "") + "escasas precipitaciones" : ""}.`,
    }
  } else if (puntuacionInundacion > puntuacionSequia) {
    return {
      condicion: "inundación",
      puntuacionSequia,
      puntuacionInundacion,
      nivel: puntuacionInundacion > 5 ? "severa" : "moderada",
      explicacion: `Riesgo de inundación ${puntuacionInundacion > 5 ? "severa" : "moderada"} detectado debido a ${datoActual.temperatura < umbralInundacionTemperatura ? "baja temperatura" : ""} ${datoActual.humedad > umbralInundacionHumedad ? (datoActual.temperatura < umbralInundacionTemperatura ? "y " : "") + "alta humedad" : ""} ${datoActual.lluvia > umbralInundacionLluvia ? (datoActual.temperatura < umbralInundacionTemperatura || datoActual.humedad > umbralInundacionHumedad ? "y " : "") + "abundantes precipitaciones" : ""}.`,
    }
  } else {
    return {
      condicion: "normal",
      puntuacionSequia,
      puntuacionInundacion,
      nivel: "estable",
      explicacion: "Condiciones climáticas estables sin riesgo significativo de sequía o inundación.",
    }
  }
}

export function Component() {
  const analisis = analizarCondicionesClimaticas(chartData)

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Datos Meteorológicos</CardTitle>
          <CardDescription>Enero - Junio 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData} height={350}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis axisLine={false} tickLine={false} tickMargin={10} />
              <Legend />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
              <Bar dataKey="temperatura" fill="var(--color-temperatura)" radius={4} />
              <Bar dataKey="humedad" fill="var(--color-humedad)" radius={4} />
              <Bar dataKey="lluvia" fill="var(--color-lluvia)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">Análisis del último mes (Junio)</div>
          <div className="leading-none text-muted-foreground">Temperatura: 14°C | Humedad: 85% | Lluvia: 40mm</div>
        </CardFooter>
      </Card>

      <Alert
        className={`w-full max-w-3xl mx-auto ${
          analisis.condicion === "sequía"
            ? "border-amber-500 bg-amber-50"
            : analisis.condicion === "inundación"
              ? "border-blue-500 bg-blue-50"
              : "border-green-500 bg-green-50"
        }`}
      >
        {analisis.condicion === "sequía" ? (
          <Flame className="h-5 w-5 text-amber-500" />
        ) : analisis.condicion === "inundación" ? (
          <Droplets className="h-5 w-5 text-blue-500" />
        ) : (
          <AlertTriangle className="h-5 w-5 text-green-500" />
        )}

        <AlertTitle className="flex items-center gap-2">
          Estado Actual:
          <Badge
            className={`
            ${
              analisis.condicion === "sequía"
                ? "bg-amber-500 hover:bg-amber-600"
                : analisis.condicion === "inundación"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-green-500 hover:bg-green-600"
            }
          `}
          >
            {analisis.condicion === "sequía"
              ? `Sequía ${analisis.nivel}`
              : analisis.condicion === "inundación"
                ? `Inundación ${analisis.nivel}`
                : "Condiciones normales"}
          </Badge>
        </AlertTitle>

        <AlertDescription className="mt-4">
          <p className="mb-4">{analisis.explicacion}</p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-3 rounded-md border">
              <h4 className="text-sm font-medium mb-2">Análisis de Factores</h4>
              <ul className="text-sm space-y-1">
                <li className="flex justify-between">
                  <span>Temperatura:</span>
                  <span
                    className={`font-medium ${
                      chartData[chartData.length - 1].temperatura > 20
                        ? "text-amber-500"
                        : chartData[chartData.length - 1].temperatura < 18
                          ? "text-blue-500"
                          : "text-green-500"
                    }`}
                  >
                    {chartData[chartData.length - 1].temperatura > 20
                      ? "Alta"
                      : chartData[chartData.length - 1].temperatura < 18
                        ? "Baja"
                        : "Normal"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Humedad:</span>
                  <span
                    className={`font-medium ${
                      chartData[chartData.length - 1].humedad < 70
                        ? "text-amber-500"
                        : chartData[chartData.length - 1].humedad > 75
                          ? "text-blue-500"
                          : "text-green-500"
                    }`}
                  >
                    {chartData[chartData.length - 1].humedad < 70
                      ? "Baja"
                      : chartData[chartData.length - 1].humedad > 75
                        ? "Alta"
                        : "Normal"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Precipitaciones:</span>
                  <span
                    className={`font-medium ${
                      chartData[chartData.length - 1].lluvia < 20
                        ? "text-amber-500"
                        : chartData[chartData.length - 1].lluvia > 35
                          ? "text-blue-500"
                          : "text-green-500"
                    }`}
                  >
                    {chartData[chartData.length - 1].lluvia < 20
                      ? "Escasas"
                      : chartData[chartData.length - 1].lluvia > 35
                        ? "Abundantes"
                        : "Normales"}
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-3 rounded-md border">
              <h4 className="text-sm font-medium mb-2">Tendencia</h4>
              <p className="text-sm">
                {analisis.condicion === "sequía"
                  ? "Los datos muestran una tendencia decreciente en las condiciones de sequía en los últimos meses, con aumento de humedad y precipitaciones."
                  : analisis.condicion === "inundación"
                    ? "Los datos muestran un incremento sostenido de humedad y precipitaciones en los últimos meses, aumentando el riesgo de inundaciones."
                    : "Los datos muestran condiciones estables y equilibradas en los parámetros meteorológicos."}
              </p>
            </div>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}
