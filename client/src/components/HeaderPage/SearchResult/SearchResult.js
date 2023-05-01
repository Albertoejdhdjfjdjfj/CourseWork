import React from 'react';
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { host } from '../../../assets/constans/config';
import './SearchResult.css';
import heart from '../../../assets/images/heart.svg';

const SearchResult = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(false);
  const [nextArr, setNextArr] = useState(false);
  const search = useSelector((state) => state.headerPage.search);
  const navigate=useNavigate()
  const fetchCategory = async (sort, limit) => {
    const nextarr = await fetch(
      host + `products?sort=${sort}&page=${page + 1}&limit=${limit}`
    ).then((res) => res.json());

    return setPage(page + 1), setData(data.concat(nextArr)), setNextArr(nextarr);
  };

  useEffect(() => {
    const fetchData = async () => {
      const arr = await fetch(host + `products?sort=${search}&page=${1}&limit=${4}`).then((res) =>
        res.json()
      );
      setData(arr);
      const nextarr = await fetch(host + `products?sort=${search}&page=${2}&limit=${4}`).then(
        (res) => res.json()
      );
      setNextArr(nextarr);
      setPage(2);
    };
    fetchData();
  }, [search]);

  return (
    search &&
    data && (
      <div className="search_result">
        <div>
          {data.map((item) => (
            <div key={item._id}>
              <span>
                <img src={heart} onClick={() => addToFavorites(item)} />
              </span>
              <img src={item.images[0]} onClick={() => navigate(`/product/${item._id}`)} />
              <p>${item.price.value}</p>
            </div>
          ))}

          {data.length == 0 && <p>No beauty products found</p>}
        </div>

        {nextArr.length !== 0 && <p onClick={() => fetchCategory(search, 4)}>Show more</p>}
      </div>
    )
  );
};

export default SearchResult;
