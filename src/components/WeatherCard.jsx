export default function WeatherCard({ ciudad, temp, clima, icono, color }) {
  return (
    <div className="card" style={{ backgroundColor: color }}>
      <h3>{icono} {ciudad}</h3>
      <p className="temp">{temp}</p>
      <p className="clima">{clima}</p>
    </div>
  );
}
