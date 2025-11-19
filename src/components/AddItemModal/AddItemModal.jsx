import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

const AddItemModal = ({ isOpen, handleSubmit, handleCloseClick }) => {
  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__form-label">
        Name{" "}
      </label>
      <input
        type="text"
        className="modal__form-input"
        id="name"
        name="name"
        placeholder="Name"
        required
        minLength="2"
        maxLength="30"
      />
      <label htmlFor="imageURL" className="modal__form-label">
        Image{" "}
      </label>
      <input
        type="url"
        className="modal__form-input"
        id="imageURL"
        name="image-link"
        placeholder="Image URL"
        required
      />
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label
          htmlFor="hot"
          className="modal__form-label modal__label-type-radio"
        >
          <input
            type="radio"
            className="modal__radio-input"
            id="hot"
            value="hot"
            name="weather-type"
          />{" "}
          Hot
        </label>
        <label
          htmlFor="warm"
          className="modal__form-label modal__label-type-radio"
        >
          <input
            type="radio"
            className="modal__radio-input"
            id="warm"
            value="warm"
            name="weather-type"
          />{" "}
          Warm
        </label>
        <label
          htmlFor="cold"
          className="modal__form-label modal__label-type-radio"
        >
          <input
            type="radio"
            className="modal__radio-input"
            id="cold"
            value="cold"
            name="weather-type"
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
