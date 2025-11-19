import "./ModalWithForm.css";

function ModalWithForm({
  buttonText = "Save",
  title,
  name,
  isOpen,
  handleCloseClick,
  children,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__button-close_add"
          aria-label="Close modal"
        ></button>
        <h2 className="modal__form-title">{title}</h2>
        <form className="modal__form" name={name}>
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
