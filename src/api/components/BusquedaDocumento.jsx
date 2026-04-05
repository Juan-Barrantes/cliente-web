import { useState } from "react";

function BusquedaDocumento({ onBuscar, disabled = false }) {
  const [idCliente, setIdCliente] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar(idCliente.trim());
  };

  return (
    <form className="card form-inline" onSubmit={handleSubmit}>
      <h2>Buscar cliente por ID</h2>
      <input
        placeholder="Ingrese ID del cliente"
        value={idCliente}
        onChange={(e) => setIdCliente(e.target.value)}
        disabled={disabled}
      />
      <button type="submit" disabled={disabled}>
        {disabled ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
}

export default BusquedaDocumento;
