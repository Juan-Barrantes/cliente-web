const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8081/clientes";

//Obtiene todos los clientes
export async function obtenerClientes(){
    const response = await fetch(API_BASE_URL);
    if(!response.ok){
        throw new Error("Error al obtener clientes");
    }
    return response.json();
}

//Obtiene un cliente por ID
export async function obtenerClientePorId(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if(!response.ok){
        throw new Error("Cliente no encontrado");
    }
    return response.json();
}

//Busca cliente por número de documento
export async function buscarClientePorDocumento(numeroDocumento) {
    const response = await fetch(`${API_BASE_URL}/documento/${numeroDocumento}`);
    if(!response.ok){
        throw new Error("Cliente no encontrado por documento");
    }
    return response.json();    
}

//Crear un nuevo cliente
export async function crearCliente(cliente) {
    const response =await fetch(API_BASE_URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(cliente),
        });
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear cliente");
    }
    return response.json();
}

//Actualiza un cliente existente
export async function actualizarCliente(id, cliente) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar cliente");
  }

  return response.json();
}

//Eliminar un cliente
export async function eliminarCliente(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`,{
        method:"DELETE",
        });
    if(!response.ok){
        throw new Error("Error al eliminar cliente");
    }
    
}
