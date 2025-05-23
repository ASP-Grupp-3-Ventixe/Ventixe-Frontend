import React from 'react'
import FacebookLogo from '../../images/icons/FacebookLogo.svg';
import InstagramLogo from '../../images/icons/InstagramLogo.svg';
import LinkedinLogo from '../../images/icons/LinkedinLogo.svg';
import XLogo from '../../images/icons/XLogo.svg';
import YoutubeLogo from '../../images/icons/YoutubeLogo.svg';


const Footer = () => {
  return (
    <footer className='footer'>
    <p className="footer-copyright">Copyright &copy; 2025 Peterdraw</p>
    <div className="footer-misc">
        <a className="footer-misc-text">Privacy Policy</a>
        <a className="footer-misc-text">Terms and Conditions</a>
        <a className="footer-misc-text">Contact </a>
    </div>
    <div className="footer-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={FacebookLogo} alt="Facebook" className="footer-icon" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={InstagramLogo} alt="Instagram" className="footer-icon" />
        </a>
        <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
            <img src={XLogo} alt="X" className="footer-icon" />
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <img src={YoutubeLogo} alt="YouTube" className="footer-icon" />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src={LinkedinLogo} alt="LinkedIn" className="footer-icon" />
        </a>
    </div>
  </footer>
  )
}

export default Footer
