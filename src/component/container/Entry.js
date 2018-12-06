import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EntryView from '../presentational/EntryView.jsx';
import { getEntry } from '../../store/action/entry';
import Aux from '../HOC/Aux.jsx';
import HeaderComponent from './Header';
import { formatDate } from '../../utils';

export class Entry extends Component {
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.props.getEntry(id);
  }

  render() {
    const { entry } = this.props;
    const {
      id,
      title,
      content,
      updated_at: date
    } = entry;
    const entryDate = date ? formatDate(date) : undefined;
    return (
      <Aux>
        <HeaderComponent/>
        { Object.keys(entry).length ? <EntryView
          id={id}
          title={title}
          content={content}
          date={entryDate}
        /> : null }
      </Aux>
    );
  }
}

Entry.propTypes = {
  match: PropTypes.object.isRequired,
  entry: PropTypes.object.isRequired,
  getEntry: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  entry: state.entry.entry,
  errors: state.entry.errors
});

const mapDispatchToProps = {
  getEntry
};

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
