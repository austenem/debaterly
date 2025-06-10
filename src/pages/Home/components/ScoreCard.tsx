import { Box, Stack, Typography } from '@mui/material';
import { Circles } from 'react-loader-spinner';
import { QualityCategory } from '../types';

interface ScoreCardProps {
  qualityCategory: QualityCategory;
  qualityScore: number;
  isLoading?: boolean;
}

enum QualityCategories {
  Excellent = 'Your writing supports your thesis very well. Excellent job!',
  Good = 'Your writing supports your thesis well. Good job!',
  Fair = 'Your writing supports your thesis, but could be improved. Review your writing and try again.',
  Poor = 'Your writing does not support your thesis well. Review your writing and try again.',
  '-' = '-',
}

const borderColorMap: Record<QualityCategory, string> = {
  Excellent: 'rgb(77, 182, 172)',
  Good: '#4caf50',
  Fair: '#ffb300',
  Poor: '#ef5350',
  '-': 'grey',
};

// Shared style between loading and final states
const sharedCardStyle = {
  width: 280,
  border: '1px solid #ddd',
  borderRadius: 2,
  padding: 2,
  minHeight: 180,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function ScoreCard({ qualityCategory, qualityScore, isLoading }: ScoreCardProps) {
  const score = qualityScore || '-';

  if (isLoading) {
    return (
      <Box sx={sharedCardStyle}>
        <Circles color="#000000" height={50} width={50} />
      </Box>
    );
  }

  return (
    <Stack
      spacing={1.5}
      sx={{
        ...sharedCardStyle,
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0, 1, 1, 0.4)',
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold">
        Overall:
      </Typography>

      <Box
        sx={{
          border: `3px solid ${borderColorMap[qualityCategory]}`,
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          fontWeight: 'bold',
        }}
      >
        {score}
      </Box>

      <Typography variant="body2">/100</Typography>

      <Typography variant="body2" textAlign="center">
        {QualityCategories[qualityCategory]}
      </Typography>
    </Stack>
  );
}

export default ScoreCard;
