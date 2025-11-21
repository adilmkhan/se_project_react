import "./ItemModal.css";
// import "../ModalWithForm/ModalWithForm.css";
function ItemModal({ isOpen, handleCloseClick, card }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container modal__image-container">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__button-close"
          aria-label="Close modal"
        ></button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
