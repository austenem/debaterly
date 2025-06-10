import { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { HighlightedSentence } from '../types';
import { getHighlightedText } from '../helpers';

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
    <div className="UserHome-left-side">
      <div className="UserHome-text-area">
        <ReactQuill
          className="UserHome-quill"
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
        />
      </div>
    </div>
  );
}

export default TextInput;
