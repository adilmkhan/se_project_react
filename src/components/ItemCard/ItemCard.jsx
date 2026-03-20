import "./ItemCard.css";

function ItemCard({ item, onCardClick, isLiked, onCardLike }) {
  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };
  return (
    <li className="cards__item">
      <h2 className="cards__image-description">{item.name}</h2>
      <button
        onClick={handleLike}
        type="button"
        className={`card__like-button ${isLiked ? "card__like-button-liked" : ""}`}
        aria-label="like card"
      ></button>
      <img
        onClick={() => {
          onCardClick(item);
        }}
        src={item.imageUrl}
        className="cards__image"
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
