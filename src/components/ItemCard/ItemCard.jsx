import "./ItemCard.css";

function ItemCard({ item }) {
  return (
    <>
      <h2 className="cards__image-description">{item.name}</h2>
      <img src={item.link} className="cards__image" alt="cards_image" />
    </>
  );
}

export default ItemCard;
