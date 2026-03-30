import { useState } from "react";

function BusquedaDocumento({ onBuscar }) {
  const [numeroDocumento, setNumeroDocumento] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar(numeroDocumento);
  };

  return (
    <form className="card form-inline" onSubmit={handleSubmit}>
      <h2>Buscar cliente por documento</h2>
      <input
        placeholder="Ingrese número de documento"
        value={numeroDocumento}
        onChange={(e) => setNumeroDocumento(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}

export default BusquedaDocumento;
