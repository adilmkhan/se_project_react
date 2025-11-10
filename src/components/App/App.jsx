import { useEffect, useState } from "react";
import "./App.css";
import {
  defaultClothingItems,
  coordinates,
  APIkey,
} from "../../utils/constants.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import Footer from "../Footer/Footer.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

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

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
        />
        <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        isOpen={activeModal === "add-garment"}
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
      <ItemModal
        isOpen={activeModal === "preview"}
        card={selectedCard}
        handleCloseClick={closeActiveModal}
      />
    </div>
  );
}

export default App;
