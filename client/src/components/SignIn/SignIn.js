import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserId } from '../../redux/actions/actions';
import './SignIn.css';

const SignIn = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authorization=()=>{

  }
    

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
