import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Header from "../Header"
import Footer from "../Footer"

import BG from "../../assets/front-assets/images/contact_us.png"
import IndexEnquiry from "../user-screens/components/forms/IndexEnquiry"
const Contact = props => {
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
                <h4 class="mb-1 font-size-18 text-center text-white">
                  Contact
                </h4>
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
                          Contact
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
      <div className="contact-page">
        <h1 className="text-center pb-6"></h1>
        <div className="container">
          <div className="row pb-6">
            <div className="col-md-4">
              <div className="contact-info text-center">
                <i className="bx bx-phone"></i>
                <h2>Phone</h2>
                <p>
                  070 - 39090157
                  <br /> 081 - 26284849
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="contact-info text-center">
                <i className="bx bxs-map"></i>
                <h2>Address</h2>
                <p>
                  D-Wing Ground Floor Reinsurance Building beside Bank of
                  Industry, Herbert Macaulay way, Central Business District FCT,
                  Abuja
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="contact-info text-center">
                <i className="bx bx-envelope"></i>
                <h2>Email</h2>
                <p>info@WebTalla.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <IndexEnquiry />
          <br />
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Contact
