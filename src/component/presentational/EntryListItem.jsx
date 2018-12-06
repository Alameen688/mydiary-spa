import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const EntryListItem = ({
  id,
  title,
  firstLetter,
  entryDate
}) => (
  <Link className="item" to={`/entry/${id}`}>
    <div>
      <h1 className="title">{title}</h1>
      <div className="meta">
        <div className="avatar" entry-letter={firstLetter}>
        </div>
        <div className="date">
          <i className="fa fa-calendar"></i> <span>{entryDate}</span>
        </div>
      </div>
    </div>
  </Link>
);

EntryListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  firstLetter: PropTypes.string.isRequired,
  entryDate: PropTypes.string.isRequired,
};
export default EntryListItem;
