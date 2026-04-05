import { useEffect, useRef, useState } from "react";
import ClienteForm from "../components/ClienteForm";
import ClienteList from "../components/ClienteList";
import BusquedaDocumento from "../components/BusquedaDocumento";
import {
  obtenerClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  buscarClientePorId,
} from "../clienteApi";

function ClientePage() {
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [clienteBuscado, setClienteBuscado] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargandoClientes, setCargandoClientes] = useState(true);
  const [guardandoCliente, setGuardandoCliente] = useState(false);
  const [buscandoCliente, setBuscandoCliente] = useState(false);
  const [eliminandoClienteId, setEliminandoClienteId] = useState(null);
  const formularioRef = useRef(null);

  useEffect(() => {
    let activo = true;

    const cargarClientes = async () => {
      try {
        if (activo) {
          setCargandoClientes(true);
          setError("");
        }

        const data = await obtenerClientes();
        if (activo) {
          setClientes(data);
        }
      } catch (err) {
        if (activo) {
          setError(err.message);
        }
      } finally {
        if (activo) {
          setCargandoClientes(false);
        }
      }
    };

    cargarClientes();

    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    if (!clienteSeleccionado || !formularioRef.current) {
      return;
    }

    formularioRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [clienteSeleccionado]);

  // Carga de clientes reutilizable fuera del efecto inicial
  const cargarClientes = async () => {
    try {
      setCargandoClientes(true);
      const data = await obtenerClientes();
      setClientes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargandoClientes(false);
    }
  };

  // Crear o actualizar cliente
  const handleGuardar = async (payload) => {
    try {
      setGuardandoCliente(true);
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
    } finally {
      setGuardandoCliente(false);
    }
  };

  // Eliminar cliente
  const handleEliminar = async (id) => {
    const confirmado = window.confirm("¿Seguro que deseas eliminar este cliente?");
    if (!confirmado) return;

    try {
      setEliminandoClienteId(id);
      setError("");
      setMensaje("");
      await eliminarCliente(id);
      setMensaje("Cliente eliminado correctamente");
      await cargarClientes();
    } catch (err) {
      setError(err.message);
    } finally {
      setEliminandoClienteId(null);
    }
  };

  // Buscar cliente por ID
  const handleBuscarCliente = async (idCliente) => {
    if (!idCliente.trim()) {
      setClienteBuscado(null);
      setError("Ingresa un ID de cliente para buscar");
      return;
    }

    try {
      setBuscandoCliente(true);
      setError("");
      setMensaje("");
      const data = await buscarClientePorId(idCliente);
      setClienteBuscado(data);
    } catch (err) {
      setClienteBuscado(null);
      setError(err.message);
    } finally {
      setBuscandoCliente(false);
    }
  };

  const handleEditarCliente = (cliente) => {
    setClienteSeleccionado(cliente);
  };

  return (
    <div className="container">
      <h1>Gestión de clientes - Banco</h1>

      {mensaje && <div className="alert success">{mensaje}</div>}
      {error && <div className="alert error">{error}</div>}

      <div ref={formularioRef}>
        <ClienteForm
          key={clienteSeleccionado?.idCliente ?? "nuevo"}
          onSubmit={handleGuardar}
          clienteSeleccionado={clienteSeleccionado}
          onCancel={() => setClienteSeleccionado(null)}
          disabled={guardandoCliente}
        />
      </div>

      <BusquedaDocumento onBuscar={handleBuscarCliente} disabled={buscandoCliente} />

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
        onEditar={handleEditarCliente}
        onEliminar={handleEliminar}
        cargando={cargandoClientes}
        eliminandoClienteId={eliminandoClienteId}
      />
    </div>
  );
}

export default ClientePage;
