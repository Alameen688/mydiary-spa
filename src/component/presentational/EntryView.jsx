import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import editIcon from '../../asset/images/edit-icon.png';

const EntryView = ({
  id,
  title,
  content,
  date
}) => (
  <main>
    <div id="entry-content-box">
      <div id="entry-top">
        <div>
          <h1 id="entry-title">{title}</h1>
        </div>
        <div id="date"><h3>{date}</h3></div>
      </div>
      <div id="entry-content">{content}</div>
    </div>

    <div id="floating-button">
      <Link to={`/entry/edit/${id}`}>
        <img className="fab-icon" src={editIcon} />
      </Link>
    </div>
  </main>
);

EntryView.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default EntryView;
