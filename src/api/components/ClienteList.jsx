function ClienteList({ clientes, onEditar, onEliminar }) {
  return (
    <div className="card">
      <h2>Listado de clientes</h2>

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
          {clientes.length === 0 ? (
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
                  <button onClick={() => onEditar(cliente)}>Editar</button>
                  <button className="danger" onClick={() => onEliminar(cliente.idCliente)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ClienteList;