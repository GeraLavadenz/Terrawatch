// context/MQTTContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import mqtt from 'mqtt';

const MQTTContext = createContext();

export const MQTTProvider = ({ children }) => {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const client = mqtt.connect('ws://192.168.1.100:9001'); // Cambia IP por tu broker
    client.on('connect', () => {
      console.log('📡 Conectado al broker MQTT');
      client.subscribe('iot/sensores');
    });

    client.on('message', (topic, message) => {
      try {
        const payload = JSON.parse(message.toString());
        setDatos(payload);
      } catch (err) {
        console.error('❌ Error al parsear mensaje MQTT', err);
      }
    });

    return () => {
      if (client.connected) client.end();
    };
  }, []);

  return (
    <MQTTContext.Provider value={{ datos }}>
      {children}
    </MQTTContext.Provider>
  );
};

export const useMQTT = () => useContext(MQTTContext);
