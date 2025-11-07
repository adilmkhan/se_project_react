import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <li className="cards__item">
      <h2 className="cards__image-description">{item.name}</h2>
      <img
        onClick={() => {
          onCardClick(item);
        }}
        src={item.link}
        className="cards__image"
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
