import Stack from '@mui/material/Stack';
import '../style.css';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

interface TopicInputProps {
  userTopic: string;
  onChange: (text: string) => void;
}

function TopicInput({ userTopic, onChange }: TopicInputProps) {
  return (
    <Stack spacing={1}>
      <Typography variant="body1" fontWeight="bold">
        What is your thesis?
      </Typography>
      <TextField
        value={userTopic}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your thesis here."
        multiline
        minRows={3}
        fullWidth
        variant="outlined"
        sx={{
          '& .MuiInputBase-root': {
            fontSize: '0.8rem',
          },
        }}
      />
    </Stack>
  );
}

export default TopicInput;
