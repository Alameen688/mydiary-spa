import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import validate from 'validate.js';

import EditEntryView from '../presentational/EditEntry.jsx';
import {
  getEntry,
  updateEntry,
  showUpdateError,
  clearUpdateError,
  clearUpdateResponse
} from '../../store/action/entry';
import HeaderComponent from './Header';
import { updateEntryConstraint } from '../../utils/constraints/entry';
import { DispatchContext } from '../../store/reducer/index';

const initialState = {
  title: '',
  content: ''
};

const EditEntry = ({ match, history }) => {
  const { state, dispatch } = useContext(DispatchContext);
  const [fields, setFields] = useState(initialState);

  const { entry: { entry: entryToEdit }, updateEntry: { message, errors } } = state;
  const { title, content } = fields;

  const setFormValue = () => {
    const { title: entryTitle, content: entryContent } = entryToEdit;
    setFields({
      title: entryTitle,
      content: entryContent,
    });
  };

  useEffect(() => {
    const { id } = match.params;
    getEntry(id)(dispatch);
    setFormValue();
  }, [match.params.id || entryToEdit]);

  const changeHandler = (event) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value
    });
  };

  const focusHandler = () => {
    if (errors && errors.length) {
      dispatch(clearUpdateError());
    }
  };

  const clickHandler = (event) => {
    event.preventDefault();
    const filterFields = {
      title, content
    };
    const fieldErrors = validate(filterFields, updateEntryConstraint);
    if (fieldErrors) {
      const errorsArray = Object.keys(fieldErrors).map(key => fieldErrors[key][0]);
      dispatch(showUpdateError(errorsArray));
    } else {
      const { id } = match.params;
      updateEntry(id, filterFields)(dispatch)
        .then(({ status: statusCode, entryId }) => {
          if (statusCode && statusCode === 200) {
            setTimeout(() => {
              dispatch(clearUpdateResponse());
              history.push(`/entry/${entryId}`);
            }, 800);
          }
        });
    }
  };

  return (
      <>
        <HeaderComponent />
        { Object.keys(entryToEdit).length ? <EditEntryView
          title={title}
          content={content}
          onChange={changeHandler}
          onFocus={focusHandler}
          loading={false}
          onClick={clickHandler}
          errors={errors}
          message={message}
        /> : null }
      </>
  );
};

EditEntry.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(EditEntry);
