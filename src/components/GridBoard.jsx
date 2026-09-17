import ColorCard from "./ColorCard";

export default function GridBoard({ cards, onCardClick, disabled }) {
  return (
    <div className="grid-container">
      {cards.map((card) => (
        <ColorCard
          key={card.id}
          id={card.id}
          color={card.color}
          isFlipped={card.isFlipped}
          onCardClick={onCardClick}
          disabled={disabled}
        />
      ))}
    </div>
  );
}