const BASE_URL = import.meta.env.VITE_API_URL || "/api/clientes";

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (response.status === 204) {
    return null;
  }

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text || null;
}

async function request(path = "", options = {}, defaultErrorMessage) {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    const data = await parseResponse(response);

    if (!response.ok) {
      const apiMessage =
        data && typeof data === "object" ? data.message || data.error : null;

      throw new Error(apiMessage || defaultErrorMessage);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "TypeError") {
        throw new Error(
          "No se pudo conectar con el backend. Verifica la API y la configuración de Vite.",
        );
      }

      throw error;
    }

    throw new Error(defaultErrorMessage);
  }
}

export async function obtenerClientes() {
  const data = await request("", { method: "GET" }, "Error al obtener clientes");
  return Array.isArray(data) ? data : [];
}

export async function obtenerClientePorId(id) {
  return request(`/${id}`, { method: "GET" }, "Cliente no encontrado");
}

export async function buscarClientePorId(id) {
  return request(
    `/${encodeURIComponent(id)}`,
    { method: "GET" },
    "Cliente no encontrado",
  );
}

export async function crearCliente(cliente) {
  return request(
    "",
    {
      method: "POST",
      body: JSON.stringify(cliente),
    },
    "Error al crear cliente",
  );
}

export async function actualizarCliente(id, cliente) {
  return request(
    `/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(cliente),
    },
    "Error al actualizar cliente",
  );
}

export async function eliminarCliente(id) {
  return request(`/${id}`, { method: "DELETE" }, "Error al eliminar cliente");
}
