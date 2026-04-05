import { useEffect, useRef, useState } from "react";

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

function normalizarFecha(valor) {
    if (!valor) {
        return "";
    }

    return String(valor).slice(0, 10);
}

function ClienteForm ({onSubmit,clienteSeleccionado, onCancel, disabled = false}){
    const numeroDocumentoInputRef = useRef(null);
    const [formData, setFormData] = useState(() => {
        if (!clienteSeleccionado) {
            return { ...clienteVacio };
        }

        return {
            tipoDocumento:clienteSeleccionado.tipoDocumento || "DNI",
            numeroDocumento: clienteSeleccionado.numeroDocumento || "",
            nombres: clienteSeleccionado.nombres || "",
            apellidos: clienteSeleccionado.apellidos || "",
            correo: clienteSeleccionado.correo || "",
            telefono: clienteSeleccionado.telefono || "",
            fechaNacimiento: normalizarFecha(clienteSeleccionado.fechaNacimiento),
            ingresoMensual: clienteSeleccionado.ingresoMensual || "",
            scoreRiesgo: clienteSeleccionado.scoreRiesgo || "",
        };
    });

    const [errorFormulario, setErrorFormulario] = useState("");

    useEffect(() => {
        if (!clienteSeleccionado || !numeroDocumentoInputRef.current) {
            return;
        }

        numeroDocumentoInputRef.current.focus();
        numeroDocumentoInputRef.current.select();
    }, [clienteSeleccionado]);

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

        if (!formData.numeroDocumento.trim() || !formData.nombres.trim() || !formData.apellidos.trim()) {
            setErrorFormulario("Completa los campos obligatorios.");
            return;
        }

        if (formData.ingresoMensual === "" || Number(formData.ingresoMensual) < 0) {
            setErrorFormulario("El ingreso mensual debe ser un número válido.");
            return;
        }

        if (formData.scoreRiesgo === "" || Number(formData.scoreRiesgo) < 0) {
            setErrorFormulario("El score de riesgo debe ser un número válido.");
            return;
        }

        setErrorFormulario("");
        
        const payload = {
            ...formData,
            numeroDocumento: formData.numeroDocumento.trim(),
            nombres: formData.nombres.trim(),
            apellidos: formData.apellidos.trim(),
            correo: formData.correo.trim(),
            telefono: formData.telefono.trim(),
            fechaNacimiento: normalizarFecha(formData.fechaNacimiento),
            ingresoMensual: Number(formData.ingresoMensual),
            scoreRiesgo: Number(formData.scoreRiesgo),
        };

        onSubmit(payload);

        if(!clienteSeleccionado){
            setFormData({ ...clienteVacio });
        }
    };
  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{clienteSeleccionado ? "Editar cliente" : "Registrar cliente"}</h2>

      {errorFormulario && <div className="alert error">{errorFormulario}</div>}

      <div className="grid">
        <label>
          Tipo documento
          <select name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange} disabled={disabled}>
            <option value="DNI">DNI</option>
            <option value="CE">CE</option>
            <option value="PAS">PAS</option>
          </select>
        </label>

        <label>
          Número documento
          <input
            name="numeroDocumento"
            ref={numeroDocumentoInputRef}
            value={formData.numeroDocumento}
            onChange={handleChange}
            required
            disabled={disabled}
          />
        </label>

        <label>
          Nombres
          <input name="nombres" value={formData.nombres} onChange={handleChange} required disabled={disabled} />
        </label>

        <label>
          Apellidos
          <input name="apellidos" value={formData.apellidos} onChange={handleChange} required disabled={disabled} />
        </label>

        <label>
          Correo
          <input name="correo" type="email" value={formData.correo} onChange={handleChange} disabled={disabled} />
        </label>

        <label>
          Teléfono
          <input name="telefono" value={formData.telefono} onChange={handleChange} disabled={disabled} />
        </label>

        <label>
          Fecha nacimiento
          <input
            name="fechaNacimiento"
            type="date"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            disabled={disabled}
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
            min="0"
            disabled={disabled}
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
            min="0"
            disabled={disabled}
          />
        </label>
      </div>

      <div className="actions">
        <button type="submit" disabled={disabled}>
          {disabled ? "Guardando..." : clienteSeleccionado ? "Actualizar" : "Guardar"}
        </button>

        {clienteSeleccionado && (
          <button type="button" className="secondary" onClick={onCancel} disabled={disabled}>
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}

export default ClienteForm;
