import React from 'react';
import "./Footer.css";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/appstore.png";
import footerLogo from "../../../images/ecom-logo-01.jpg";

const Footer = () => {
     return (
          <footer id="footer">
               <div className="leftFooter">
                    <h4>DOWNLOAD OUR APP</h4>
                    <p>Download our app for Android and IOS mobile phone</p>
                    <img src={playStore} alt="play store" />
                    <img src={appStore} alt="app store" />
               </div>

               <div className="midFooter">
                    <img src={footerLogo} alt="" />
                    <p>High quality is our first priority</p>

                    <p>Copyright 2021 &copy; DZYGrow.com</p>
               </div>

               <div className="rightFooter">
                    <h4>Follow Us</h4>
                    <a href="https://instagram.com/dzygrow">Instagram</a>
                    <a href="https://youtube.com/dzygrow">Youtube</a>
                    <a href="https://facebook.com/dzygrow">Facebook</a>
               </div>
               
          </footer>
     )
}

export default Footer;