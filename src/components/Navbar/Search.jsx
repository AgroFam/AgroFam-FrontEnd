import React, { useState } from 'react';
import useStyles from './Styles';
import SearchIcon from '@material-ui/icons/Search';
import { ClearRounded } from '@material-ui/icons';
import { IconButton, InputBase } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsBySearch, getWebResults } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getQueryParams } from '../../utils/utils';

const Search = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const language = useSelector((state) => state.settings.language).toLowerCase();
  const [search, setSearch] = useState('');
  const searchQuery = getQueryParams('searchQuery')

  const searchPost = () => {
    if (search.trim()) {
      dispatch(getPostsBySearch({ search, lang: language }));
      dispatch(getWebResults(search));
      navigate(`/posts/search?searchQuery=${search}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchPost();
    }
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClear = () => {
    setSearch('')
  }

  useEffect(() => {
    !searchQuery && setSearch('')
    searchQuery && setSearch(searchQuery)
  }, [searchQuery])
  

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        role="search"
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        value={search}
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {search && (
        <div className={classes.clearIcon}>
          <IconButton onClick={handleClear}>
            <ClearRounded />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default Search;
