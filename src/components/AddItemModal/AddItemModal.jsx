import { useForm } from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

const AddItemModal = ({ isOpen, onAddItem, handleCloseClick }) => {
  const defaultValues = {
    name: "",
    imageLink: "",
    weatherType: "",
  };
  const { values, handleChange } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
  }
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
        value={values.name}
        onChange={handleChange}
      />
      <label htmlFor="imageURL" className="modal__form-label">
        Image{" "}
      </label>
      <input
        type="url"
        className="modal__form-input"
        id="imageURL"
        name="imageLink"
        placeholder="Image URL"
        required
        value={values.imageLink}
        onChange={handleChange}
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
            name="weatherType"
            onChange={handleChange}
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
            name="weatherType"
            onChange={handleChange}
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
            name="weatherType"
            onChange={handleChange}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
