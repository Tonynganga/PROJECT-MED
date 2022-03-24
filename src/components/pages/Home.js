import React, { useState } from 'react';
import './Home.css';
import MainNavbar from '../../components/MainNavbar';





function Home() {
  

  return (
    <div>
      <div className='home__navbar'>
        <MainNavbar />
      </div>
      <div className='main__home'>
        <section id="hero" class="d-flex align-items-center">
          <div className="container text-center position-relative">
            <h1>24/7 Care is available</h1>
            <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, deleniti.</h2>
            <a href="/loginsignup" class="main-btn">Get Started</a>
          </div>
        </section>

        <section className="about-section clearfix py-5">
          <div className="container bg-transparent">
            <div className="about">
              <img className="about-img img-fluid mb-3 mb-lg-0 rounded"
                src="images/aboutimage.jpg" alt="" />
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

        <section class="review" id="review">

          <div class="container bg-transparent">

            <h1 class="heading"><span>'</span> people's review <span>'</span></h1>

            <div class="box-container">

              <div class="box" data-aos="fade-right">
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur accusantium error numquam dolore atque. Atque totam ad sint ducimus! Maxime!</p>
                <h3>someone's name</h3>
                <span>jan 5, 2021</span>
                <img src="images/aboutimage.jpg" alt="" />
              </div>

              <div class="box" data-aos="fade-up">
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur accusantium error numquam dolore atque. Atque totam ad sint ducimus! Maxime!</p>
                <h3>someone's name</h3>
                <span>jan 7, 2021</span>
                <img src="images/aboutimage.jpg" alt="" />
              </div>

              <div class="box" data-aos="fade-left">
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur accusantium error numquam dolore atque. Atque totam ad sint ducimus! Maxime!</p>
                <h3>someone's name</h3>
                <span>jan 10, 2021</span>
                <img src="images/aboutimage.jpg" alt="" />
              </div>

            </div>

          </div>

        </section>

        <section class="contact">
          <div class="container bg-transparent">

            <div class="section-title text-center mt-5">
              <h2>Contact</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, accusamus.</p>
            </div>

            <div class="row">

              <div class="col-lg-6">

                <div class="row">
                  <div class="col-md-12">
                    <div class="contact-box">
                      <i class="fas fa-map-signs"></i>
                      <h3>Address</h3>
                      <p>Lorem Brasilia Zip code: 45687 </p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="contact-box mt-4">
                      <i class="fas fa-envelope"></i>
                      <h3>Email Us</h3>
                      <p>test@example.com<br />contact@example.com</p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="contact-box mt-4">
                      <i class="fas fa-phone"></i>
                      <h3>Call Us</h3>
                      <p>+55 61 1234 789 <br />+55 61 123 4567</p>
                    </div>
                  </div>
                </div>

              </div>

              <div class="col-lg-6">
                <form>
                  <div class="form-row">
                    <div class="col-md-6 form-group">
                      <input type="text" name="name" class="form-control" id="name"
                        placeholder="Your Name" />

                    </div>
                    <div class="col-md-6 form-group">
                      <input type="email" class="form-control" name="email"
                        id="email" placeholder="Your Email" />

                    </div>
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" name="subject"
                      id="subject" placeholder="Subject" />
                  </div>
                  <div class="form-group">
                    <textarea class="form-control" name="message" rows="5"></textarea>
                  </div>
                  <div class="text-center">
                    <button class="form-submit" type="submit">Send Message</button></div>
                </form>
              </div>

            </div>

          </div>

        </section>




        <footer class="footer py-4 mt-5">
          <div class="container bg-transparent">
            <div class="row align-items-center">
              <div class="col-lg-4 text-lg-left">Copyright © Your Website 2020</div>
              <div class="col-lg-4 my-3 my-lg-0">
                <a class="btn btn-back btn-social mx-2" href="#!">
                  <i class="fab fa-twitter"></i></a>
                <a class="btn btn-back btn-social mx-2" href="#!">
                  <i class="fab fa-facebook-f"></i></a>
                <a class="btn btn-back btn-social mx-2" href="#!">
                  <i class="fab fa-linkedin-in"></i></a>
              </div>
              <div class="col-lg-4 text-lg-right">
                <a class="mr-3 text" href="#!">Privacy Policy</a>
                <a href="#!" class="text">Terms of Use</a></div>
            </div>
          </div>
        </footer>





      </div>

    </div>




  );
}

export default Home;
