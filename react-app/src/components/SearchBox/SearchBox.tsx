
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { useCallback, useState } from 'react';
import { colors } from '../../assets/styles/styles';
import { KEYCODE } from '../../shared/constants/keyCode.constant';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: colors.$white,
  color: colors.$grey110,
  '&:hover': {
    backgroundColor: colors.$white,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

// const SearchIconWrapper = styled('div')(() => ({
//   padding: '0px 5px',
//   height: '100%',
//   position: 'absolute',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: colors.$grey110,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: '2px',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    transform: 'translateY(1px)'
  },
}));

type Props = {
  placeholder?: string,
  onSearch?: (data?: any) => void,
};

const defaultPlaceholder = 'Search...';

const searchIconStyle: React.CSSProperties = {
  marginLeft: '3px'
};

export const SearchBox = (props: Props) => {
  const {placeholder, onSearch: onSearchProp } = props;
  const [text, setText] = useState<string>('');

  const onSearch = useCallback(() => {
    if (onSearchProp) {
      onSearchProp(text);
    }
  }, [onSearchProp, text]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === KEYCODE.Enter) {
      onSearch();
    }
  }, [onSearchProp, text]);

  return (
    <>
      <Search>
        <IconButton aria-label="search" style={searchIconStyle} onClick={onSearch}>
          <SearchIcon/>
        </IconButton>
        <StyledInputBase
          placeholder={placeholder??defaultPlaceholder}
          inputProps={{ 'aria-label': 'search' }}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </Search>
    </>
  )
}