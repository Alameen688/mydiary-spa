import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EntryListItem from '../presentational/EntryListItem.jsx';
import { getEntries } from '../../store/action/entry';
import Aux from '../HOC/Aux.jsx';
import { formatDate } from '../../utils';
import HeaderComponent from './Header';
import addIcon from '../../asset/images/plus.png';

export class EntryList extends Component {
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    this.props.getEntries();
  }

  render() {
    const { entries } = this.props;
    return (
      <Aux>
        <HeaderComponent />
        <main>
          <div id="grid-box">
            <div className="entry-grid">
              { entries.map((entry) => {
                const { id, title, updated_at: date } = entry;
                const firstLetter = title.slice(0, 1);
                const entryDate = formatDate(date);
                const entryProps = {
                  id,
                  title,
                  entryDate,
                  firstLetter
                };
                return <EntryListItem key={id} { ...entryProps }/>;
              })}
            </div>
          </div>

          <div id="floating-button">
            <Link to='/entry/new'>
              <img className="fab-icon" src={addIcon} />
            </Link>
          </div>
        </main>
      </Aux>
    );
  }
}

EntryList.propTypes = {
  entries: PropTypes.array.isRequired,
  errors: PropTypes.array,
  getEntries: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  entries: state.entries.entries,
  errors: state.entries.errors
});

const mapDispatchToProps = {
  getEntries
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryList);
