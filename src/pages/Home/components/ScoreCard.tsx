import { Circles } from 'react-loader-spinner';
import '../style.css';

interface ScoreCardProps {
  qualityCategory: string;
  qualityScore: number;
  isLoading?: boolean;
}

function ScoreCard({ qualityCategory, qualityScore, isLoading }: ScoreCardProps) {
  if (isLoading) {
    return (
      <div className="UserHome-score-card">
        <div className="UserHome-loader">
          <Circles
            color="#000000"
            height={50}
            width={50}
          />
        </div>
      </div>
    );
  }

  return (
      <div className="UserHome-score-card">
        <div className="UserHome-score-title">
          Overall:
        </div>
        <div className={`UserHome-score UserHome-border-${qualityCategory}`}>
          {qualityScore}
        </div>
        /100
        <div className="UserHome-category">
          {qualityCategory}
        </div>
      </div>
  );
}

export default ScoreCard;
