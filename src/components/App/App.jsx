import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import Footer from "../Footer/Footer.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import {
  getCards,
  addNewCard,
  deleteCard,
  getCurrentUser,
} from "../../utils/api.js";
import * as auth from "../../utils/auth.js";
import { setToken, getToken } from "../../utils/token.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "Adil Khan",
    avatar:
      "https://plus.unsplash.com/premium_photo-1665664652328-8eb4718c0f83?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const baseUrl = "http://localhost:3001";

  const onAddItem = (inputValues) => {
    const jwt = getToken();
    addNewCard(
      {
        name: inputValues.name,
        imageUrl: inputValues.imageLink,
        weather: inputValues.weatherType,
      },
      baseUrl,
      jwt,
    )
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onRemoveItem = (inputItems) => {
    const jwt = getToken();
    deleteCard({ baseUrl, jwt, id: inputItems._id })
      .then(() => {
        //TODO
        setClothingItems(
          clothingItems.filter((item) => item._id !== inputItems._id),
        );
        closeActiveModal();
        setSelectedCard({});
      })
      .catch(console.error);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleRegisterClick = () => {
    setActiveModal("signup");
  };

  const handleLoginClick = () => {
    setActiveModal("signin");
  };

  const handleRegister = (inputValues) => {
    auth
      .register(
        {
          name: inputValues.name,
          avatar: inputValues.avatarLink,
          email: inputValues.email,
          password: inputValues.password,
        },
        baseUrl,
      )
      .then((authData) => {
        auth
          .authorize(
            {
              email: authData.email,
              password: authData.password,
            },
            baseUrl,
          )
          .then((data) => {
            if (data.token) {
              setToken(data.token);
              setIsLoggedIn(true);
              closeActiveModal();
              // Fetch current user data using the token
              getCurrentUser(baseUrl, data.token)
                .then(({ _id, name, avatar }) => {
                  setCurrentUser({ _id, name, avatar });
                  navigate("/profile");
                })
                .catch(console.error);
            }
          })
          .catch(console.error);
      })
      .catch(console.error);
  };

  const handleLogin = (loginValues) => {
    if (!loginValues.email || !loginValues.password) {
      return;
    }

    auth
      .authorize(
        {
          email: loginValues.email,
          password: loginValues.password,
        },
        baseUrl,
      )
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setIsLoggedIn(true);
          closeActiveModal();
          // Fetch current user data using the token
          getCurrentUser(baseUrl, data.token)
            .then(({ _id, name, avatar }) => {
              setCurrentUser({ _id, name, avatar });
              const redirectPath = location.state?.from?.pathname || "/profile";
              navigate(redirectPath);
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
    getCards(baseUrl)
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    getCurrentUser(baseUrl, jwt)
      .then(({ _id, name, avatar }) => {
        setIsLoggedIn(true);
        setCurrentUser({ _id, name, avatar });
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange,
        weatherData,
        clothingItems,
        handleCardClick,
        handleAddClick,
        isLoggedIn,
        currentUser,
      }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            handleRegisterClick={handleRegisterClick}
            handleLoginClick={handleLoginClick}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          handleCloseClick={closeActiveModal}
          onAddItem={onAddItem}
        />
        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          handleCloseClick={closeActiveModal}
          onRemoveItem={onRemoveItem}
        />
        <RegisterModal
          isOpen={activeModal === "signup"}
          handleCloseClick={closeActiveModal}
          onSignup={handleRegister}
        />
        <LoginModal
          isOpen={activeModal === "signin"}
          handleCloseClick={closeActiveModal}
          onSignin={handleLogin}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
