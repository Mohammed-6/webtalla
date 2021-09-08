import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Header from "../Header"
import Footer from "../Footer"

import BG from "../../assets/front-assets/images/cancellation_refund.png"
const Cancellation = props => {
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
                  Cancellation
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
                          Cancellation
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
          <h2 className="mb-5 text-center">Cancellation & Refund</h2>
          <p>
            <h4>Cancellation</h4>
            <p>
              Web Talla shall reserve the exclusive right to cancel any content
              whatsoever from being published or reflected on its website or in
              any other mode. The refunded amount would be returned within a
              period of 15-20 working days with 5% deduction.
            </p>
            <h4>Cancellation Policy and Procedures</h4>
            <p>
              This will be purely an offline cancellation process and depends on
              whether the ad request is already processed/ forwarded to the
              corresponding newspaper for publishing or not.
              <br />
              <br />
              For assured cancellation, user needs to send a written
              communication to the customer care team along with requesting
              cancellation of the advertisement. The request should be made
              within 48 hours from date of booking. Cancellation Charges (5%).
              <br />
              <br />
              Justified and accepted complaints entitle advertisers to a maximum
              refund of the amount equivalent to the value of disputed and
              unpublished ads.
            </p>
            <h4>Request Raised within 48 hour</h4>
            <p>
              <div style={{ paddingLeft: "1.5em" }}>
                o Ad is cancelled (Cancellation Charges Apply) <br />o Ad is
                cancelled if not scheduled (Charges Apply)
              </div>
            </p>
            <h4>Ad Cancelled after 48 hours</h4>
            <p>
              <div style={{ paddingLeft: "1.5em" }}>
                o Incase Ad is scheduled by publisher no cancellation will be
                done. However, an effort is made to stop it from being published
                (Depends on publisher)
              </div>
            </p>
            <h4>Add Missed by a Newspaper</h4>
            <p>
              <div style={{ paddingLeft: "1.5em" }}>
                o Full amount refunded on request <br />o Rescheduling is
                allowed
              </div>
            </p>
            <h4>
              Request for rescheduling/ Change of Ad text/adding more
              publication
            </h4>
            <p>
              <div style={{ paddingLeft: "1.5em" }}>
                o Allowed if not scheduled already <br />o No Charges apply{" "}
                <br />
                o Fresh dates will depend upon available <br />o For extra
                amount online invoice will be sent. User will have to pay the
                extra amount if at all required
              </div>
            </p>
            <h4>Documents not received on time</h4>
            <p>
              <div style={{ paddingLeft: "1.5em" }}>
                o Ad will not be published <br />o For cancellation request
                cancellation charges will apply Text not accepted by any
                newspaper <br />o Fresh Schedule can be done <br />o For
                cancellation charges apply
              </div>
            </p>
            <h4>Duplicate Ad/Payment</h4>
            <p>
              <div style={{ paddingLeft: "1.5em" }}>
                o Cancellation charges will NOT apply Modifications to Terms and
                Conditions Web Talla in its sole discretion shall reserve the
                right to modify the Terms & Conditions any time and without
                prior notice to its users/advertisers, and edit, modify and
                alter the content of the advertisement.
              </div>
            </p>
            <h4>Rescheduling Advertisement</h4>
            <p>
              Web Talla reserves the right to decline, change or reschedule any
              advertisement/listing notwithstanding earlier acceptance.
            </p>
            <h4>Refusal of Service</h4>
            <p>
              If Web Talla, in its sole discretion, determines that a violation
              of the Terms & Conditions has occurred, we are entitled to pursue
              legal remedies, including but not limited to the cancellation of
              the user's account and/or the exclusion of any person(s) who may
              have violated any of the Terms & Conditions. In sum, Web Talla
              reserves the right to refuse service to anyone at any time, and to
              remove any listings or any advertisements for any reason, without
              prior notice.
            </p>
            <h4>Applicable Taxes and Costs</h4>
            <p>
              User understands and agrees that he/she is responsible for all
              applicable taxes and costs which are incurred as a result of Web
              Talla’s service. We may also, in our sole discretion, add or
              delete fees associated with the service.
            </p>
            <h4>Disclaimer of Warranties</h4>
            <p>
              User agrees that benefits of the service will be enjoyed at
              his/her sole risk. The service is provided on an "as is" and on an
              "as available" basis. Web Talla expressly refuses to acknowledge
              warranties of any kind; whether express or implied, including, but
              not limited to the implied warranties of merchantability, fitness
              for a particular purpose and non- infringement.
            </p>
            <h4>No Warranty of Service</h4>
            <p>
              Web Talla makes no warranty that the service will completely
              fulfill user's requirements, that the service will be
              uninterrupted, timely, secure, or error free; nor does Web Talla
              make any warranty as to the results that may be obtained from the
              use of the service or as to the accuracy or reliability of any
              information obtained from the service.
            </p>
            <h4>Governing Law</h4>
            <p>
              These Terms & Conditions and the relationship between User and Web
              Talla shall be governed by the laws of Nigeria, without regard to
              its conflict of law provisions. User and Web Talla agree to submit
              to the personal and exclusive jurisdiction of the courts located
              within the Nigeria.
            </p>
            <h4>Filing of Claim</h4>
            <p>
              User agrees that regardless of any statute or law to the contrary,
              any claim regarding Web Tala’s services need to be made within 15
              days.
            </p>
            <h4>Acceptance of Advertisements</h4>
            <p>
              Web Tala is accepting the advertisements only on behalf of the
              publications featured on the site. It is in no way responsible for
              any delay by the publications to discharge any of their
              obligations towards the users.
            </p>
            <h4>Reporting Violations of Terms and Conditions</h4>
            <p>
              Please help us keep the Web Talla site an enjoyable experience for
              all Users. If users observe materials or behavior that may violate
              or are in violation of Web Talla Terms & Conditions, they are
              requested to contact Web Talla at support@webtalla.com to inform
              us accordingly.
            </p>
            <h4>Acknowledgement and Acceptance of Terms and Conditions</h4>
            <p>
              The terms and conditions appearing here consist of the entire
              agreement between the Party/User (as defined above) and the
              Company (as defined above).
            </p>
            <h4>Personal Services</h4>
            <p>
              Advertisements are accepted in good faith but Web Talla does not
              accept responsibility for their veracity, delay, error, omission
              in publication, shrinkage in production, compliance with all
              relevant laws, etc. The advertiser and/or publisher will
              compensate Web Talla for any action or claim brought by any third
              party arising directly or indirectly from publication or non
              publication of an advertisement including but not limited to
              infringement of any law/statutory requirement etc.
            </p>
            <h4>Payment Terms</h4>
            <p>
              <div style={{ paddingLeft: "1.5em" }}>
                o All payments are required to be confirmed with us, 3 days
                before final publication. <br />o Overdue accounts will be
                subject to a service charge of 2% per month. <br />o All
                disputes need to be resolved under jurisdiction of Nigerian
                court.
              </div>
            </p>
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Cancellation
