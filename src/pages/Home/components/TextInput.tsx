import { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { HighlightedSentence } from '../types';
import { getHighlightedText } from '../helpers';
import { Box } from '@mui/material';

interface TextInputProps {
  userText: string;
  highlightedSentences: HighlightedSentence[];
  onChange: (text: string) => void;
  setIsFeedbackMode: (isFeedbackMode: boolean) => void;
  isFeedbackMode?: boolean;
}

const MODULES = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean'],
    [{ 'background': ['rgb(213, 252, 212)', 'rgb(252, 213, 213)', 'rgb(240, 240, 240)'] }],
  ],
};

const FORMATS = [
  'header',
  'bold', 'italic', 'underline',
  'list', 'bullet', 'background',
];

function TextInput({
  userText,
  highlightedSentences,
  onChange,
  setIsFeedbackMode,
  isFeedbackMode,
}: TextInputProps) {
  const displayedText = useMemo(() => {
    return isFeedbackMode ? getHighlightedText(userText, highlightedSentences) : userText;
  }, [userText, highlightedSentences, isFeedbackMode]);

  return (
  <Box height="100%" width="100%">
    <ReactQuill
      style={{ height: '100%' }}
      theme="snow"
      modules={MODULES}
      formats={FORMATS}
      value={displayedText}
      onChange={(content: string) => {
        // Trigger this only on actual user input
        if (isFeedbackMode) {
          setIsFeedbackMode(false);
        }
        onChange(content);
      }}
      placeholder='Enter your essay here.'
    />
  </Box>
  );
}

export default TextInput;
