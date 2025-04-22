'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const Chart = dynamic(() => import('./Chart'), { ssr: false });

const datosClima = [
  { name: "Lunes", lluvia: 5, humedad: 30 },
  { name: "Martes", lluvia: 0, humedad: 10 },
  { name: "Miércoles", lluvia: 12, humedad: 50 },
  { name: "Jueves", lluvia: 10, humedad: 50 },
  { name: "Viernes", lluvia: 8, humedad: 50 },
];

export default function Dashboard() {
  const lluviaProm = datosClima.reduce((sum, d) => sum + d.lluvia, 0) / datosClima.length;
  const humedadProm = datosClima.reduce((sum, d) => sum + d.humedad, 0) / datosClima.length;

  let alerta = "normal";

  if (lluviaProm < 3 && humedadProm < 25) {
    alerta = "sequía";
  } else if (lluviaProm > 10 && humedadProm > 70) {
    alerta = "inundación";
  }

  return (
    <div className="p-4 space-y-4">
      {alerta === "sequía" && (
        <Alert variant="destructive">
          <AlertTitle>⚠️ Alerta de sequía</AlertTitle>
          <AlertDescription>
            Promedio de humedad bajo ({humedadProm.toFixed(1)}%) y poca lluvia ({lluviaProm.toFixed(1)} mm).
          </AlertDescription>
        </Alert>
      )}

      {alerta === "inundación" && (
        <Alert variant="default">
          <AlertTitle>🌊 Alerta de inundación</AlertTitle>
          <AlertDescription>
            Alta humedad promedio ({humedadProm.toFixed(1)}%) y lluvias intensas ({lluviaProm.toFixed(1)} mm).
          </AlertDescription>
        </Alert>
      )}

      {alerta === "normal" && (
        <Alert variant="default">
          <AlertTitle>✅ Clima estable</AlertTitle>
          <AlertDescription>
            No se detectan anomalías en humedad ({humedadProm.toFixed(1)}%) ni lluvia ({lluviaProm.toFixed(1)} mm).
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">Gráfico de humedad y lluvia</h2>
          <Chart data={datosClima} />
        </CardContent>
      </Card>
    </div>
  );
}
