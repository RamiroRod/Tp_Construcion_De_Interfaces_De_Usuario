export default function SlideImage({ slide }) {
  return (
    <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center py-3 py-lg-0">
      <div className="slide-img-box" style={{ 
        boxShadow: `0 0 80px ${slide.accent}33`, 
        borderColor: `${slide.accent}44`,
        maxWidth: "100%",
        width: "280px",
        height: "280px"
      }}>
        {slide.image ? (
          <img
            src={slide.image}
            alt={slide.title}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain"
            }}
          />
        ) : (
          <span style={{ fontSize: "3rem" }}>{slide.fallback}</span>
        )}
      </div>
    </div>
  );
}
