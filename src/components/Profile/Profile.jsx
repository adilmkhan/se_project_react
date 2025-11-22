import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

export default function Profile() {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection />
    </section>
  );
}
