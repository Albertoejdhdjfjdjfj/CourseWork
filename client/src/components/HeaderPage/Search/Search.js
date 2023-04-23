import React from 'react';
import cross from '../../../assets/images/Cross.svg';
import { useDispatch } from 'react-redux';
import { setSearchText } from '../../../redux/actions/actions';
import { setSearchDisplay } from '../../../redux/actions/actions';
import './Search.css';

const Search = () => {
  const dispatch = useDispatch();

  const handleClickEnter = (e) => {
    if (e.keyCode == 13) {
      dispatch(setSearchText(e.target.value));
    }
  };

  return (
    <div>
      <div className="search">
        <div>
          <img
            onClick={() => {
              dispatch(setSearchDisplay()), dispatch(setSearchText(''));
            }}
            src={cross}
          />
          <div>
            <input
              type="text"
              placeholder="ENTER SEARCH TERMS"
              onKeyDown={(e) => handleClickEnter(e)}
            />
            <hr />
          </div>
        </div>
      </div>

      <div className="search_result"></div>
    </div>
  );
};

export default Search;
