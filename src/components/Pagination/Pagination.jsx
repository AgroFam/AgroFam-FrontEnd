import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/actions/posts';

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const language = useSelector((state) => state.settings.language).toLowerCase();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      window.scroll(0, 0);
      dispatch(getPosts(page, language));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, language]);

  return (
    <Pagination
      // classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;
