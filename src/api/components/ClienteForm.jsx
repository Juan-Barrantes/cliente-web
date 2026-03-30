import { useState } from "react";

const clienteVacio = {
    tipoDocumento: "DNI",
    numeroDocumento: "",
    nombres:"",
    apellidos:"",
    correo:"",
    telefono:"",
    fechaNacimiento:"",
    ingresoMensual:"",
    scoreRiesgo:"",
};

function ClienteForm ({onSubmit,clienteSeleccionado, onCancel}){
    const [formData, setFormData] = useState(() => {
        if (!clienteSeleccionado) {
            return clienteVacio;
        }

        return {
            tipoDocumento:clienteSeleccionado.tipoDocumento || "DNI",
            numeroDocumento: clienteSeleccionado.numeroDocumento || "",
            nombres: clienteSeleccionado.nombres || "",
            apellidos: clienteSeleccionado.apellidos || "",
            correo: clienteSeleccionado.correo || "",
            telefono: clienteSeleccionado.telefono || "",
            fechaNacimiento: clienteSeleccionado.fechaNacimiento || "",
            ingresoMensual: clienteSeleccionado.ingresoMensual || "",
            scoreRiesgo: clienteSeleccionado.scoreRiesgo || "",
        };
    });

    //Actualiza un campo del formulario
    const handleChange = (e) => {
        const {name, value} =e.target;
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }));
    };

    //Envía la data al padre
    const handleSubmit =(e) => {
        e.preventDefault();
        
        const payload = {
            ...formData,
            ingresoMensual: Number(formData.ingresoMensual),
            scoreRiesgo: Number(formData.scoreRiesgo),
        };

        onSubmit(payload);

        if(!clienteSeleccionado){
            setFormData(clienteVacio);
        }
    };
  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{clienteSeleccionado ? "Editar cliente" : "Registrar cliente"}</h2>

      <div className="grid">
        <label>
          Tipo documento
          <select name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange}>
            <option value="DNI">DNI</option>
            <option value="CE">CE</option>
            <option value="PAS">PAS</option>
          </select>
        </label>

        <label>
          Número documento
          <input
            name="numeroDocumento"
            value={formData.numeroDocumento}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Nombres
          <input name="nombres" value={formData.nombres} onChange={handleChange} required />
        </label>

        <label>
          Apellidos
          <input name="apellidos" value={formData.apellidos} onChange={handleChange} required />
        </label>

        <label>
          Correo
          <input name="correo" type="email" value={formData.correo} onChange={handleChange} />
        </label>

        <label>
          Teléfono
          <input name="telefono" value={formData.telefono} onChange={handleChange} />
        </label>

        <label>
          Fecha nacimiento
          <input
            name="fechaNacimiento"
            type="date"
            value={formData.fechaNacimiento}
            onChange={handleChange}
          />
        </label>

        <label>
          Ingreso mensual
          <input
            name="ingresoMensual"
            type="number"
            step="0.01"
            value={formData.ingresoMensual}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Score riesgo
          <input
            name="scoreRiesgo"
            type="number"
            value={formData.scoreRiesgo}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className="actions">
        <button type="submit">
          {clienteSeleccionado ? "Actualizar" : "Guardar"}
        </button>

        {clienteSeleccionado && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}

export default ClienteForm;
