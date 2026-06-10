import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function ProductoCard({ producto, onAgregar }) {
  const { darkMode } = useTheme();
  const sinStock = producto.stock <= 0;

  return (
    <div className="product-card h-100">
      <div className="product-img-box">
        {producto.nuevo && <span className="product-badge badge-new">Nuevo</span>}
        {producto.precioAnterior && <span className="product-badge badge-off">Oferta</span>}
        {producto.imagen ? (
          <img src={producto.imagen} alt={producto.nombre} onError={(e) => { e.currentTarget.style.display = "none"; }} />
        ) : (
          <span className="product-fallback">{producto.categoria === "audio" ? "🎧" : producto.categoria === "wearables" ? "⌚" : producto.categoria === "hogar" ? "🏠" : "📱"}</span>
        )}
      </div>

      <div className="product-body">
        <p className="product-category">{producto.categoria}</p>
        <h5>{producto.nombre}</h5>
        <p className="product-desc">{producto.descripcion}</p>

        <div className="mb-2">
          {producto.precioAnterior && <span className="old-price">${producto.precioAnterior.toLocaleString("es-AR")}</span>}
          <span className="product-price">${producto.precio.toLocaleString("es-AR")}</span>
        </div>

        {sinStock ? <span className="badge bg-danger mb-3">Sin stock</span> : <span className="badge bg-success mb-3">Stock: {producto.stock}</span>}

        <div className="mt-auto d-flex gap-2">
          <Link to={`/producto/${producto.id}`} className="btn btn-detalle w-50">Detalle</Link>
          <button className="btn-google w-50" disabled={sinStock} onClick={() => onAgregar(producto)}>Agregar</button>
        </div>
      </div>
    </div>
  );
}
