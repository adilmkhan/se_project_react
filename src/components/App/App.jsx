import { useState } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        handleCloseClick={closeActiveModal}
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
            <input type="radio" className="modal__radio-input" id="warm" /> Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__form-label modal__label-type-radio"
          >
            <input type="radio" className="modal__radio-input" id="cold" /> Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        handleCloseClick={closeActiveModal}
      />
    </div>
  );
}

export default App;
