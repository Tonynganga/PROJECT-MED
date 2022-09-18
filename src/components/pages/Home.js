import React, { useState } from 'react';
import './CssMain.css';
import MainNavbar from '../../components/MainNavbar';
import ViewReviews from './ViewReviews';
import SendEmail from './SendEmail';
import image from "../../assets/images/homepage.jpg";
import image2 from "../../assets/images/loginimage.jpg";

function Home() {


  return (
    <div>
      <div className='home__navbar'>
        <MainNavbar />
      </div>
      <div className='main__home'>
        <section id="hero" className="d-flex align-items-center">
          <div className='banner'>
            <ul class="slideshow">
              <li><span></span></li>
              <li><span></span></li>
              <li><span></span></li>
              <li><span></span></li>
              <li><span></span></li>
              <li><span></span></li>
              <li><span></span></li>
              <li><span></span></li>
            </ul>

          </div>
          <div className="container text-center position-absolute ml-300px">
            <h1>24/7 Care is available</h1>
            <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, deleniti.</h2>
            <a href="/loginsignup" className="main-btn">Get Started</a>
          </div>
        </section>

        <section className="about-section clearfix ">
          <div className="new-container bg-transparent">
            <div className="about">

              <div class="about-card">
                <div class="card_part card_part-one"> 
                </div>
                {/* <!-- Photo 2 --> */}
                <div class="card_part card_part-two"> 
                </div>
                {/* <!-- Photo 3 --> */}
                <div class="card_part card_part-three">
                </div>
                {/* <!-- Photo 4 --> */}
                <div class="card_part card_part-four">  
                </div>
                <div class="card_part card_part-five">  
                </div>
                <div class="card_part card_part-six">
                </div>
              </div>

              <div className="about-text left-0 text-center bg-faded p-5 rounded">
                <h2 className="about-heading mb-4">
                  <span className="about-heading-upper">Welcome</span>
                  <span className="about-heading-lower">To Our Hospital</span>
                </h2>
                <p className="mb-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Aut quod laboriosam eligendi, repellendus cumque ducimus minus libero
                  autem sint sed deserunt
                  qui ullam porro quasi dignissimos. Pariatur commodi hic in!
                  autem sint sed deserunt
                  

                </p>
                <div className="about-button mx-auto">
                  <a className="btn btn-color btn-lg" href="#">Know More</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="review" id="review">

          <ViewReviews />

        </section>

        <section className="contact">
          <div className="container bg-transparent">

            <div className="section-title text-center mt-5">
              <h2>Contact</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, accusamus.</p>
            </div>

            <div className="row" id='contactus'>

              <div className="col-lg-6">

                <div className="row">
                  <div className="col-md-12">
                    <div className="contact-box">
                      <i className="fas fa-map-signs"></i>
                      <h3>Address</h3>
                      <p>Lorem Brasilia Zip code: 45687 </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="contact-box mt-4">
                      <i className="fas fa-envelope"></i>
                      <h3>Email Us</h3>
                      <p>test@example.com<br />contact@example.com</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="contact-box mt-4">
                      <i className="fas fa-phone"></i>
                      <h3>Call Us</h3>
                      <p>+55 61 1234 789 <br />+55 61 123 4567</p>
                    </div>
                  </div>
                </div>

              </div>
              <div className="col-lg-6">
                <SendEmail />
              </div>

            </div>

          </div>

        </section>




        <footer className="footer py-4 mt-5">
          <div className="container bg-transparent">
            <div className="row align-items-center">
              <div className="col-lg-4 text-lg-left">Copyright © Your Website 2020</div>
              <div className="col-lg-4 my-3 my-lg-0">
                <a className="btn btn-back btn-social mx-2" href="#!">
                  <i className="fab fa-twitter"></i></a>
                <a className="btn btn-back btn-social mx-2" href="#!">
                  <i className="fab fa-facebook-f"></i></a>
                <a className="btn btn-back btn-social mx-2" href="#!">
                  <i className="fab fa-linkedin-in"></i></a>
              </div>
              <div className="col-lg-4 text-lg-right">
                <a className="mr-3 text" href="#!">Privacy Policy</a>
                <a href="#!" className="text">Terms of Use</a></div>
            </div>
          </div>
        </footer>





      </div>

     
    </div>






  );
}

export default Home;
