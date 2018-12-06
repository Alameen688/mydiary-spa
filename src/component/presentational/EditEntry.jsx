import React from 'react';
import PropTypes from 'prop-types';

const EditEntry = ({
  title,
  content,
  onChange,
  onFocus,
  loading,
  onClick,
  message,
  errors
}) => (
  <main>
    <div id="write-box">
      <h1 id="write-title">Edit Entry</h1>
      { message && message.length ? <div className="message-box">{message}</div> : null}
      {errors && errors.length ? <div id="error-box"><ul id="error-msg">{errors.map((error, index) => (<li key={index}>{error}</li>))}</ul></div> : null}
      { !loading && (<form>
        <input type="text" name="title" className="w-input" placeholder="Subject" id="write-subject" onChange={onChange} onFocus={onFocus} value={title} required />
        <textarea name="content" id="write-content" className="w-input" rows="10" placeholder="What happened...." onChange={onChange} onFocus={onFocus} value={content}
                  required></textarea>
        <input type="submit" value="Save" id="edit-entry-btn" className="form__btn btn-entry" onClick={onClick} />
      </form>) }
    </div>
  </main>
);

EditEntry.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  message: PropTypes.string,
  errors: PropTypes.array,
};

export default EditEntry;
