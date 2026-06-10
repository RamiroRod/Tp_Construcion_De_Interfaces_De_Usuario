import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
// App.jsx
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Inicio from "./pages/Inicio";
import Tienda from "./pages/Tienda";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import Contacto from "./pages/Contacto";
import { productos as productosIniciales } from "./data/Productos";

export default function App() {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });
  
  const [productos, setProductos] =
  useState(productosIniciales);

  useEffect(() => {
  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
  );
}, [carrito]);

  const agregarAlCarrito = (producto) => {
    if (producto.stock <= 0) return;
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find((item) => item.id === producto.id);
      if (productoExistente) {
        return prevCarrito.map((item) => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  

  const descontarStock = () => {
  setProductos(productosActuales =>
    productosActuales.map(producto => {

      const itemComprado = carrito.find(
        item => item.id === producto.id
      );

      if (!itemComprado) return producto;

      return {
        ...producto,
        stock: producto.stock - itemComprado.cantidad
      };
     })
   );
  };

  const aumentarCantidad = (id) => setCarrito((prevCarrito) => prevCarrito.map((item) => item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item));
  const disminuirCantidad = (id) => setCarrito((prevCarrito) => prevCarrito.map((item) => item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item).filter((item) => item.cantidad > 0));
  const eliminarProducto = (id) => setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  const vaciarCarrito = () => setCarrito([]);

  return (
    <ThemeProvider>
      <div className="app-shell">
        <Navbar cantidadCarrito={carrito.length} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/tienda" element={<Tienda  productos={productos} onAgregar={agregarAlCarrito} />} />
            <Route path="/producto/:id" element={<DetalleProducto onAgregar={agregarAlCarrito} />} />
            <Route path="/mis-productos" element={<Carrito carrito={carrito} aumentarCantidad={aumentarCantidad} disminuirCantidad={disminuirCantidad} eliminarProducto={eliminarProducto} vaciarCarrito={vaciarCarrito} descontarStock={descontarStock} />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
