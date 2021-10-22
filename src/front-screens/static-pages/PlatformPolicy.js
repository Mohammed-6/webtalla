import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Header from "../Header"
import Footer from "../Footer"

import BG from "../../assets/front-assets/images/term_condition.png"
const PlatformPolicy = props => {
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
                  Platform Policy
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
                          Platform Policy
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
      <div className="cancellation-page">
        <div className="container">
          <h2 className="mb-5 text-center">
            WebTalla PROGRAMMATIC PLATFORM POLICIES
          </h2>
          <p align="justify">
            <p>
              In order to maintain a secure and fair advertising market, all
              users of WebTalla ’s advertising platforms and services must abide
              by the following policies. Those that fail to do so may have their
              accounts suspended or revoked at WebTalla’s sole discretion.
            </p>
            <h4>APPROPRIATE USE</h4>
            <p>
              The Services may only be used for the purpose of buying or selling
              advertising inventory in good faith. All transactions handled
              through the Services must be settled in full through the
              mechanisms provided by the Services. Opaque auction practices such
              as bid caching, bid shading, bid trawling etc. are forbidden.
            </p>
            <h4>SECURITY</h4>
            <p>
              In order to maintain the security of the Services users shall not:
              <div style={{ paddingLeft: "1.5em" }}>
                • share their passwords or API keys or other system access
                credentials with others, <br />• upload unnecessary confidential
                information to the Services, <br />• upload untested code to the
                Services, <br />• attempt to break, disable, overwhelm or
                otherwise damage the Services or invite others to do so
              </div>
            </p>
            <h4>INVENTORY</h4>
            <p>
              All inventory and screens offered through the system must:
              <div style={{ paddingLeft: "1.5em" }}>
                • be legally allowed to be sold by the Publisher, <br />• be in
                clear, unobstructed view of the audience, <br />• have accurate
                and current meta data including but not limited to:
                <div style={{ paddingLeft: "1.5em" }}>
                  o impression count, <br />o audience composition, <br />
                  o location, o venue type, <br />o resolution, <br />o aspect
                  ratio, <br />o allowed ad formats, <br />o pricing
                </div>
                <br />• maintain up to date operating systems, player versions,
                security credentials and network protocols All advertising
                opportunities offered for sale through the system must: •
                accurately represent the opportunities to play an ad on the
                screen in question at the time offered, <br />• be within the
                opening hours of the venue in question
              </div>
            </p>
            <h4>CONTENT</h4>
            <p>
              Inventory sellers (Publishers) reserve the right to accept or
              reject advertising content at their sole discretion. Publishers
              shall make reasonable efforts to review advertising content
              submitted to them in a timely manner and shall not alter the
              advertising content in any way. The Services must not be used for
              trafficking ads that:
              <div style={{ paddingLeft: "1.5em" }}>
                • misrepresent the goods or services on offer, <br />• infringe
                on another party’s copyright or trademark, <br />• violate the
                laws of the jurisdiction in which the screen is located, <br />•
                contain abusive messaging, <br />• advocate or depict:
                <div style={{ paddingLeft: "1.5em" }}>
                  o pornographic imagery <br />o violence against humans or
                  animals, o advocacy against a protected group,
                </div>
                <br />• contain malicious software or code, <br />• target an
                individual private citizen
              </div>
            </p>
            <h4>DATA</h4>
            <p>
              No personally identifiable information shall be used for the
              purpose of targeting, tracking, attribution or otherwise within
              the Services. All data collection, storage and sharing must be
              compliant with the General Data Protection Regulation (GDPR) and
              the relevant legislation in the jurisdiction of the screens in
              question.
            </p>
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PlatformPolicy
