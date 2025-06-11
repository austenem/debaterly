import { useState } from 'react';
import Header from '../../components/Header';
import ScoreCard from './components/ScoreCard';
import TextInput from './components/TextInput';
import TopicInput from './components/TopicInput';
import { useScoreText } from './hooks';
import {
  Stack,
  Box,
  IconButton,
  Collapse,
  Divider,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import Buttons from './components/Buttons';
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
    setQualityScore,
    scoreText,
    isLoading,
    isFeedbackMode,
    setIsFeedbackMode,
  } = useScoreText();

  const [isPanelOpen, setIsPanelOpen] = useState(true);

  return (
    <Stack height="90%" padding={2}>
      <Header />
      <Stack direction="row" spacing={2} sx={{ flex: 1 }}>
        {/* Left editor area */}
        <Box sx={{ flex: 1 }}>
          <TextInput
            userText={userText}
            highlightedSentences={highlightedSentences}
            onChange={(text: string) => setUserText(text)}
            isFeedbackMode={isFeedbackMode}
            setIsFeedbackMode={setIsFeedbackMode}
          />
        </Box>

        {/* Toggle button */}
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Divider orientation="vertical" flexItem />
          <IconButton
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            size="small"
          >
            {isPanelOpen ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Box>

        {/* Right panel */}
        <Collapse in={isPanelOpen} orientation="horizontal" sx={{ minWidth: isPanelOpen ? 280 : 0 }}>
          <Stack spacing={4} sx={{ pl: 1 }}>
            <TopicInput
              userTopic={userTopic}
              onChange={(topic: string) => setUserTopic(topic)}
            />
            <ScoreCard
              qualityCategory={qualityCategory}
              qualityScore={qualityScore}
              isLoading={isLoading}
            />
            <Buttons scoreText={scoreText} onClickExample={(text: string, topic: string) => {
              setUserText(text);
              setUserTopic(topic);
              setQualityScore(0);
            }} />
          </Stack>
        </Collapse>
      </Stack>
    </Stack>
  );
}

export default Home;
