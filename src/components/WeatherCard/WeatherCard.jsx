import { useContext } from "react";
import sunny from "../../assets/sunny.png";
import "./WeatherCard.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard() {
  const { currentTemperatureUnit, weatherData } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === "F"
          ? Math.round(weatherData.temp.F)
          : Math.round(weatherData.temp.C)}
        &deg; {currentTemperatureUnit}
      </p>
      <img src={sunny} alt="sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
