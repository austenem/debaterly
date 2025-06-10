import '../style.css';

interface ScoreButtonProps {
  scoreText: () => void;
}

function ScoreButton({ scoreText }: ScoreButtonProps) {
  return (
    <div className="UserHome-button-container">
      <button
        onClick={scoreText}
        className="UserHome-button"
      >
        Score my writing
      </button>
    </div>
  );
}

export default ScoreButton;
