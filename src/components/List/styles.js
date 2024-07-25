import { styled, alpha  } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import { InputBase } from '@mui/material';

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginTop: '0',
  minWidth: '90px',
  marginBottom: '0',
}));

export const Container = styled('div')(({ theme }) => ({
  padding:'15px',
  maxWidth: '1200px',
}));

export const LoadingContainer = styled('div')(({ theme }) => ({
  height: '600px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const ListContainer = styled('div')(({ theme }) => ({
  height: '74vh',
  width: '100%',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f2f2f2',
  },
}));

export const MarginBottom = styled('div')(({ theme }) => ({
  marginBottom: '30px',
}));


export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: (theme.shape.borderRadius, 14),
  backgroundColor: alpha(theme.palette.common.black, 0.08),
  marginRight: theme.spacing(0),
  marginLeft: 0,

  [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(2), width: '93%', },
  
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',  
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 4.5),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '445px',
    [theme.breakpoints.up('md')]: { width: '380px' },
  },
}));
