import { useEffect, useState } from "react";
import ClienteForm from "../components/ClienteForm";
import ClienteList from "../components/ClienteList";
import BusquedaDocumento from "../components/BusquedaDocumento";
import {
  obtenerClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  buscarClientePorDocumento,
} from "../clienteApi";

function ClientePage() {
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [clienteBuscado, setClienteBuscado] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    const cargarClientes = async () => {
      try {
        const data = await obtenerClientes();
        if (activo) {
          setClientes(data);
        }
      } catch (err) {
        if (activo) {
          setError(err.message);
        }
      }
    };

    cargarClientes();

    return () => {
      activo = false;
    };
  }, []);

  // Carga de clientes reutilizable fuera del efecto inicial
  const cargarClientes = async () => {
    try {
      const data = await obtenerClientes();
      setClientes(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Crear o actualizar cliente
  const handleGuardar = async (payload) => {
    try {
      setError("");
      setMensaje("");

      if (clienteSeleccionado) {
        await actualizarCliente(clienteSeleccionado.idCliente, payload);
        setMensaje("Cliente actualizado correctamente");
      } else {
        await crearCliente(payload);
        setMensaje("Cliente creado correctamente");
      }

      setClienteSeleccionado(null);
      await cargarClientes();
    } catch (err) {
      setError(err.message);
    }
  };

  // Eliminar cliente
  const handleEliminar = async (id) => {
    const confirmado = window.confirm("¿Seguro que deseas eliminar este cliente?");
    if (!confirmado) return;

    try {
      setError("");
      setMensaje("");
      await eliminarCliente(id);
      setMensaje("Cliente eliminado correctamente");
      await cargarClientes();
    } catch (err) {
      setError(err.message);
    }
  };

  // Buscar cliente por documento
  const handleBuscarDocumento = async (numeroDocumento) => {
    try {
      setError("");
      setMensaje("");
      const data = await buscarClientePorDocumento(numeroDocumento);
      setClienteBuscado(data);
    } catch (err) {
      setClienteBuscado(null);
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Gestión de clientes - Banco</h1>

      {mensaje && <div className="alert success">{mensaje}</div>}
      {error && <div className="alert error">{error}</div>}

      <ClienteForm
        key={clienteSeleccionado?.idCliente ?? "nuevo"}
        onSubmit={handleGuardar}
        clienteSeleccionado={clienteSeleccionado}
        onCancel={() => setClienteSeleccionado(null)}
      />

      <BusquedaDocumento onBuscar={handleBuscarDocumento} />

      {clienteBuscado && (
        <div className="card">
          <h2>Resultado de búsqueda</h2>
          <p><strong>ID:</strong> {clienteBuscado.idCliente}</p>
          <p><strong>Nombre:</strong> {clienteBuscado.nombres} {clienteBuscado.apellidos}</p>
          <p><strong>Documento:</strong> {clienteBuscado.tipoDocumento} - {clienteBuscado.numeroDocumento}</p>
          <p><strong>Correo:</strong> {clienteBuscado.correo}</p>
        </div>
      )}

      <ClienteList
        clientes={clientes}
        onEditar={setClienteSeleccionado}
        onEliminar={handleEliminar}
      />
    </div>
  );
}

export default ClientePage;
