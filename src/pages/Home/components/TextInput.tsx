import { HighlightWithinTextarea } from 'react-highlight-within-textarea';
import { HighlightedSentence } from '../types';
import '../style.css';

interface TextInputProps {
  userText: string;
  highlightedSentences: HighlightedSentence[];
  onChange: (text: string) => void;
}

function TextInput({ userText, highlightedSentences, onChange }: TextInputProps) {
  return (
    <div className="UserHome-left-side">
      <div className="UserHome-text-area">
        <HighlightWithinTextarea
          value={userText}
          highlight={highlightedSentences}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default TextInput;
