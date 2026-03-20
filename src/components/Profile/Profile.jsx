import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

export default function Profile({ onCardLike }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection onCardLike={onCardLike} />
    </section>
  );
}
