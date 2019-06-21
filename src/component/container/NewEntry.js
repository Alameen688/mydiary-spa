import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {
  createEntry, showCreateError, clearCreateError, clearCreateResponse
} from '../../store/action/entry';
import HeaderComponent from './Header';
import NewEntryForm from '../presentational/NewEntry.jsx';
import { createEntryConstraint } from '../../utils/constraints/entry';
import { DispatchContext } from '../../store/reducer';

const initialState = {
  title: '',
  content: ''
};

const NewEntry = ({ history }) => {
  const { state, dispatch } = useContext(DispatchContext);
  const [fields, setFields] = useState(initialState);

  const { createEntry: { entryId: id, message, errors } } = state;
  const { title, content } = fields;

  const changeHandler = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const focusHandler = () => {
    if (errors && errors.length) {
      dispatch(clearCreateError());
    }
  };

  const clickHandler = (event) => {
    event.preventDefault();
    const formFields = {
      title, content
    };
    const fieldErrors = validate(formFields, createEntryConstraint);
    if (fieldErrors) {
      const errorsArray = Object.keys(fieldErrors).map(key => fieldErrors[key][0]);
      dispatch(showCreateError(errorsArray));
    } else {
      createEntry(formFields)(dispatch)
        .then(({ status: statusCode, entryId }) => {
          if (statusCode && statusCode === 201) {
            setTimeout(() => {
              dispatch(clearCreateResponse());
              history.push(`/entry/${entryId}`);
            }, 800);
          }
        });
    }
  };

  return (
      <>
        <HeaderComponent />
        <NewEntryForm
          title={title}
          content={content}
          onChange={changeHandler}
          onFocus={focusHandler}
          onClick={clickHandler}
          errors={errors}
          message={message}
          />
      </>
  );
};

NewEntry.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(NewEntry);
