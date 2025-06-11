import { Box } from "@mui/material";
import Card from "./Card";

interface AverageScoreProps {
  averageScore: number;
}

function AverageScore({ averageScore }: AverageScoreProps) {
  const roundedScore = Math.round(averageScore);

  return (
    <Card title="Average Score">      
      <Box
        sx={{
          border: '6px solid #4caf50',
          borderRadius: '50%',
          width: '160px',
          height: '160px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '5rem',
          fontWeight: 'bold',
          margin: '0 auto', // center in parent
        }}
      >
        {roundedScore}
      </Box>
    </Card>
  );
}

export default AverageScore;

