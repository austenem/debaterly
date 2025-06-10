import { Box, Button, Stack } from '@mui/material';

interface ScoreButtonProps {
  scoreText: () => void;
}

function Buttons({ scoreText }: ScoreButtonProps) {
  return (
    <Stack spacing={2} alignItems="center" width="100%">
      <Box width="100%" maxWidth={300}>
        <Button
          onClick={scoreText}
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              backgroundColor: 'green',
            },
          }}
        >
          Score my writing
        </Button>
      </Box>
      <Box width="100%" maxWidth={300}>
        <Button variant="outlined" fullWidth>
          See an Example
        </Button>
      </Box>
      <Box width="100%" maxWidth={300}>
        <Button variant="outlined" fullWidth>
          Dashboard
        </Button>
      </Box>
    </Stack>
  );
}

export default Buttons;
