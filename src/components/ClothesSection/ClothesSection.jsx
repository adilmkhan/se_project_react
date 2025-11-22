import "./ClothesSection.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection() {
  const { weatherData, clothingItems, handleCardClick } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <div className="clothessection">
      <div>
        <p>Text</p>
        <button>Button</button>
      </div>
      <div className="clothes">
        <ul className="clothes__list">
          {clothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
