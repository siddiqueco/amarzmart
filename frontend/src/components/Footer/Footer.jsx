import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/logo'
import paypalLogo from '../../assests/img/paypal.png'


function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>

        <p className='footer-subscription-heading'>
          {/* Amarzshop<i className='fab fa-typo3' />   */}
          <Logo /> believe in yourself || dame kom mane valo
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <button className='btn btn-primary footer-buttton'>Subscribe</button>
          </form>
        </div>
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/login'>How it works</Link>
            <Link to='/'>Testimonials</Link>
            <Link to='/'>Careers</Link>
            <Link to='/'>Investors</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Menu</h2>
            <Link to='/'>Privacy Policy</Link>
            <Link to='/'>Cookie Policy</Link>
            <Link to='/'>Purchasing Policy</Link>
            <Link to='/'>Terms & Conditions</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
            <Link to='/'>Destinations</Link>
            <Link to='/'>Sponsorships</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Get in touch</h2>
            <div className='social-icons'>
              <Link
                className='social-icon-link github'
                to='/'
                target='_blank'
                aria-label='Github'
              >
                <i className='fab fa-github' />
              </Link>
              <Link
                className='social-icon-link facebook'
                to='/'
                target='_blank'
                aria-label='Facebook'
              >
                <i className='fab fa-facebook-f' />
              </Link>
              <Link
                className='social-icon-link instagram'
                to='/'
                target='_blank'
                aria-label='Instagram'
              >
                <i className='fab fa-instagram' />
              </Link>
              <Link
                className='social-icon-link twitter'
                to='/'
                target='_blank'
                aria-label='Twitter'
              >
                <i className='fab fa-youtube' />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          
          <small className='website-rights'>© 2021 Amarshop All rights reserved.</small>
          {/* social icons */}
          <div className='footer-logo'>
            <img src={paypalLogo} alt="we are acception paypal" className='social-logo' style={{width:'150px'}}/>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
