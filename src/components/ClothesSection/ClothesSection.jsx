import "./ClothesSection.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ClothesSection({ onCardLike }) {
  const { handleAddClick, clothingItems, handleCardClick } = useContext(
    CurrentTemperatureUnitContext,
  );
  const { currentUser } = useContext(CurrentUserContext);
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
          {clothingItems
            .filter((item) => {
              return item.owner === currentUser._id;
            })
            .map((item) => {
              const isLiked = item.likes?.includes(currentUser._id) || false;
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  isLiked={isLiked}
                  onCardLike={onCardLike}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
}
