import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  handleCloseClick,
}) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__container">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__button-close"
          aria-label="Close modal"
        ></button>
        <h2 className="modal__form-title">{title}</h2>
        <form class="modal__form">
          {children}
          <button type="submit" class="modal__button modal__button-save">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
