function GeometricArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-10">
      <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
        <circle cx="250" cy="250" r="200" stroke="#C9A84C" strokeWidth="0.5" />
        <circle cx="180" cy="220" r="150" stroke="#C9A84C" strokeWidth="0.5" />
        <circle cx="320" cy="280" r="150" stroke="#C9A84C" strokeWidth="0.5" />
        <polygon
          points="250,80 400,380 100,380"
          stroke="#C9A84C"
          strokeWidth="0.5"
          fill="none"
        />
        <polygon
          points="250,420 100,120 400,120"
          stroke="#C9A84C"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default GeometricArt