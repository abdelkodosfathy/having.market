import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer__addr">
      <h1 className="footer__logo">Having</h1>
      {/* <h2>Contact</h2> */}
      {/* <address>
        5534 Somewhere In. The World 22193-10212
      </address> */}
    </div>
    <ul className="footer__nav">
      <li className="nav__item">
        <h2 className="nav__title">Contact Us</h2>

        <ul className="nav__ul">
          <li>
            <a href="mailto:support@having.market">support</a>
          </li>

          <li>
            <a href="#">phone: +20</a>
          </li>
        </ul>
      </li>
      
      
      <li className="nav__item">
        <h2 className="nav__title">Legal</h2>
        
        <ul className="nav__ul">
          <li>
            <a href="https://app.having.market/privacy_policy">Privacy Policy</a>
          </li>
          
          <li>
            <a href="https://app.having.market/terms_and_conditions">Terms of Use</a>
          </li>
        </ul>
      </li>
    </ul>
    <div className="legal">
      <p>&copy; 2024 HAVING. All rights reserved.</p>
    </div>
  </footer>
  )
}

export default Footer