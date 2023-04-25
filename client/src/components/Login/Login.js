import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { host } from '../../assets/constans/config';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('bairamukov.albert2003@gmail.com');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    const req = await fetch(host + 'auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    if (req.status == 400) {
      return req.json().then((data) => setError(data.message));
    }

    const res = await req.json();
    Cookies.set('modnikky_token', res.token);
    return navigate('/');
  };

  return (
    <div className="login">
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

      <button onClick={login}>SIGN IN</button>
      <span>
        <a onClick={() => navigate('/registration')}>I HAVEN'T AN ACCOUNT</a>
      </span>
    </div>
  );
};

export default Login;
