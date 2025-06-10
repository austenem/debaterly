/**
 * Home for users to evaluate the quality of their writing.
 * @author Austen Money
 */

import Header from './components/Header';
import ScoreCard from './components/ScoreCard';
import TextInput from './components/TextInput';
import TopicInput from './components/TopicInput';
import ScoreButton from './components/ScoreButton';
import { useScoreText } from './hooks';

import './style.css';

function Home() {
  const {
    userText,
    setUserText,
    userTopic,
    setUserTopic,
    highlightedSentences,
    qualityScore,
    qualityCategory,
    scoreText,
    isLoading,
  } = useScoreText();

  return (
    <div className="UserHome-outer-container">
      <Header onClickExample={(text: string, topic: string) => {
        setUserText(text);
        setUserTopic(topic);
      }} />
      <div className="UserHome-inner-container">
        <TextInput userText={userText} highlightedSentences={highlightedSentences} onChange={(text: string) => setUserText(text)} />
        <div className="UserHome-right-side">
          <TopicInput userTopic={userTopic} onChange={(topic: string) => (setUserTopic(topic))} />
          <ScoreCard qualityCategory={qualityCategory} qualityScore={qualityScore} isLoading={isLoading} />
          <ScoreButton scoreText={scoreText} />
        </div>
      </div>
    </div>
  );
};

export default Home;
