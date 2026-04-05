function ClienteList({ clientes, onEditar, onEliminar, cargando = false, eliminandoClienteId = null }) {
  return (
    <div className="card">
      <h2>Listado de clientes</h2>

      <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Documento</th>
            <th>Nombre completo</th>
            <th>Correo</th>
            <th>Ingreso</th>
            <th>Score</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cargando ? (
            <tr>
              <td colSpan="7">Cargando clientes...</td>
            </tr>
          ) : clientes.length === 0 ? (
            <tr>
              <td colSpan="7">No hay clientes registrados</td>
            </tr>
          ) : (
            clientes.map((cliente) => (
              <tr key={cliente.idCliente}>
                <td>{cliente.idCliente}</td>
                <td>{cliente.tipoDocumento} - {cliente.numeroDocumento}</td>
                <td>{cliente.nombres} {cliente.apellidos}</td>
                <td>{cliente.correo}</td>
                <td>{cliente.ingresoMensual}</td>
                <td>{cliente.scoreRiesgo}</td>
                <td>
                  <button onClick={() => onEditar(cliente)} disabled={eliminandoClienteId === cliente.idCliente}>
                    Editar
                  </button>
                  <button className="danger" onClick={() => onEliminar(cliente.idCliente)} disabled={eliminandoClienteId === cliente.idCliente}>
                    {eliminandoClienteId === cliente.idCliente ? "Eliminando..." : "Eliminar"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default ClienteList;
