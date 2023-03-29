import React, { useState } from 'react';
import useStyles from './Styles';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsBySearch, getArticlesFromSearch } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const language = useSelector((state) => state.settings.language).toLowerCase();
  const [search, setSearch] = useState('');

  const searchPost = () => {
    if (search.trim()) {
      dispatch(getPostsBySearch({ search, lang: language }));
      dispatch(getArticlesFromSearch(search));
      navigate(`/posts/search?searchQuery=${search.replace(/ /g, '_')}`);
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

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Search;
