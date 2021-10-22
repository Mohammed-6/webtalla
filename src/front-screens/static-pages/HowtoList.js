import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Header from "../Header"
import Footer from "../Footer"

import Pimage from "../../assets/front-assets/images/partner-image.png"

const HowtoList = props => {
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
      <div className="">
        <div className="jss2">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-xl-6">
              <img src={Pimage} alt="TMA Partner" className="w-100" />
            </div>
            <div className="col-xs-12 col-sm-6 col-xl-6">
              <div className="jss107">
                <h1 style={{ color: "#444" }}>
                  <b>
                    List your media <br />
                    and get new clients.
                  </b>
                </h1>
                <ul className="jss108">
                  <li>
                    <h3>Free listing</h3>
                  </li>
                  <li>
                    <h3>
                      Reach out to advertisers across the country for free
                    </h3>
                  </li>
                </ul>
                <a href="" className="jss109">
                  List Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="jss2 jssb3 mt-1">
        <div className="row">
          <div className="offset-md-4 col-md-4">
            <div className="text-center">
              <h2 style={{ marginTop: "100px" }}>Media Details</h2>
              <div className="pt-6">
                <input
                  type="text"
                  className="form-control mt-4"
                  placeholder="Agency Name*"
                />
              </div>
              <div className="pt-6">
                <input
                  type="text"
                  className="form-control mt-4"
                  placeholder="Your Name*"
                />
              </div>
              <div className="pt-6">
                <input
                  type="text"
                  className="form-control mt-4"
                  placeholder="yourname@website.com*"
                />
              </div>
              <div className="pt-6">
                <input
                  type="text"
                  className="form-control mt-4"
                  placeholder="Phone Number*"
                />
              </div>
              <div className="pt-6">
                <textarea
                  className="form-control mt-4"
                  placeholder="Share as much as you can including cost, dimension, images"
                ></textarea>
              </div>
              <div className="pt-6">
                <input
                  type="file"
                  className="form-control mt-4"
                  placeholder="Phone Number*"
                />
              </div>
              <div className="pt-6">
                <input
                  type="button"
                  className="btn btn-primary mt-4"
                  value="Submit"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="jss2 jssb4">
        <div className="text-center">
          <h2 style={{ marginTop: "20px" }}>Benefits of listing</h2>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="pt-6">
                <div className="col-pb">
                  <i class="fas fa-users mb-3"></i>
                  <h4>Reach new Customers at no cost</h4>
                  <p>
                    WebTallas works as your free sales team by letting thousands
                    of advertisers know about your media.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="pt-6">
                <div className="col-pb">
                  <i class="bx bx-image mb-3"></i>
                  <h4>Advertisers can find & book your media easily</h4>
                  <p>
                    We present your media to advertisers in a way that is easy
                    to use, evaluate and buy thereby increasing bookings.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="pt-6">
                <div className="col-pb">
                  <i class="bx bx-list-ul mb-3"></i>
                  <h4>Ease of Promotion</h4>
                  <p>
                    Whether you want to run a promotion or tell advertisers
                    about your increased reach, Media Ant can help you share
                    news to a large number of advertisers in a short span.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="pt-6">
                <div className="col-pb">
                  <i class="bx bx-world mb-3"></i>
                  <h4>Get recommended</h4>
                  <p>
                    Based on relevance, your media gets recommended to
                    advertisers even if they have not searched for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HowtoList
