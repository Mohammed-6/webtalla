import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Header from "../Header"
import Footer from "../Footer"

import About1 from "../../assets/front-assets/images/about1.png"
import About2 from "../../assets/front-assets/images/about2.png"
import About3 from "../../assets/front-assets/images/about3.png"
import About4 from "../../assets/front-assets/images/about4.png"
import About5 from "../../assets/front-assets/images/about5.png"
import About6 from "../../assets/front-assets/images/about6.png"

import BG from "../../assets/front-assets/images/about_us.png"
const AboutUs = props => {
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
                <h4 class="mb-1 font-size-18 text-center text-white">About</h4>
                <div class="page-title-right">
                  <nav class="">
                    <ol class="breadcrumb m-0 justify-content-center">
                      <li class="breadcrumb-item">
                        <Link to="/" className="text-white">
                          Home
                        </Link>
                      </li>
                      <li class="active breadcrumb-item" aria-current="page">
                        <Link to="/about-us" className="text-white">
                          About Us
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
      <div className="container pt-4 pb-5">
        <div className="row">
          <h2>
            ARE YOU LOOKING FOR A ONE-STOP FOR VARIOUS FORMS OF ADVERTISING?
          </h2>
          <div className="col-md-6">
            <img src={About1} className="pt-4" />
          </div>
          <div className="col-md-6 d-table">
            <div className="abt-valg">
              <p>
                If the answer to the question above is Yes, then you have landed
                on the right website.
              </p>
              <p>
                Web Talla is here to take care of your advertising priorities
                for you, with you. Sit within the comfort of your office and
                select all your advertising options at a click of button.
              </p>
            </div>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-md-6">
            <h2>WHO WE ARE?</h2>
            <div className="abt-valg">
              <p>
                We are a Nigeria-based tech-enabled omnichannel advertising
                online marketplace with satellite offices across the major
                cities.
              </p>
              <p>
                We at Web Talla take pride in our work and have dedicated
                ourselves to planning, designing, and handling advertising
                opportunities for our clients.
              </p>
              <p>
                All the specialized advertising service options are just a click
                away and available through a single platform. Working closely
                with the client our platform provides them the freedom to
                explore the best options for their ad placements within their
                budget. The client ads are placed at strategic locations across
                advertising mediums ensuring accurate brand exposure both at
                local and national levels.
              </p>
              <p>
                We specialize in innovative programmatic advertising solutions
                for publishing advertising campaigns tailored to our clients'
                needs. We integrate the advertising channels across mediums
                starting from traditional options to digital marketing, to
                outdoor advertising, to publications, to television and radio to
                get you maximum coverage.
              </p>
            </div>
          </div>
          <div className="col-md-6 d-table">
            <img src={About2} className="pt-4 w-100" />
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-md-6">
            <h2>WHY WORK WITH US?</h2>
            <img src={About3} className="pt-4 w-100" />
          </div>
          <div className="col-md-6 d-table">
            {" "}
            <div className="abt-valg">
              <p>
                We specialize in creating an affordable, easily accessible
                multi-channel advertising online marketplace tailored to our
                clients' needs.
              </p>
              <p>
                We have a large network of strategic partners across Nigeria to
                have robust support in all areas. We have tied up with all
                leading local and national media houses.
              </p>
              <p>
                Our team comes with fresh and innovative ideas backed with
                decades of experience in advertising.
              </p>
              <p>
                We ensure to provide solutions keeping up with all the latest
                advertising trends including Artificial Intelligence and Machine
                Learning.
              </p>
            </div>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-md-6 d-table">
            <div className="abt-valg">
              <h2>MISSION</h2>
              <p>
                Be the top choice, one-stop-shop omnichannel advertising agency.
              </p>
              <p>
                To be up-to-date with the latest marketing and advertising
                trends to serve our clients to the best of their vision and our
                efficiencies.
              </p>
              <p>
                To excel in providing a wide range of advertising inventory at
                an affordable cost.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="abt-valg">
              <img src={About4} className="pt-4 w-100" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <h2>VISION</h2>
            <img src={About5} className="pt-4" />
          </div>
          <div className="col-md-6 d-table">
            <div className="abt-valg">
              <p>
                Our vision is to become a global omnichannel advertising online
                marketplace to assist our clients in achieving their marketing
                goals and get maximum exposure. We see ourselves walking with
                them step-by-step delivering their vision to the best of our
                abilities.
              </p>
            </div>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-md-6 d-table">
            <div className="abt-valg">
              <h2>CORE VALUES</h2>
              <p>
                <b>Excellence:</b> Always ready to go that extra mile to deliver
                superior quality, versatile solutions.
              </p>
              <p>
                <b>Perseverance:</b> Never say “No” and persevere to make the
                impossible possible.
              </p>
              <p>
                <b>Partnership:</b> Follow the client’s vision as our own and
                build long-term relationships.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="abt-valg">
              <img src={About6} className="pt-4 w-100" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutUs
