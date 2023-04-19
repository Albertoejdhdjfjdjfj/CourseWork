import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import remove_icon from '../../assets/images/remove-icon.svg';

const SignUp = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const registration = async () => {
    let user = await fetch(`http://localhost:3001/users?email=${email}`).then((response) =>
      response.json()
    );

    if (!user[0]) {
      await fetch('http://localhost:3001/users', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          name: name,
          lastName: lastName,
          email: email,
          password: password
        })
      });
      navigate('/signIn');
    } else {
      setError('An account with this email already exists');
    }
  };

  return (
    <div className="sign_up">
      <h2>
        CREATE ACCOUNT <img src={remove_icon} />
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
          <input type="checkbox" />
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
        <a onClick={() => navigate('/signIn')}>I HAVE AN ACCOUNT</a>
      </span>
    </div>
  );
};

export default SignUp;
