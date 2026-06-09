import { Link, useParams } from "react-router-dom";
import { productos, categorias } from "../data/productos";

export default function DetalleProducto({ onAgregar }) {
  const { id } = useParams();
  const producto = productos.find((producto) => producto.id === Number(id));

  if (!producto) {
    return <div className="container py-5"><h2>Producto no encontrado</h2><Link to="/tienda" className="btn-google">Volver al catálogo</Link></div>;
  }

  const sinStock = producto.stock <= 0;
  const categoria = categorias.find((cat) => cat.id === producto.categoria);

  return (
    <section className="py-5 page-section">
      <div className="container">
        <Link to="/tienda" className="btn-google-outline mb-4">← Volver al catálogo</Link>
        <div className="row g-4 align-items-center">
          <div className="col-md-6">
            <div className="detail-img-box">
              {producto.imagen ? <img src={producto.imagen} alt={producto.nombre} onError={(e) => { e.currentTarget.style.display = "none"; }} /> : <span className="product-fallback">{categoria?.icon || "📱"}</span>}
            </div>
          </div>
          <div className="col-md-6">
            <p className="section-label">{categoria?.label}</p>
            <h1>{producto.nombre}</h1>
            <p className="text-secondary">{producto.descripcion}</p>
            <div className="mb-3">{producto.precioAnterior && <span className="old-price">${producto.precioAnterior.toLocaleString("es-AR")}</span>}<h3 className="g-blue-text">${producto.precio.toLocaleString("es-AR")}</h3></div>
            <p><strong>Stock disponible:</strong> {sinStock ? "Sin stock" : producto.stock}</p>
            {sinStock && <span className="badge bg-danger mb-3">No disponible</span>}
            <h5>Características principales</h5>
            <ul>{producto.caracteristicas?.map((item) => <li key={item}>{item}</li>)}</ul>
            <button className="btn-google mt-3" disabled={sinStock} onClick={() => onAgregar(producto)}>Agregar al carrito</button>
          </div>
        </div>
      </div>
    </section>
  );
}
