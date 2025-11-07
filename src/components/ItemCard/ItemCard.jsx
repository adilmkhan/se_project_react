import "./ItemCard.css";

function ItemCard({ item }) {
  return (
    <li className="cards__item">
      <h2 className="cards__image-description">{item.name}</h2>
      <img src={item.link} className="cards__image" alt="cards_image" />
    </li>
  );
}

export default ItemCard;
