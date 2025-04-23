// context/MQTTContext.tsx
import { ReactNode } from "react";
import mqtt from "mqtt";
import React, { createContext, useEffect, useState } from "react";

export const MQTTContext = createContext<any>(null);

interface MQTTProviderProps {
  children: ReactNode;
}

export const MQTTProvider = ({ children }: MQTTProviderProps) => {
  const [message, setMessage] = useState<any>(null);

  useEffect(() => {
    const client = mqtt.connect("wss://broker.emqx.io:8084/mqtt");

    client.on("connect", () => {
      console.log("MQTT conectado");
      client.subscribe("esp32/sensores");
    });

    client.on("message", (topic, payload) => {
      const data = JSON.parse(payload.toString());
      setMessage(data);
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <MQTTContext.Provider value={message}>
      {children}
    </MQTTContext.Provider>
  );
};
