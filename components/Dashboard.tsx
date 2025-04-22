'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// Cargar el componente de gráficos de forma dinámica (solo en cliente)
const Chart = dynamic(() => import('./Chart'), { ssr: false });

export default function Dashboard() {
  const alerta = { tipo: "sequía" }; // Aquí podrías tener lógica más avanzada luego

  return (
    <div className="p-4 space-y-4">
      {alerta.tipo === "sequía" && (
        <Alert variant="destructive">
          <AlertTitle>⚠️ Alerta de sequía</AlertTitle>
          <AlertDescription>Niveles bajos de humedad detectados.</AlertDescription>
        </Alert>
      )}
      {alerta.tipo === "inundación" && (
        <Alert variant="default">
          <AlertTitle>🌊 Alerta de inundación</AlertTitle>
          <AlertDescription>Se detectó exceso de lluvia y humedad.</AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">Gráfico de humedad y lluvia</h2>
          <Chart />
        </CardContent>
      </Card>
    </div>
  );
}
