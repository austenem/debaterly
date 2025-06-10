import '../style.css';

interface TopicInputProps {
  userTopic: string;
  onChange: (text: string) => void;
}

function TopicInput({ userTopic, onChange }: TopicInputProps) {
  return (
    <div className="UserHome-argument">
      What is your central argument?
      <textarea
        value={userTopic}
        className="UserHome-argument-input"
        placeholder="Enter your argument here."
        onChange={e => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
}

export default TopicInput;
