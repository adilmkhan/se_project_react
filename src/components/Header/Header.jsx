import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Header({
  handleAddClick,
  weatherData,
  handleRegisterClick,
  handleLoginClick,
}) {
  const { isLoggedIn, currentUser } = useContext(CurrentTemperatureUnitContext);

  const firstInitial = currentUser?.name?.split("")[0] || "";

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </NavLink>
      <p className="header__data-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn ? (
        //Authorized
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
          <div className="header__user-container">
            <NavLink to="/profile" className="header__username">
              {currentUser.name}
            </NavLink>
            <NavLink to="/profile">
              {currentUser.avatar ? (
                <>
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header__avatar"
                  />
                </>
              ) : (
                <button type="button" className="header__avatar-fallback">
                  {firstInitial}
                </button>
              )}
            </NavLink>
          </div>
        </>
      ) : (
        // Non-authorized user view
        <div className="header__auth-container">
          <button
            onClick={handleRegisterClick}
            type="button"
            className="header__register-btn"
          >
            Sign Up
          </button>
          <button
            onClick={handleLoginClick}
            type="button"
            className="header__login-btn"
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
