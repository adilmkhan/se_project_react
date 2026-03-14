import "./SideBar.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "../Header/Header.css";
import { useContext } from "react";

export default function SideBar() {
  const { currentUser } = useContext(CurrentTemperatureUnitContext);

  const firstInitial = currentUser.name.split("")[0];

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
        <button type="button" className="sidebar__button sidebar__button-edit">
          Change profile data
        </button>
        <button
          type="button"
          className="sidebar__button sidebar__button-logout"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
