import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  step_after_breakpoint,
  step_before_breakpoint,
  window_after_breakpoint,
  start_hight_of_page_after,
  start_hight_of_page_before,
  margin_top_button_after,
  margin_top_button_before
} from './helpers/variables';
import './SearchResult.css';
import Products from './helpers/Products';

const SearchResult = () => {
  const [numSlides, setNumSlides] = useState(0);
  const [filterData, setFilterData] = useState(false);

  const search = useSelector((state) => state.headerPage.search);
  const data = useSelector((state) => state.headerPage.products);

  const handleNumOfSlidesChange = () => {
    if (filterData.length - numSlides > 4) {
      setNumSlides(numSlides + 8);
    } else {
      setNumSlides(numSlides + 4);
    }
  };

  const handleHeight = (start_hight_of_page_before = 0, start_hight_of_page_after = 0) => {
    if (window.innerWidth >= window_after_breakpoint) {
      if (filterData.length !== 0) {
        return start_hight_of_page_before + Math.trunc(numSlides / 4) * step_before_breakpoint;
      }

      return step_before_breakpoint / 2;
    }
    if (filterData.length !== 0) {
      return start_hight_of_page_after + Math.trunc(numSlides / 4) * step_after_breakpoint;
    }

    return step_after_breakpoint / 2;
  };

  useEffect(() => {
    if (Array.isArray(data)) {
      setFilterData(
        data.filter(
          (i) =>
            i.type.includes(search) ||
            i.color.name.includes(search) ||
            i.name.includes(search) ||
            i.price.value.includes(search) ||
            i.availableSizes[0].includes(search)
        )
      );
    }
  }, [search]);

  useEffect(() => {
    setNumSlides(0);
    handleNumOfSlidesChange();
  }, [search]);

  return (
    search !== '' &&
    filterData && (
      <div
        style={{
          height: `${handleHeight(start_hight_of_page_before, start_hight_of_page_after)}vw`
        }}
        className="category"
      >
        <h3>Search results</h3>
        <div
          style={{
            height: `${handleHeight(0, 0)}vw`
          }}
        >
          {filterData.length !== 0 ? (
            <Products products={filterData} />
          ) : (
            <p>No beauty products found</p>
          )}
        </div>

        {Array.isArray(filterData) && filterData.length - numSlides > 0 && (
          <p
            onClick={handleNumOfSlidesChange}
            style={{
              marginTop: `${handleHeight(margin_top_button_before, margin_top_button_after)}vw`
            }}
          >
            Show more
          </p>
        )}
      </div>
    )
  );
};

export default SearchResult;
