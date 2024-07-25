import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '120px',
  borderRadius: '6px'
}));

export const MapContainer = styled('div')({
  height: '100vh',
  width: '100%',
});

export const MarkerContainer = styled('div')({
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  '&:hover': { zIndex: 2 },
});

export const Pointer = styled('img')({
  cursor: 'pointer',
  borderRadius: '6px'
});