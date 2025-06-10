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
      <Typography variant="body1">
        What is your central argument?
      </Typography>
      <TextField
        value={userTopic}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your argument here."
        multiline
        minRows={3}
        fullWidth
        variant="outlined"
      />
    </Stack>
  );
}

export default TopicInput;
