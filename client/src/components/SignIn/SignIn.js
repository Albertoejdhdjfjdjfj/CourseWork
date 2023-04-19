import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserId } from '../../redux/actions/actions';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authorization = async () => {
    let user = await fetch(`http://localhost:3001/users?email=${email}&password=${password}`).then(
      (response) => response.json()
    );

    user[0]
      ? (dispatch(setUserId(user[0].id)),
        localStorage.setItem('email', email),
        localStorage.setItem('password', password),
        navigate('/'))
      : setError('Invalid email or password');
  };

  useEffect(() => {
    fetch(
      `http://localhost:3001/users?email=${localStorage.getItem(
        'email'
      )}&password=${localStorage.getItem('password')}`
    )
      .then((response) => response.json())
      .then((user) => {
        user[0] ? (dispatch(setUserId(user[0].id)), navigate('/')) : '';
      });
  }, []);

  return (
    <div className="sign_in">
      <h2>SIGN IN</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          minLength={6}
        />

        <p>{error}</p>
      </div>

      <button onClick={authorization}>SIGN IN</button>
      <span>
        <a onClick={() => navigate('/signUp')}>I HAVEN'T AN ACCOUNT</a>
      </span>
    </div>
  );
};

export default SignIn;
