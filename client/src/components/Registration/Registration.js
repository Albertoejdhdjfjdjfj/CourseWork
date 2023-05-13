import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';
import { host } from '../../assets/constans/config';
import remove_icon from '../../assets/images/remove-icon.svg';

const Registration = () => {
  const [name, setName] = useState('albert');
  const [lastName, setLastName] = useState('albert');
  const [email, setEmail] = useState('bairamukov.albert2003@gmail.com');
  const [password, setPassword] = useState('1234');
  const [subscribe, setSubscribe] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const subscribeToNews = async () => {
    await fetch(host + 'subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    });
  };

  const registration = async () => {
    const req = await fetch(host + 'auth/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        firstname: name,
        lastname: lastName,
        email: email,
        password: password
      })
    });

    if (req.status == 400) {
      return req.json().then((data) => setError(data.message));
    } else {
      if (subscribe) {
        subscribeToNews();
      }
    }

    return navigate('/login');
  };

  return (
    <div className="registration">
      <h2>
        CREATE ACCOUNT <img onClick={() => navigate('/login')} src={remove_icon} />
      </h2>
      <div>
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          maxLength={25}
        />
        <input
          type="text"
          placeholder="Last Name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          maxLength={15}
        />
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
      <div className="conventions">
        <div>
          <input type="checkbox" onChange={() => setSubscribe(!subscribe)} />
          <label>
            Let's get personal! We'll send you only the good stuff: Exclusive early access to Sale,
            new arrivals and promotions.
          </label>
        </div>
        <p>
          By signing up you agree to <a href="#">Terms of Service</a> and{' '}
          <a href="#">Privacy Policy</a>
        </p>
      </div>
      <button onClick={registration}>SIGN UP</button>
      <span>
        <a onClick={() => navigate('/login')}>I HAVE AN ACCOUNT</a>
      </span>
    </div>
  );
};

export default Registration;
