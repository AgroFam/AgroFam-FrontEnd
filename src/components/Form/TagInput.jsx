import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { TextField, MenuItem } from '@material-ui/core';

const categories = [
  {
    value: 'Agriculture',
    label: 'Agriculture',
  },
  {
    value: 'Fertilizers',
    label: 'Fertilizers',
  },
  {
    value: 'Crop',
    label: 'Crop',
  },
  {
    value: 'Technology',
    label: 'Technology',
  },
];

export default function TagInput() {
//   const classes = useStyles();
  const [category, setCategory] = React.useState(null);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    // <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-select-currency"
          select
          label="Category"
          value={category}
          onChange={handleChange}
          helperText="Please Select a Category for your Article"
          variant="outlined"
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

    // </form>
  );
}
