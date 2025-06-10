import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRotateBackward,
  faBackward,
  faBackwardStep,
  faHome,
  faPenNib,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';

import '../style.css';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  showBackButton?: boolean;
}
function Header({ showBackButton }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <Stack spacing={2} alignItems="center" justifyContent="space-between" direction="row" paddingBottom={1}>
      <Stack spacing={2} alignItems="center" direction="row">
        <FontAwesomeIcon icon={faPenNib} size="2x" />
        <Typography variant="h4" fontWeight="bold">
          Debaterly
        </Typography>
        <Typography variant="subtitle1" fontSize=".85rem" fontStyle="italic">
          put your persuasive writing to the test!
        </Typography>
      </Stack>
      {showBackButton && (
        <Box>
          <Button
            onClick={() => navigate('/debaterly')}
            variant="contained"
            endIcon={<FontAwesomeIcon icon={faArrowRotateBackward} />}
            sx={{
              backgroundColor: 'black',
              color: 'white',
              '&:hover': {
                backgroundColor: 'green',
              },
            }}
          >
            Back to writing
          </Button>
        </Box>
      )}
    </Stack>
  );
}

export default Header;
