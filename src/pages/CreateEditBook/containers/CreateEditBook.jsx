import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BookCreateEditForm from "components/BookCreateEditForm";

const getClasses = makeStyles(() => ({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%'
  },
}));

const CreateEditBook = () => {
  const classes = getClasses();
  return (
    <div className={classes.container}>
      <BookCreateEditForm />
    </div>
  )
};

export default CreateEditBook;
