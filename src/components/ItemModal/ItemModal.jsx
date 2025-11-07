import "./ItemModal.css";

function ItemModal({ activeModal, handleCloseClick, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__container modal__image-container">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__button-close"
          aria-label="Close modal"
        ></button>
      </div>
    </div>
  );
}

export default ItemModal;
