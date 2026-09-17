export default function ColorCard({ id, color, isFlipped, onCardClick, disabled }) {
  const displayColor = isFlipped ? color : "#3d8f8d";

  return (
    <div
      className="game-card"
      style={{ backgroundColor: displayColor }}
      onClick={() => !disabled && !isFlipped && onCardClick(id)}
    />
  );
}