export default function CarritoItem({ item, aumentarCantidad, disminuirCantidad, eliminarProducto }) {
  const subtotal = item.precio * item.cantidad;
  const puedeAumentar = item.cantidad < item.stock;

  return (
    <div className="cart-item mb-3">
      <div className="row align-items-center g-3">
        <div className="col-md-4">
          <h5>{item.nombre}</h5>
          <p className="mb-0 text-secondary">Precio unitario: ${item.precio.toLocaleString("es-AR")}</p>
          {item.stock && <p className="mb-0 text-secondary" style={{ fontSize: "0.85rem" }}>Stock disponible: {item.stock}</p>}
        </div>
        <div className="col-md-3 d-flex align-items-center gap-2">
          <button className="btn btn-outline-light btn-sm" onClick={() => disminuirCantidad(item.id)}>-</button>
          <span className="fw-bold">{item.cantidad}</span>
          <button className="btn btn-outline-light btn-sm" onClick={() => aumentarCantidad(item.id)} disabled={!puedeAumentar}>+</button>
        </div>
        <div className="col-md-3">
          <p className="mb-0 fw-bold g-green-text">Subtotal: ${subtotal.toLocaleString("es-AR")}</p>
        </div>
        <div className="col-md-2 text-md-end">
          <button className="btn btn-danger btn-sm" onClick={() => eliminarProducto(item.id)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}
