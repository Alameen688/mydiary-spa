import React from 'react';
import PropTypes from 'prop-types';

const NewEntry = ({
  title, content, onChange, onFocus, onClick, errors, message
}) => (
  <main>
    <div id="write-box">
      <h1 id="write-title">New Entry</h1>
      { message && message.length ? <div className="message-box">{message}</div> : null}
      {errors && errors.length ? <div id="error-box"><ul id="error-msg">{errors.map((error, index) => (<li key={index}>{error}</li>))}</ul></div> : null}
      <form>
        <input type="text" className="w-input" id="write-subject" placeholder="Subject" name="title" value={title} onChange={onChange} onFocus={onFocus} required />
          <textarea id="write-content" className="w-input" rows="10"
            placeholder="What happened...." name="content" value={content} onChange={onChange} onFocus={onFocus} required></textarea>
          <input type="submit" value="Create" id="new-entry-btn" className="form__btn btn-entry" onClick={onClick} />
      </form>
    </div>
  </main>
);

NewEntry.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  errors: PropTypes.array,
  message: PropTypes.string,
};
export default NewEntry;
