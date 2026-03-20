import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "../Header/Header.css";
import { useContext } from "react";
import { removeToken } from "../../utils/token";

export default function SideBar() {
  const { currentUser, handleEditProfileClick, setIsLoggedIn } = useContext(
    CurrentTemperatureUnitContext,
  );

  const navigate = useNavigate();

  function logOut() {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
  }

  const firstInitial = currentUser?.name?.split("")[0] || "";

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
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
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          onClick={handleEditProfileClick}
          type="button"
          className="sidebar__button sidebar__button-edit"
        >
          Change profile data
        </button>
        <button
          onClick={logOut}
          type="button"
          className="sidebar__button sidebar__button-logout"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
