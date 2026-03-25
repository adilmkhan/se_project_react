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

import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import {
  getCards,
  addNewCard,
  deleteCard,
  getCurrentUser,
  editProfile,
  addCardLike,
  removeCardLike,
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "",
    avatar: "",
  });
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://api.wttowear.blinklab.com"
      : "http://localhost:3001";

  // const baseUrl = "http://localhost:3001";

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
      .then((res) => {
        setClothingItems((prev) => [res.data, ...prev]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onRemoveItem = (inputItems) => {
    const jwt = getToken();
    deleteCard({ baseUrl, jwt, id: inputItems._id })
      .then(() => {
        closeActiveModal();
        setClothingItems(
          clothingItems.filter((item) => item._id !== inputItems._id),
        );
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

  const handleEditProfileClick = () => {
    setActiveModal("edit");
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
      .then(() => {
        auth
          .authorize(
            {
              email: inputValues.email,
              password: inputValues.password,
            },
            baseUrl,
          )
          .then((data) => {
            if (data.token) {
              setToken(data.token);
              setIsLoggedIn(true);
              closeActiveModal();
              getCurrentUser(baseUrl, data.token)
                .then((response) => {
                  const { _id, name, avatar } = response.data;
                  setCurrentUser({ _id, name, avatar });
                  navigate("/");
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
          getCurrentUser(baseUrl, data.token)
            .then((response) => {
              const { _id, name, avatar } = response.data;
              setCurrentUser({ _id, name, avatar });
              const redirectPath = location.state?.from?.pathname || "/";
              navigate(redirectPath);
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  };

  const handleEditProfile = (editValues) => {
    const jwt = getToken();

    editProfile(
      {
        name: editValues.name,
        avatar: editValues.avatarLink,
      },
      baseUrl,
      jwt,
    )
      .then((data) => {
        const { _id, name, avatar } = data;
        setCurrentUser({ _id, name, avatar });
        closeActiveModal();
        navigate("/profile");
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const jwt = getToken();
    !isLiked
      ? addCardLike(baseUrl, id, jwt)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item)),
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(baseUrl, id, jwt)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item)),
            );
          })
          .catch((err) => console.log(err));
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
        setClothingItems(items.data);
      })
      .catch(console.error);
    const jwt = getToken();
    if (!jwt) {
      return setIsAuthChecking(false);
    }
    getCurrentUser(baseUrl, jwt)
      .then((response) => {
        setIsAuthChecking(false);
        const { _id, name, avatar } = response.data;
        setIsLoggedIn(true);
        setCurrentUser({ _id, name, avatar });
      })
      .catch((err) => {
        setIsAuthChecking(false);
        console.error(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, isLoggedIn, setIsLoggedIn }}
    >
      <CurrentTemperatureUnitContext.Provider
        value={{
          currentTemperatureUnit,
          handleToggleSwitchChange,
          weatherData,
          clothingItems,
          handleCardClick,
          handleAddClick,
          handleEditProfileClick,
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
            {isAuthChecking ? (
              <div>Loading...</div>
            ) : (
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile onCardLike={handleCardLike} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="*"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/profile" replace />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              </Routes>
            )}

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
          <EditProfileModal
            isOpen={activeModal === "edit"}
            handleCloseClick={closeActiveModal}
            onEdit={handleEditProfile}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
