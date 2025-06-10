import { Circles } from 'react-loader-spinner';
import '../style.css';
import { QualityCategory } from '../types';

interface ScoreCardProps {
  qualityCategory: QualityCategory;
  qualityScore: number;
  isLoading?: boolean;
}

enum QualityCategories {
  Excellent = 'Your writing supports your argument very well. Excellent job!',
  Good = 'Your writing supports your argument well. Good job!',
  Fair = 'Your writing supports your argument, but could be improved. Review your writing and try again.',
  Poor = 'Your writing does not support your argument well. Review your writing and try again.',
  '-' = '-'
}

function ScoreCard({ qualityCategory, qualityScore, isLoading }: ScoreCardProps) {
  const score = qualityScore || '-';

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
          {score}
        </div>
        /100
        <div className="UserHome-category">
          {QualityCategories[qualityCategory]}
        </div>
      </div>
  );
}

export default ScoreCard;
