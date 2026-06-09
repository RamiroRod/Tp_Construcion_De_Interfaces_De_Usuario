import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { categorias, productos } from "../data/productos";

const slides = [
  { id: 1, title: "Google Pixel 9 Pro", subtitle: "Cámara Pro, Gemini integrado y rendimiento premium para todos los días.", tag: "NUEVA GENERACIÓN", accent: "#4285F4", cta: "Ver smartphones", image:"/images/pixel9pro.png", fallback: "📱" },
  { id: 2, title: "Pixel Watch 3", subtitle: "Salud, deporte y productividad desde tu muñeca con Wear OS.", tag: "WEARABLES", accent: "#34A853", cta: "Explorar relojes", image:"/images/pixelwatch3.png", fallback: "⌚" },
  { id: 3, title: "Pixel Buds Pro 2", subtitle: "Audio inmersivo, cancelación de ruido y conexión perfecta con Android.", tag: "AUDIO", accent: "#EA4335", cta: "Ver audio", image:"/images/pixelbudspro2.png", fallback: "🎧" },
];

const stats = [
  { value: "100%", label: "Originales" },
  { value: "48hs", label: "Despacho" },
  { value: "12 MSI", label: "Cuotas" },
  { value: "7 años", label: "Updates Pixel" },
];

export default function Inicio() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { darkMode } = useTheme();
  const slide = slides[activeSlide];
  const destacados = productos.filter((p) => p.destacado).slice(0, 4);

  useEffect(() => {
    const t = setInterval(() => setActiveSlide((prev) => (prev + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const prev = () => setActiveSlide((activeSlide - 1 + slides.length) % slides.length);
  const next = () => setActiveSlide((activeSlide + 1) % slides.length);

  return (
    <>
      <section className="hero-section" style={{ "--slide-accent": slide.accent }}>
        <div className="hero-glow" style={{ background: `radial-gradient(ellipse 55% 70% at 72% 50%, ${slide.accent}30 0%, transparent 68%)` }} />
        <div className="container-fluid px-4 px-lg-5 position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center" style={{ minHeight: "86vh" }}>
            <div className="col-lg-6 py-5">
              <span className="slide-tag" style={{ background: slide.accent }}>{slide.tag}</span>
              <h1 className="slide-title" style={{ textShadow: `0 0 70px ${slide.accent}55` }}>{slide.title}</h1>
              <p className="slide-sub">{slide.subtitle}</p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/tienda" className="btn-google">{slide.cta} →</Link>
                <Link to="/tienda" className="btn-google-outline">Saber más</Link>
              </div>
              <div className="d-flex gap-2 mt-4">
                {slides.map((_, i) => <button key={i} className="slide-dot" onClick={() => setActiveSlide(i)} aria-label={`Slide ${i + 1}`} style={{ width: i === activeSlide ? 32 : 8, background: i === activeSlide ? slide.accent : "#5f6368" }} />)}
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center">
              <div className="slide-img-box" style={{ boxShadow: `0 0 80px ${slide.accent}33`, borderColor: `${slide.accent}44` }}>
                {slide.image ? (
                  <img
                    src={slide.image}
                    alt={slide.title}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain"}
                      }/>
                        ) : (
                <span style={{ fontSize: "7rem" }}>{slide.fallback}</span>)}
              </div>
            </div>
          </div>
        </div>
        <button className="slider-arrow prev" onClick={prev} >‹</button>
        <button className="slider-arrow next" onClick={next} >›</button>
      </section>

      <section className="about-strip">
        <div className="container-fluid px-4 px-lg-5 py-4">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-3 mb-lg-0">
              <h2 className="fw-bold mb-1 g-blue-text" style={{ fontSize: "1.25rem" }}>Bienvenido a Google Tech Argentina</h2>
              <p className="mb-0 text-secondary" style={{ fontSize: "0.9rem", maxWidth: 560 }}>La tienda de productos Google en Argentina. Smartphones Pixel, wearables, audio, hogar inteligente y accesorios con garantía local.</p>
            </div>
            <div className="col-lg-5"><div className="d-flex justify-content-lg-end justify-content-center gap-4 flex-wrap">{stats.map((s) => <div key={s.label} className="text-center"><div className="stat-value">{s.value}</div><div className="stat-label">{s.label}</div></div>)}</div></div>
          </div>
        </div>
      </section>

      <section className="py-5 page-section">
        <div className="container-fluid px-4 px-lg-5">
          <div className="text-center mb-5"><p className="section-label">Nuestro catálogo</p><h2 className="section-title">Explorá todas las categorías</h2></div>
          <div className="row g-4">
            {categorias.map((cat) => <div className="col-6 col-lg" key={cat.id}><Link to="/tienda" className="cat-card" style={{ borderColor: `${cat.accent}28` }}><div className="cat-icon">{cat.icon}</div><h3 className="cat-name" style={{ color: cat.accent }}>{cat.label}</h3><p className="cat-desc">Productos oficiales Google</p></Link></div>)}
          </div>
          <div className="text-center mt-5"><Link to="/tienda" className="btn-google large">Ver todo el catálogo →</Link></div>
        </div>
      </section>

      <section className="py-5 promo-section">
        <div className="container-fluid px-4 px-lg-5">
          <div className="row align-items-center">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <span className="badge mb-3 px-3 py-2 bg-primary">DESTACADOS</span>
              <h2 className="fw-bold mb-2">Los favoritos de Google Tech Argentina</h2>
              <p className="text-secondary" style={{ maxWidth: 560 }}>Equipos seleccionados por rendimiento, integración con Android y experiencia Google AI.</p>
            </div>
            <div className="col-lg-4">
              <div className="row g-2">{destacados.map((p) => <div className="col-6" key={p.id}><div className="mini-product"><strong>{p.nombre}</strong><span>${p.precio.toLocaleString("es-AR")}</span></div></div>)}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
