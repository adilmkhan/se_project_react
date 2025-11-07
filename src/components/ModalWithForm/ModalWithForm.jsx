import "./ModalWithForm.css";

function ModalWithForm() {
  return (
    <div class="modal" id="new-post-modal">
      <div class="modal__container">
        <form class="modal__form">
          <button
            type="button"
            className="modal__button-close"
            aria-label="Close modal"
          ></button>
          <h2 className="modal__form-title">New Garment</h2>
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
            minlength="2"
            maxlength="30"
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
              <input type="radio" className="modal__radio-input" id="hot" /> Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__form-label modal__label-type-radio"
            >
              <input type="radio" className="modal__radio-input" id="warm" />{" "}
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__form-label modal__label-type-radio"
            >
              <input type="radio" className="modal__radio-input" id="cold" />{" "}
              Cold
            </label>
          </fieldset>
          <button type="submit" class="modal__button modal__button-save">
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
