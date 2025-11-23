import "./ClothesSection.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection() {
  const { handleAddClick, clothingItems, handleCardClick } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <div className="clothessection">
      <div className="clothessection__content">
        <p className="clothessection__title">Your items</p>
        <button onClick={handleAddClick} className="clothessection__button">
          + Add new
        </button>
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
