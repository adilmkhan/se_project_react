import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./Main.css";

function Main({ weatherData, clothingItems, handleCardClick }) {
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <p className="card-text">
        Today is {Math.round(weatherData.temp.F)} &deg; F / You may want to
        wear:
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
