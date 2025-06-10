import { faBirthdayCake, faBook, faBowlRice, faCat, faHourglassHalf, faShuffle, faPieChart } from '@fortawesome/free-solid-svg-icons';
import { Box, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Example } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/

// Example writing samples to display in the header
const examples: Example[] = [
  {
    text: "Cereal can be considered a soup because it meets the basic criteria of a liquid-based food with solid ingredients. This combination mirrors the structure of many soups, which consist of a broth or liquid base with various solid additions like vegetables, meats, or grains. The preparation and consumption method of pouring liquid over solids further supports the classification of cereal as a type of cold soup. \n\nOn the other hand, I'm not quite sure. Does cereal really count as a soup? More research needs to be done.",
    topic: "Cereal is a type of soup.",
    icon: faBowlRice,
  },
  {
    text: "Bram Stoker’s 1897 novel Dracula is celebrated for its unique narrative structure, which unfolds through the private reflections and thoughts of its characters. This collage of narratives adds dimension to each of the characters, and gives the reader the opportunity to observe them from multiple perspectives. \n\nAt the heart of this web of narration is Mina Murray, who is both the heroine and the fictional “author” of the novel itself. Her intelligence and resourcefulness contribute significantly to the progression of the novel’s plot, and her relationship with Jonathan adds crucial emotional depth to the story. These contributions are lost in the 1931 film adaptation of Dracula which, much like its titular villain, sucks the life out of Mina.",
    topic: "The 1931 film adaptation of Dracula is unsuccessful in its portrayal of Mina Murray.",
    icon: faBook,
  },
  {
    text: "Cats having the capacity to vote would vastly improve the political landscape. They are intelligent creatures that can make informed decisions. Also, my cat is very smart.",
    topic: "Cats should be able to vote.",
    icon: faCat,
  },
  {
    text: "Cake and pie have long battled for the title of superior dessert. While pie offers a flaky crust and fruit-forward flavor, cake excels with its soft texture and decorative versatility. Cakes are a staple at celebrations across cultures, often layered, frosted, and customized for any occasion. \n\nDespite this, some argue that pie holds more authenticity due to its rustic roots. But in the end, cake’s adaptability and visual appeal give it the upper hand in the dessert showdown.",
    topic: "Cake is a better dessert than pie.",
    icon: faBirthdayCake,
  },
  {
    text: "If time travel were possible, it would pose serious ethical risks. The ability to alter past events could lead to unforeseen consequences—erasing people from existence, changing historical outcomes, or destabilizing entire societies. \n\nEven with good intentions, small changes could ripple forward in dangerous ways. Therefore, even if time travel becomes technologically viable, it should remain off-limits to human use.",
    topic: "Time travel should never be allowed, even if it becomes possible.",
    icon: faHourglassHalf,
  },  
];

interface ScoreButtonProps {
  scoreText: () => void;
  onClickExample: (text: string, topic: string) => void;
}

function Buttons({ scoreText, onClickExample }: ScoreButtonProps) {
  const navigate = useNavigate();

  const handleRandomExample = () => {
    const randomIndex = Math.floor(Math.random() * examples.length);
    const example = examples[randomIndex];
    onClickExample(example.text, example.topic);
    
    // Wait for state to update before scoring
    setTimeout(() => {
      scoreText();
    }, 0);
  };

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
        <Button onClick={handleRandomExample} variant="outlined" endIcon={<FontAwesomeIcon icon={faShuffle} />} fullWidth>
          See an Example
        </Button>
      </Box>
      <Box width="100%" maxWidth={300}>
        <Button onClick={() => navigate('/dashboard')} variant="outlined" endIcon={<FontAwesomeIcon icon={faPieChart} />} fullWidth>
          Dashboard
        </Button>
      </Box>
    </Stack>
  );
}

export default Buttons;
