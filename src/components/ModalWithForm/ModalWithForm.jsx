import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  handleCloseClick,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__button-close"
          aria-label="Close modal"
        ></button>
        <h2 className="modal__form-title">{title}</h2>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__button modal__button-save">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
