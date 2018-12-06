import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validate from 'validate.js';
import {
  createEntry, showCreateError, clearCreateError, clearCreateResponse
} from '../../store/action/entry';
import Aux from '../HOC/Aux.jsx';
import HeaderComponent from './Header';
import NewEntryForm from '../presentational/NewEntry.jsx';
import { createEntryConstraint } from '../../utils/constraints/entry';

export class NewEntry extends Component {
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

  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  focusHandler() {
    if (this.props.errors && this.props.errors.length) {
      this.props.clearCreateError();
    }
  }

  clickHandler(event) {
    event.preventDefault();
    const { title, content } = this.state;
    const fields = {
      title, content
    };
    const errors = validate(fields, createEntryConstraint);
    if (errors) {
      const errorsArray = Object.keys(errors).map(key => errors[key][0]);
      this.props.showCreateError(errorsArray);
    } else {
      const { history } = this.props;
      this.props.createEntry(fields)
        .then((statusCode) => {
          if (statusCode && statusCode === 201) {
            const { entryId } = this.props;
            setTimeout(() => {
              this.props.clearCreateResponse();
              history.push(`/entry/${entryId}`);
            }, 800);
          }
        });
    }
  }

  render() {
    const { title, content } = this.state;
    const { errors, message } = this.props;
    return (
      <Aux>
        <HeaderComponent />
        <NewEntryForm
          title={title}
          content={content}
          onChange={this.changeHandler}
          onFocus={this.focusHandler}
          onClick={this.clickHandler}
          errors={errors}
          message={message}
          />
      </Aux>
    );
  }
}

NewEntry.propTypes = {
  errors: PropTypes.array,
  message: PropTypes.string,
  entryId: PropTypes.number,
  history: PropTypes.object.isRequired,
  showCreateError: PropTypes.func.isRequired,
  clearCreateError: PropTypes.func.isRequired,
  createEntry: PropTypes.func.isRequired,
  clearCreateResponse: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  message: state.createEntry.message,
  errors: state.createEntry.errors,
  entryId: state.createEntry.entryId
});

const mapDispatchToProps = {
  createEntry,
  showCreateError,
  clearCreateError,
  clearCreateResponse
};

export default connect(mapStateToProps, mapDispatchToProps)(NewEntry);
