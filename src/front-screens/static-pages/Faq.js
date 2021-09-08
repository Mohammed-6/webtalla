import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Faqr from "react-faq-component"

const Faq = props => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    nav: true,
    slidesToShow: 4,
    slidesToScroll: 1,
  }
  const faqData = {
    rows: [
      {
        title: "What does Web Talla do?",
        content: `Web Talla is an Advertising buying platform that provides a wide range of advertising options to choose from based on your advertising plans and budget.`,
      },
      {
        title: "What services do you provide?",
        content: `Web Tallas’ services range from traditional advertising options of television, radio, newspapers, and other publications to digitally-enabled outdoor advertising, ads on digital mediums, social media, influencer marketing, and many more.`,
      },
      {
        title: "How to avail of your services?",
        content: `Its extremely simple. Click and purchase.
            <ul>
            <li>Browse to the ‘Our Services’ section on our website.</li>
            <li>Scroll through the tech-edge advertising options mentioned under each advertising medium. </li>
            <li>Make your selection</li>
            <li>Make the payment and the advertising option is booked.</li>
            </ul>`,
      },
      {
        title: "What is the proof of the ad performance?",
        content: `Web Tallas’ provides detailed big data analytics of the ad performance; if they have been hired to do so. The cost of data analytics is over and above the ad placement charges.`,
      },
      {
        title: "Will I be able to view the history of my previous purchases?",
        content: `Yes. All the details will be available in the account that you create on the portal.`,
      },
      {
        title: "Will I require help to make a purchase at the platform?",
        content: `Absolutely not. The platform is very intuitive, and everything is placed in a self-serviceable manner. But just in case if you still need any help, we are always there to assist you.`,
      },
    ],
  }

  const styles = {
    // bgColor: 'white',
    titleTextColor: "black",
    rowTitleColor: "black",
    // rowContentColor: 'grey',
    // arrowColor: "red",
  }

  const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
  }
  return (
    <>
      <div className="faq-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="faqs pb-5">
                    <span className="faq-heading">FAQS</span>
                    <h2 className="pt-2 pb-5">MOST ASKED QUESTIONS</h2>
                    <Faqr data={faqData} styles={styles} config={config} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="contact-section">
                <div className="contact-form">
                  <form>
                    <h2>DISCUSS OPTIONS & PRICING</h2>
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="cf_fname"
                          className="form-control con-form-control"
                          aria-required="true"
                          placeholder="Your First Name"
                        ></input>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="cf_fname"
                          className="form-control con-form-control"
                          aria-required="true"
                          placeholder="Your Last Name"
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="cf_fname"
                          className="form-control con-form-control"
                          aria-required="true"
                          placeholder="Phone number"
                        ></input>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="cf_fname"
                          className="form-control con-form-control"
                          aria-required="true"
                          placeholder="Business Email"
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Budget Range</label>
                        <select className="form-control">
                          <option value=""></option>
                          <option value="$10,000 - $25,000">
                            $10,000 - $25,000
                          </option>
                          <option value="$25,000 - $50,000">
                            $25,000 - $50,000
                          </option>
                          <option value="$50,000 - $75,000">
                            $50,000 - $75,000
                          </option>
                          <option value="$75,000 - $100,000">
                            $75,000 - $100,000
                          </option>
                          <option value="$100000 - $500,000">
                            $100000 - $500,000
                          </option>
                          <option value="$500,000 - $1,000,000">
                            $500,000 - $1,000,000
                          </option>
                          <option value="$1,000,000 - $2,500,000">
                            $1,000,000 - $2,500,000
                          </option>
                          <option value="$2,500,000 - $10,000,000">
                            $2,500,000 - $10,000,000
                          </option>
                          <option value="$10,000,000+">$10,000,000+</option>
                          <option value="Budget TBD">Budget TBD</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="cf_fname"
                          className="form-control con-form-control"
                          aria-required="true"
                          placeholder="List Your Market(s) of Interest"
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <label>Select Media Type(s) of Interest</label>
                        <div className="row">
                          <div className="col-md-4">
                            <div class="form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="cnt1"
                              />
                              <label class="form-check-label" for="cnt1">
                                Airports
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div class="form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="cnt2"
                              />
                              <label class="form-check-label" for="cnt2">
                                Digital Outdoor
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div class="form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="cnt3"
                              />
                              <label class="form-check-label" for="cnt3">
                                Subway
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div class="form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="cnt4"
                              />
                              <label class="form-check-label" for="cnt4">
                                Billboards
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div class="form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="cnt5"
                              />
                              <label class="form-check-label" for="cnt5">
                                Malls
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div class="form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="cnt6"
                              />
                              <label class="form-check-label" for="cnt6">
                                Taxi Tops
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div class="form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="cnt7"
                              />
                              <label class="form-check-label" for="cnt7">
                                Buses
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div class="form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="cnt8"
                              />
                              <label class="form-check-label" for="cnt8">
                                Mobile Trucks
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div class="form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="cnt9"
                              />
                              <label class="form-check-label" for="cnt9">
                                Taxi Interiors
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div class="form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="cnt10"
                              />
                              <label class="form-check-label" for="cnt10">
                                Bus Shelters
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div class="form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="cnt11"
                              />
                              <label class="form-check-label" for="cnt11">
                                Rail & Train
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <label>What are your Campaign Goals?</label>
                        <div className="row">
                          <div className="col-md-4">
                            <div class="form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="cnt1"
                              />
                              <label class="form-check-label" for="cnt1">
                                Branding
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div class="form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="cnt2"
                              />
                              <label class="form-check-label" for="cnt2">
                                Website Visits
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div class="form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="cnt3"
                              />
                              <label class="form-check-label" for="cnt3">
                                Other
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div class="form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="cnt4"
                              />
                              <label class="form-check-label" for="cnt4">
                                Direct Response
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div class="form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="cnt5"
                              />
                              <label class="form-check-label" for="cnt5">
                                All of the Above
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <label>Campaign</label>
                        <select className="form-control">
                          <option value="">Please Select</option>
                          <option value="new">New Campaign</option>
                          <option value="existing">Existing Campaign</option>
                        </select>
                      </div>
                    </div>
                    <div className="text-center">
                      <input
                        type="submit"
                        value="Submit"
                        className="wpcf7-form-control wpcf7-submit submit-btn"
                      ></input>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Faq
