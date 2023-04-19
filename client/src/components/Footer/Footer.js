import React, { useState } from 'react';
import './Footer.css';
import facebook from '../../assets/images/facebok-logo.svg';
import odnoklassniki from '../../assets/images/odnoklassniki.svg';
import instagram from '../../assets/images/instagram-logo.svg';
import plus from '../../assets/images/plus.svg';
import minus from '../../assets/images/minus.svg';

const Footer = () => {
  const [service, setService] = useState(window.innerWidth <= 850 ? false : true);
  const [info, setInfo] = useState(window.innerWidth <= 850 ? false : true);
  const [follow, setFollow] = useState(window.innerWidth <= 850 ? false : true);
  const [contact, setContact] = useState(window.innerWidth <= 850 ? false : true);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(false);

  const followToNews = async () => {
    const message = await fetch('https://if-modnikky-api.onrender.com/api/subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    });
    console.log(message.status);

    if (message.status < 400) {
      message = message.json();
      setMessage(message);
    }
  };

  return (
    <div className="footerSection">
      <div>
        <h2>SIGN UP FOR UPDATES</h2>
        <p>Sign up for exclusive early sale access and tailored new arrivals.</p>

        {!message && (
          <div>
            <input
              type="email"
              placeholder="Your email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p onClick={followToNews}>JOIN</p>
          </div>
        )}

        {message && <p>{message}</p>}

        <footer>
          <div>
            <h3>
              <img src={service ? minus : plus} onClick={() => setService(!service)} />
              CUSTOMER SERVICE
            </h3>

            {service && (
              <div>
                <p>CONTACT</p>
                <p>TRACK ORDER</p>
                <p>DELIVERY & RETURNS</p>
                <p>PAYMENT</p>
                <p>MAKE A RETURN</p>
                <p>FAQ</p>
              </div>
            )}
          </div>
          <div>
            <h3>
              <img src={info ? minus : plus} onClick={() => setInfo(!info)} />
              INFO
            </h3>

            {info && (
              <div>
                <p>GIFT VOUCHERS</p>
                <p>SIZE GUIDE</p>
                <p>CAREERS AT MODNIKKY</p>
                <p>ABOUT US</p>
                <p>LEGAL POLICIES</p>
              </div>
            )}
          </div>

          <div>
            <h3>
              <img src={follow ? minus : plus} onClick={() => setFollow(!follow)} />
              FOLLOW US
            </h3>

            {follow && (
              <div>
                <p>
                  <img src={facebook} />
                  FACEBOOK
                </p>
                <p>
                  <img src={odnoklassniki} />
                  ODNOKLASSNIKI
                </p>
                <p>
                  <img src={instagram} />
                  INSTAGRAM
                </p>
              </div>
            )}
          </div>

          <div>
            <h3>
              <img src={contact ? minus : plus} onClick={() => setContact(!contact)} />
              CONTACT US
            </h3>

            {contact && (
              <div>
                <p>hello@modnikky.com</p>
                <p>+7 910 832 26XX</p>
                <p>
                  Visit us at Shalalaeva 23,
                  <br />
                  Bologoe, Russia
                </p>
              </div>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
