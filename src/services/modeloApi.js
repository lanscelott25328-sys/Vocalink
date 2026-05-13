const API_URL = "http://127.0.0.1:8000";

export async function obtenerUltimaPrediccion() {
  const response = await fetch(`${API_URL}/latest`);

  if (!response.ok) {
    throw new Error("No se pudo obtener la última predicción");
  }

  return await response.json();
}