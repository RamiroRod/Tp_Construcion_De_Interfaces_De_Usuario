import { useState } from "react";
import ProductoCard from "../components/ProductoCard";
import { categorias } from "../data/productos";

export default function Tienda({productos, onAgregar }) {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [ordenPrecio, setOrdenPrecio] = useState("");
  const [soloConStock, setSoloConStock] = useState(false);

  let productosFiltrados = productos.filter((producto) => producto.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  if (categoriaSeleccionada !== "todos") productosFiltrados = productosFiltrados.filter((producto) => producto.categoria === categoriaSeleccionada);
  if (soloConStock) productosFiltrados = productosFiltrados.filter((producto) => producto.stock > 0);
  if (ordenPrecio === "menor") productosFiltrados = [...productosFiltrados].sort((a, b) => a.precio - b.precio);
  if (ordenPrecio === "mayor") productosFiltrados = [...productosFiltrados].sort((a, b) => b.precio - a.precio);

  return (
    <section className="py-5 page-section">
      <div className="container">
        <div className="text-center mb-4">
          <p className="section-label">Catálogo</p>
          <h1 className="section-title">Productos Google</h1>
          <p className="text-secondary">Pixel, Nest, wearables, audio y accesorios oficiales.</p>
        </div>

        <div className="filter-card mb-4">
          <div className="row g-3">
            <div className="col-md-4"><label className="form-label">Buscar por nombre</label><input className="form-control" placeholder="Ej: Pixel, Buds, Nest..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} /></div>
            <div className="col-md-3"><label className="form-label">Categoría</label><select className="form-select" value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)}><option value="todos">Todas</option>{categorias.map((categoria) => <option key={categoria.id} value={categoria.id}>{categoria.label}</option>)}</select></div>
            <div className="col-md-3"><label className="form-label">Ordenar por precio</label><select className="form-select" value={ordenPrecio} onChange={(e) => setOrdenPrecio(e.target.value)}><option value="">Sin ordenar</option><option value="menor">Menor a mayor</option><option value="mayor">Mayor a menor</option></select></div>
            <div className="col-md-2 d-flex align-items-end"><div className="form-check"><input id="stock" type="checkbox" className="form-check-input" checked={soloConStock} onChange={(e) => setSoloConStock(e.target.checked)} /><label htmlFor="stock" className="form-check-label">Con stock</label></div></div>
          </div>
        </div>

        <p className="text-secondary">Productos encontrados: {productosFiltrados.length}</p>

        <div className="row g-4">
          {productosFiltrados.length > 0 ? productosFiltrados.map((producto) => (
            <div className="col-md-6 col-lg-4" key={producto.id}><ProductoCard producto={producto} onAgregar={onAgregar} /></div>
          )) : <div className="col-12"><div className="alert alert-warning">No se encontraron productos con esos filtros.</div></div>}
        </div>
      </div>
    </section>
  );
}
