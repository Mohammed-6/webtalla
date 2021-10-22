import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Header from "../Header"
import Footer from "../Footer"

import BG from "../../assets/front-assets/images/career.png"
const Career = props => {
  useEffect(() => {
    // console.log(props.coords)
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position.coords)
      },
      err => console.log(err)
    )
  }, [])

  return (
    <>
      <Header />
      <div
        class="banner-area abt-banner-bg career-banner"
        style={{ backgroundImage: "url(" + BG + ")", padding: "65px 0" }}
      >
        <div className="career-page">
          <div className="container">
            <section className="map_section" style={{ width: "100%" }}>
              <br />
              <br />
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-5 text-center">
                    <ul className="jss108">
                      <li>
                        <p align="justify">
                          <h3 className="text-white">
                            At WebTalla, we are a driven and passionate team
                            that thinks and breathes anything and everything
                            about advertising. We pride ourselves in the
                            campaigns we help our clients develop and implement
                            and encourage each other to be the best.
                          </h3>
                        </p>
                      </li>
                      <li>
                        <p align="justify">
                          <h3 className="text-white">
                            We are looking for people who are hardworking,
                            passionate and driven to give their best always.
                          </h3>
                        </p>
                      </li>
                      <li>
                        <p align="justify">
                          <h3 className="text-white">
                            Come, join us and make an impact with your creative
                            ideas.
                          </h3>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="conatiner">
                    <div class="card">
                      <div class="card-body">
                        <h2>Who are you?</h2>
                        <form action="" method="post">
                          <div class="col-md-12 clearfix career-form">
                            <div class="row">
                              <div class="form-group col-md-6 pl">
                                <label>Type your name here *</label>
                                <input
                                  type="text"
                                  name="name"
                                  class="form-control"
                                  placeholder="enter your name"
                                  required=""
                                />
                              </div>
                              <div class="form-group col-md-6 pr">
                                <label>Type your comapny name here *</label>
                                <input
                                  type="text"
                                  name="company"
                                  class="form-control"
                                  placeholder="enter your company name"
                                  required=""
                                />
                              </div>
                              <div class="form-group col-md-6 pl">
                                <label>Type your email ID *</label>
                                <input
                                  type="email"
                                  name="email"
                                  class="form-control"
                                  placeholder="enter your email"
                                  required=""
                                />
                              </div>
                              <div class="form-group col-md-6 pr">
                                <label>Type your mobile no. *</label>
                                <input
                                  type="text"
                                  name="mobile"
                                  class="form-control"
                                  placeholder="enter your mobile number"
                                  required=""
                                />
                              </div>

                              <h2>Your Current Employment Details</h2>

                              <div class="form-group col-md-6 pl">
                                <label>
                                  How much work experience do you have? *
                                </label>
                                <input
                                  type="number"
                                  name="experience"
                                  class="form-control"
                                  placeholder="Enter your working experience"
                                  required=""
                                />
                              </div>
                              <div class="form-group col-md-6 pr">
                                <label>What are your Key Skills? *</label>
                                <input
                                  type="text"
                                  name="skills"
                                  class="form-control"
                                  placeholder="Enter skills"
                                  required=""
                                />
                              </div>
                            </div>
                          </div>
                          <div class="form-group career-form col-md-6 pr">
                            <label>Upload *</label>
                            <input
                              type="file"
                              className="form-control"
                              name="my_file"
                            />
                          </div>
                          <br />
                          <button type="submit" class="btn btn-primary">
                            Apply Now
                          </button>
                          <br />
                          <div>
                            <br />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Career
