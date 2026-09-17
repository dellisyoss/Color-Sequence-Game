import { useState, useEffect } from "react";
import ColorBar from "./components/ColorBar";
import GridBoard from "./components/GridBoard";
import "./App.css";

const PALETTE = [
  "#5e0ea8", 
  "#ff1493", 
  "#e91e63", 
  "#ffd700", 
  "#ff7f50", 
  "#2979ff", 
  "#00e5ff", 
  "#aeea00", 
  "#1aaf58"  
];

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function App() {
  const [sequence, setSequence] = useState([]);
  const [boardCards, setBoardCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const initializeGame = () => {
    
    const randomizedSeq = shuffleArray(PALETTE);

    const randomizedBoard = shuffleArray(PALETTE).map((color, index) => ({
      id: index,
      color: color,
      isFlipped: false
    }));

    setSequence(randomizedSeq);
    setBoardCards(randomizedBoard);
    setCurrentIndex(0);
    setIsProcessing(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (id) => {
    if (isProcessing) return;

    const clickedCard = boardCards.find((c) => c.id === id);
    if (!clickedCard) return;

    // reveal the clicked card
    setBoardCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
    );

    const targetColor = sequence[currentIndex];

    if (clickedCard.color === targetColor) {
      // correct -> move to next index
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      //win
      if (nextIndex === sequence.length) {
        setTimeout(() => {
          alert("Good job!");
          initializeGame();
        }, 300);
      }
    } else {
      //incorect -> reset board
      setIsProcessing(true);
      setTimeout(() => {
        setBoardCards((prev) =>
          prev.map((card) => ({ ...card, isFlipped: false }))
        );
        setCurrentIndex(0);
        setIsProcessing(false);
      }, 700);
    }
  };

  return (
    <div className="game-wrapper">
      <ColorBar sequence={sequence} />
      <GridBoard
        cards={boardCards}
        onCardClick={handleCardClick}
        disabled={isProcessing}
      />
    </div>
  );
}