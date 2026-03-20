import "./ItemModal.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function ItemModal({ isOpen, handleCloseClick, card, onRemoveItem }) {
  const { currentUser, isLoggedIn } = useContext(CurrentTemperatureUnitContext);

  const isOwn = isLoggedIn && card.owner === currentUser._id;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__image-container">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__button-close"
          aria-label="Close modal"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        {isOwn && (
          <button
            onClick={() => onRemoveItem(card)}
            type="button"
            className="modal__button-delete"
            aria-label="delete card"
          >
            Delete item
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
