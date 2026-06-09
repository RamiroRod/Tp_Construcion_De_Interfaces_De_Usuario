import { Link } from "react-router-dom";
import CarritoItem from "../components/CarritoItem";
import FormularioCompra from "../components/FormularioCompra";

export default function Carrito({ carrito,descontarStock, aumentarCantidad, disminuirCantidad, eliminarProducto, vaciarCarrito }) {
  const totalGeneral = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

  if (carrito.length === 0) {
    return (
      <section className="py-5 page-section">
        <div className="container text-center">
          <h1 className="mb-3">Carrito</h1>
          <p className="text-secondary">Todavía no agregaste productos.</p>
          <Link to="/tienda" className="btn-google">Ir al catálogo</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 page-section">
      <div className="container">
        <h1 className="mb-4">Carrito de compras</h1>
        <p className="text-secondary">Cantidad total de productos: <strong>{cantidadTotal}</strong></p>
        {carrito.map((item) => <CarritoItem key={item.id} item={item} aumentarCantidad={aumentarCantidad} disminuirCantidad={disminuirCantidad} eliminarProducto={eliminarProducto} />)}
        <div className="google-card mt-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <h3 className="mb-0">Total: ${totalGeneral.toLocaleString("es-AR")}</h3>
          <button className="btn btn-outline-danger" onClick={vaciarCarrito}>Vaciar carrito</button>
        </div>
        <FormularioCompra carrito={carrito} vaciarCarrito={vaciarCarrito} descontarStock={descontarStock} />
      </div>
    </section>
  );
}
