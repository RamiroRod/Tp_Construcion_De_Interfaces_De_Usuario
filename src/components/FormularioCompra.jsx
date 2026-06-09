import { useState } from "react";

export default function FormularioCompra({ carrito, vaciarCarrito,descontarStock }) {
  const [formulario, setFormulario] = useState({ nombreApellido: "", email: "", telefono: "", direccion: "", metodoEntrega: "", mensaje: "" });
  const [errores, setErrores] = useState({});
  const [confirmacion, setConfirmacion] = useState("");

  const handleChange = (e) => setFormulario({ ...formulario, [e.target.name]: e.target.value });

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!formulario.nombreApellido.trim()) nuevosErrores.nombreApellido = "El nombre y apellido es obligatorio.";
    if (!formulario.email.trim()) nuevosErrores.email = "El email es obligatorio.";
    else if (!/\S+@\S+\.\S+/.test(formulario.email)) nuevosErrores.email = "El email no tiene un formato válido.";
    if (!formulario.telefono.trim()) nuevosErrores.telefono = "El teléfono es obligatorio.";
    if (!formulario.direccion.trim()) nuevosErrores.direccion = "La dirección o localidad es obligatoria.";
    if (!formulario.metodoEntrega) nuevosErrores.metodoEntrega = "Seleccioná un método de entrega.";
    if (carrito.length === 0) nuevosErrores.carrito = "No podés confirmar una compra con el carrito vacío.";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    descontarStock();
    setConfirmacion(`Gracias ${formulario.nombreApellido}. Tu compra fue confirmada de manera simulada.`);
    setFormulario({ nombreApellido: "", email: "", telefono: "", direccion: "", metodoEntrega: "", mensaje: "" });
    vaciarCarrito();
  };

  return (
    <div className="google-card mt-4">
      <h3 className="mb-3">Datos para la compra</h3>
      {errores.carrito && <div className="alert alert-danger">{errores.carrito}</div>}
      {confirmacion && <div className="alert alert-success">{confirmacion}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6"><label className="form-label">Nombre y apellido</label><input name="nombreApellido" className="form-control" value={formulario.nombreApellido} onChange={handleChange} />{errores.nombreApellido && <small className="text-danger">{errores.nombreApellido}</small>}</div>
          <div className="col-md-6"><label className="form-label">Email</label><input name="email" type="text" className="form-control" value={formulario.email} onChange={handleChange} />{errores.email && <small className="text-danger">{errores.email}</small>}</div>
          <div className="col-md-6"><label className="form-label">Teléfono</label><input name="telefono" className="form-control" value={formulario.telefono} onChange={handleChange} />{errores.telefono && <small className="text-danger">{errores.telefono}</small>}</div>
          <div className="col-md-6"><label className="form-label">Dirección o localidad</label><input name="direccion" className="form-control" value={formulario.direccion} onChange={handleChange} />{errores.direccion && <small className="text-danger">{errores.direccion}</small>}</div>
          <div className="col-md-6"><label className="form-label">Método de entrega</label><select name="metodoEntrega" className="form-select" value={formulario.metodoEntrega} onChange={handleChange}><option value="">Seleccionar</option><option value="retiro">Retiro en sucursal</option><option value="envio">Envío a domicilio</option><option value="correo">Envío por correo</option></select>{errores.metodoEntrega && <small className="text-danger">{errores.metodoEntrega}</small>}</div>
          <div className="col-12"><label className="form-label">Mensaje o aclaración</label><textarea name="mensaje" className="form-control" rows="3" value={formulario.mensaje} onChange={handleChange} /></div>
        </div>
        <button type="submit" className="btn-google mt-4">Confirmar compra</button>
      </form>
    </div>
  );
}
