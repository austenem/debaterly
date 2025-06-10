import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCat,
  faBook,
  faBowlRice
} from '@fortawesome/free-solid-svg-icons';

import { Example } from '../types';
import '../style.css';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

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
];

/*------------------------------------------------------------------------*/
/* ---------------------------- Example Icon ---------------------------- */
/*------------------------------------------------------------------------*/

type ExampleIconProps = Example & {
  onClick: (text: string, topic: string) => void;
}

function ExampleIcon({ text, topic, icon, onClick }: ExampleIconProps) {
  return (
    <IconButton onClick={() => onClick(text, topic)} size="small" sx={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '4px',
      transition: 'border-color 0.2s',
      '&:hover': {
        borderColor: '#888',
      },
    }}>
      <FontAwesomeIcon icon={icon} />
    </IconButton>
  );
}

/*------------------------------------------------------------------------*/
/* ------------------------------- Header ------------------------------- */
/*------------------------------------------------------------------------*/

interface HeaderProps {
  onClickExample: (text: string, topic: string) => void;
}

function Header({ onClickExample }: HeaderProps) {
  return (
    <Stack spacing={2} alignItems="center" direction="row" paddingBottom={1}>
      <Typography variant="h4" fontWeight="bold">
        Debaterly
      </Typography>
      <Typography variant="subtitle1" fontStyle="italic">
        put your persuasive writing to the test!
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        <Typography variant="body1">examples:</Typography>
        {examples.map(({ text, topic, icon }) => (
          <ExampleIcon
            key={text}
            text={text}
            topic={topic}
            icon={icon}
            onClick={onClickExample}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default Header;
