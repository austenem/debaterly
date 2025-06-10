import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCat,
  faBook,
  faBowlRice,
  faPenNib,
} from '@fortawesome/free-solid-svg-icons';

import { Example } from '../types';
import '../style.css';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

function Header() {
  return (
    <Stack spacing={2} alignItems="center" direction="row" paddingBottom={1}>
      <FontAwesomeIcon icon={faPenNib} size="2x" />
      <Typography variant="h4" fontWeight="bold">
        Debaterly
      </Typography>
      <Typography variant="subtitle1" fontSize=".85rem" fontStyle="italic">
        put your persuasive writing to the test!
      </Typography>
    </Stack>
  );
}

export default Header;
