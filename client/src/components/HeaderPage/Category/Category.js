import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { addLiked, deleteLiked } from '../../../redux/actions/actions';
import { host } from '../../../assets/constans/config';
import Cookies from 'js-cookie';
import heart from '../../../assets/images/heart.svg';
import likeHeart from '../../../assets/images/like-heart.svg';
import './Category.css';

const Category = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(false);
  const [nextArr, setNextArr] = useState(false);

  const category = useSelector((state) => state.headerPage.category);
  const likedData = useSelector((state) => state.products.liked);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchCategory = async (sort, limit) => {
    const nextarr = await fetch(
      host + `products?sort=${sort}&page=${page + 1}&limit=${limit}`
    ).then((res) => res.json());

    return setPage(page + 1), setData(data.concat(nextArr)), setNextArr(nextarr);
  };

  useEffect(() => {
    const fetchData = async () => {
      const arr = await fetch(host + `products?sort=${category}&page=${1}&limit=${4}`).then((res) =>
        res.json()
      );
      setData(arr);
      const nextarr = await fetch(host + `products?sort=${category}&page=${2}&limit=${4}`).then(
        (res) => res.json()
      );
      setNextArr(nextarr);
      setPage(2);
    };
    fetchData();
  }, [category]);

  return (
    category &&
    data && (
      <div className="category">
        <h3>{category}</h3>

        <div>
          {data.map((item) => (
            <div key={item._id}>
              <span
                onClick={() =>
                  likedData && likedData.some((el) => el._id === item._id)
                    ? dispatch(deleteLiked({ product: item, token: Cookies.get('modnikky_token') }))
                    : dispatch(addLiked({ product: item, token: Cookies.get('modnikky_token') }))
                }
              >
                <img
                  src={likedData && likedData.some((el) => el._id === item._id) ? likeHeart : heart}
                />
              </span>
              <img src={item.images[0]} onClick={() => navigate(`/product/${item._id}`)} />
              <p>${item.price.value}</p>
            </div>
          ))}

          {data.length == 0 && <p>No beauty products found</p>}
        </div>

        {nextArr.length !== 0 && <p onClick={() => fetchCategory(category, 4)}>Show more</p>}
      </div>
    )
  );
};

export default Category;
