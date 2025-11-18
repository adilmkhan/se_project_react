import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./Main.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";

function Main() {
  const {
    currentTemperatureUnit,
    weatherData,
    clothingItems,
    handleCardClick,
  } = useContext(CurrentTemperatureUnitContext);
  return (
    <main>
      <WeatherCard />
      <p className="card-text">
        Today is{" "}
        {currentTemperatureUnit === "F"
          ? Math.round(weatherData.temp.F)
          : Math.round(weatherData.temp.C)}
        &deg; {currentTemperatureUnit} / You may want to wear:
      </p>
      <section className="cards">
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
