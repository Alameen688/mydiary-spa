import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import EntryView from '../presentational/EntryView.jsx';
import { getEntry } from '../../store/action/entry';
import HeaderComponent from './Header';
import { formatDate } from '../../utils';
import { DispatchContext } from '../../store/reducer/index';

const Entry = ({ match }) => {
  const { state, dispatch } = useContext(DispatchContext);

  const { entry: { entry, errors } } = state;

  useEffect(() => {
    const { id } = match.params;
    getEntry(id)(dispatch);
  }, [match.params.id]);

  const {
    id,
    title,
    content,
    updated_at: date
  } = entry;
  const entryDate = date ? formatDate(date) : undefined;
  return (
      <>
        <HeaderComponent/>
        { Object.keys(entry).length ? <EntryView
          id={id}
          title={title}
          content={content}
          date={entryDate}
        /> : null }
      </>
  );
};

Entry.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(Entry);
