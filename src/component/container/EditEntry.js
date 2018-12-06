import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validate from 'validate.js';

import EditEntryView from '../presentational/EditEntry.jsx';
import {
  getEntry,
  updateEntry,
  showUpdateError,
  clearUpdateError,
  clearUpdateResponse
} from '../../store/action/entry';
import Aux from '../HOC/Aux.jsx';
import HeaderComponent from './Header';
import { updateEntryConstraint } from '../../utils/constraints/entry';

export class EditEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.focusHandler = this.focusHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.props.getEntry(id);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { entryToEdit } = nextProps;
    if (entryToEdit && this.props.entryToEdit !== entryToEdit) {
      const { title, content } = entryToEdit;
      this.setState({
        title,
        content
      });
    }
  }

  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  focusHandler() {
    if (this.props.errors && this.props.errors.length) {
      this.props.clearUpdateError();
    }
  }

  clickHandler(event) {
    event.preventDefault();
    const { title, content } = this.state;
    const fields = {
      title, content
    };
    const errors = validate(fields, updateEntryConstraint);
    if (errors) {
      const errorsArray = Object.keys(errors).map(key => errors[key][0]);
      this.props.showUpdateError(errorsArray);
    } else {
      const { match, history } = this.props;
      const { id } = match.params;
      this.props.updateEntry(id, fields)
        .then((statusCode) => {
          if (statusCode && statusCode === 200) {
            const { entryId } = this.props;
            setTimeout(() => {
              this.props.clearUpdateResponse();
              history.push(`/entry/${entryId}`);
            }, 800);
          }
        });
    }
  }

  render() {
    const { entryToEdit, errors, message } = this.props;
    const { title, content } = this.state;
    return (
      <Aux>
        <HeaderComponent />
        { Object.keys(entryToEdit).length ? <EditEntryView
          title={title}
          content={content}
          onChange={this.changeHandler}
          onFocus={this.focusHandler}
          loading={false}
          onClick={this.clickHandler}
          errors={errors}
          message={message}
        /> : null }
      </Aux>
    );
  }
}

EditEntry.propTypes = {
  errors: PropTypes.array,
  message: PropTypes.string,
  entryId: PropTypes.number,
  match: PropTypes.object.isRequired,
  entryToEdit: PropTypes.object.isRequired,
  getEntry: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  showUpdateError: PropTypes.func.isRequired,
  clearUpdateError: PropTypes.func.isRequired,
  updateEntry: PropTypes.func.isRequired,
  clearUpdateResponse: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  entryToEdit: state.entry.entry,
  message: state.updateEntry.message,
  errors: state.updateEntry.errors,
  entryId: state.updateEntry.entryId
});

const mapDispatchToProps = {
  getEntry,
  updateEntry,
  showUpdateError,
  clearUpdateError,
  clearUpdateResponse
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEntry);
