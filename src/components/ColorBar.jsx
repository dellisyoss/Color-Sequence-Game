export default function ColorBar({ sequence }) {
  return (
    <div className="sequence-bar">
      {sequence.map((color, index) => (
        <div
          key={index}
          className="sequence-block"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}