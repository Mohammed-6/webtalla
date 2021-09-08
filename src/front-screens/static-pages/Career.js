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
        class="banner-area abt-banner-bg"
        style={{ backgroundImage: "url(" + BG + ")" }}
      >
        <div class="container">
          <div class="row">
            <div class="col-md-12 text-center">
              <div class="page-title-box d-block align-items-center justify-content-between">
                <h4 class="mb-1 font-size-18 text-center text-white">Career</h4>
                <div class="page-title-right">
                  <nav class="">
                    <ol class="breadcrumb m-0 justify-content-center">
                      <li class="breadcrumb-item">
                        <Link to="/" className="text-white">
                          Home
                        </Link>
                      </li>
                      <li class="active breadcrumb-item" aria-current="page">
                        <Link to="" className="text-white">
                          Career
                        </Link>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="career-page">
        <div className="container">
          <h2>
            IF YOU ARE PASSIONATE ABOUT PROVIDING CREATIVE SOLUTIONS, THEN WEB
            TALLA IS THE PLACE TO BE.
          </h2>
          <section className="map_section" style={{ width: "100%" }}>
            <br />
            <br />
            <div className="offset-md-3 col-md-6">
              <div className="cr-result"></div>
              <form enctype="multipart/form-data" onsubmit="return false">
                <div className="form-field">
                  <label for="name">
                    Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    name="name"
                    placeholder="Your Name"
                    required=""
                  />
                </div>
                <div className="form-field">
                  <label for="email">
                    E-Mail<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    name="email"
                    placeholder="Your E-mail"
                    required=""
                  />
                </div>
                <div className="form-field">
                  <label for="mobile">
                    Mobile<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id=""
                    className="form-control"
                    name="mobile"
                    placeholder="Your Mobile"
                    required=""
                  />
                </div>
                <div className="form-field">
                  <label for="mobile">
                    Position / Job Reference Id
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id=""
                    className="form-control"
                    name="position"
                    placeholder="Eg: Developer / CX5478"
                    required=""
                  />
                </div>
                <div className="form-field">
                  <label for="message">
                    Cover Letter<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="file"
                    id=""
                    className="form-control"
                    name="cover"
                  />
                </div>
                <div className="form-field">
                  <label for="message">
                    Attachment<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="file"
                    id=""
                    className="form-control"
                    name="attach"
                    required=""
                  />
                </div>
                <input type="hidden" name="carrers-submit" />
                <input
                  type="submit"
                  className="btn btn-primary mt-4"
                  value="Submit"
                />
              </form>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Career
