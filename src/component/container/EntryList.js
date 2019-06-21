import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EntryListItem from '../presentational/EntryListItem.jsx';
import { getEntries } from '../../store/action/entry';
import Aux from '../HOC/Aux.jsx';
import { formatDate } from '../../utils';
import HeaderComponent from './Header';
import addIcon from '../../asset/images/plus.png';
import { DispatchContext } from '../../store/reducer/index';

export const EntryList = () => {
  const { state, dispatch } = useContext(DispatchContext);

  const { entries: { entries, errors } } = state;

  useEffect(() => {
    if (!Object.keys(entries).length) {
      getEntries()(dispatch);
    }
  }, [entries]);

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
};

export default EntryList;
