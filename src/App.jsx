import Header from './components/Header.jsx'
import WeatherCard from './components/WeatherCard.jsx'
import Footer from './components/Footer.jsx'
import './index.css'

function App() {
  return (
    <div className="app">
      <Header />
      <div className="cards-container">
        <WeatherCard ciudad="Mexicali" temp="38°C" clima="Soleado" icono="☀️" color="#FF7F50" />
        <WeatherCard ciudad="Tijuana" temp="25°C" clima="Parcialmente Nublado" icono="🌤️" color="#4CC9F0" />
        <WeatherCard ciudad="Ensenada" temp="21°C" clima="Lluvioso" icono="🌧️" color="#4361EE" />
      </div>
      <Footer />
    </div>
  )
}

export default App
