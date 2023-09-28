import React from "react";
import "./pages/Main.css";
import { Link } from "react-router-dom";
import FooterContactUs from "./FooterContactUs";

function Footer() {
  return (
    <div className="footer_container">
      <footer>
      <div class="main-content">
        <div class="left box">
          <h2>About us</h2>
          <div class="content">
            <p>DoctWeb is a website that allows interaction between doctors and patients.It allows patients to book appointments with respective doctors from different hospitals, Keep their appointment records among other funtionalities. <br/> If you have any inquiries feel free to contact us through our cell phone or email </p>
            <div class="social">
              <a href="https://facebook.com/coding.np"><span class="fab fa-facebook-f"></span></a>
              <a href="#"><span class="fab fa-twitter"></span></a>
              <a href="https://instagram.com/coding.np"><span class="fab fa-instagram"></span></a>
              <a href="https://youtube.com/c/codingnepal"><span class="fab fa-youtube"></span></a>
            </div>
          </div>
        </div>
        <div class="center box">
          <h2>Address</h2>
          <div class="content">
            <div class="place">
              <span class="fas fa-map-marker-alt"></span>
              <span class="text">Nairobi , Kenya</span>
            </div>
            <div class="phone">
              <span class="fas fa-phone-alt"></span>
              <span class="text">+254-722114014/+254-777667734</span>
            </div>
            <div class="email">
              <span class="fas fa-envelope"></span>
              <span class="text">vic&ton.coders@gmail.com</span>
            </div>
          </div>
        </div>
        <FooterContactUs/>
      </div>
      <div class="bottom">
        <center>
          <span class="credit">Created By <a href="https://www.codingnepalweb.com">Vic&Ton</a> | </span>
          <span class="far fa-copyright"></span><span> 2022 All rights reserved.</span>
        </center>
      </div>
    </footer>
    </div>
    
  );
}

export default Footer;
