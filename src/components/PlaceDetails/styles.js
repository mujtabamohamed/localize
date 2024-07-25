import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

export const StyledChip = styled(Chip)({
  margin: '5px 5px 5px 0px',
  backgroundColor: '#f1f1f1'
});

export const SubtitleBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '10px',
});

export const SpacingBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
