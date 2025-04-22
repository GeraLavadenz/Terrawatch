export async function getDatosSensores() {
    try {
      const res = await fetch("http://192.168.1.42/sensores"); // IP del ESP32
      if (!res.ok) throw new Error("Error al obtener datos del ESP32");
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Fallo al obtener datos del ESP32:", error);
      return null;
    }
  }
  