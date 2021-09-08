import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Header from "../Header"
import Footer from "../Footer"

import BG from "../../assets/front-assets/images/privacy_policy.png"
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
                  Privacy Policy
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
                          Privacy Policy
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
          <h2 className="mb-5 text-center">Privacy Policy</h2>
          <p>
            <p>
              Protecting your private information is our priority. This
              Statement of Privacy applies to webtalla.com. For the purposes of
              this Privacy Policy, unless otherwise noted, all references to Web
              Talla . The Web Talla website is an Outdoor Media Sales site. By
              using the Web Talla website, you consent to the data practices
              described in this statement.
            </p>
            <h4>Collection of your Personal Information</h4>
            <p>
              We do not collect any personal information about you unless you
              voluntarily provide it to us. However, you may be required to
              provide certain personal information to us when you elect to use
              certain products or services available on the Site. These may
              include: (a) registering for an account on our Site; (b) entering
              a sweepstakes or contest sponsored by us or one of our partners;
              (c) signing up for special offers from selected third parties; (d)
              sending us an email message; (e) submitting your credit card or
              other payment information when ordering and purchasing products
              and services on our Site. To wit, we will use your information
              for, but not limited to, communicating with you in relation to
              services and/or products you have requested from us. We also may
              gather additional personal or non-personal information in the
              future.
            </p>
            <h4>Sharing Information with Third Parties</h4>
            <p>
              Web Talla does not sell, rent or lease its customer lists to third
              parties. Web Talla may share data with trusted partners to help
              perform statistical analysis, send you email or postal mail,
              provide customer support, or arrange for deliveries. All such
              third parties are prohibited from using your personal information
              except to provide these services to Web Talla , and they are
              required to maintain the confidentiality of your information. Web
              Talla may disclose your personal information, without notice, if
              required to do so by law or in the good faith belief that such
              action is necessary to: (a) conform to the edicts of the law or
              comply with legal process served on Web Talla or the site; (b)
              protect and defend the rights or property of Web Talla; and/or (c)
              act under exigent circumstances to protect the personal safety of
              users of Web Talla , or the public.
            </p>
            <h4>Tracking User Behavior</h4>
            <p>
              Web Talla may keep track of the websites and pages our users visit
              within Web Talla , in order to determine what Web Talla services
              are the most popular. This data is used to deliver customized
              content and advertising within Web Talla to customers whose
              behaviour indicates that they are interested in a particular
              subject area.
            </p>
            <h4>Automatically Collected Information</h4>
            <p>
              Information about your computer hardware and software may be
              automatically collected by Web Talla . This information can
              include: your IP address, browser type, domain. This information
              is used for the operation of the service, to maintain the quality
              of the service, and to provide general statistics regarding use of
              the Web Talla website.
            </p>
            <h4>Use of Cookies</h4>
            <p>
              The Web Talla website may use “cookies” to help you personalize
              your online experience. A cookie is a text file that is placed on
              your hard disk by a web page server. Cookies cannot be used to run
              programs or deliver viruses to your computer. Cookies are uniquely
              assigned to you, and can only be read by a web server in the
              domain that issued the cookie to you. One of the primary purposes
              of cookies is to provide a convenience feature to save you time.
              The purpose of a cookie is to tell the Web server that you have
              returned to a specific page. For example, if you personalize Web
              Talla pages, or register with Web Talla site or services, a cookie
              helps Web Talla to recall your specific information on subsequent
              visits. This simplifies the process of recording your personal
              information, such as billing addresses, shipping addresses, and so
              on. When you return to the same Web Talla website, the information
              you previously provided can be retrieved, so you can easily use
              the Web Talla features that you customized.
            </p>
            <p>
              You have the ability to accept or decline cookies. Most Web
              browsers automatically accept cookies, but you can usually modify
              your browser setting to decline cookies if you prefer. If you
              choose to decline cookies, you may not be able to fully experience
              the interactive features of the Web Talla services or websites you
              visit.
            </p>
            <h4>Security of your Personal Information</h4>
            <p>
              Web Talla secures your personal information from unauthorized
              access, use, or disclosure. Web Talla uses the following methods
              for this purpose: When personal information (such as a credit card
              number) is transmitted to other websites, it is protected through
              the use of encryption, such as the Secure Sockets Layer (SSL)
              protocol. We strive to take appropriate security measures to
              protect against unauthorized access to or alteration of your
              personal information. Unfortunately, no data transmission over the
              Internet or any wireless network can be guaranteed to be 100%
              secure. As a result, while we strive to protect your personal
              information, you acknowledge that: (a) there are security and
              privacy limitations inherent to the Internet which are beyond our
              control; and (b) security, integrity, and privacy of any and all
              information and data exchanged between you and us through this
              Site cannot be guaranteed.
            </p>
            <h4>Children Under Thirteen</h4>
            <p>
              Web Talla does not knowingly collect personally identifiable
              information from children under the age of thirteen. If you are
              under the age of thirteen, you must ask your parent or guardian
              for permission to use this website.
            </p>
            <h4>E-mail Communications</h4>
            <p>
              From time to time, Web Talla may contact you via email for the
              purpose of providing announcements, promotional offers, alerts,
              confirmations, surveys, and/or other general communication. If you
              would like to stop receiving marketing or promotional
              communications via email from Web Talla , you may opt out of such
              communications by clicking on the UNSUBSCRIBE button.
            </p>
            <h4>Changes to this Statement</h4>
            <p>
              Web Talla reserves the right to change this Privacy Policy from
              time to time. We will notify you about significant changes in the
              way we treat personal information by sending a notice to the
              primary email address specified in your account, by placing a
              prominent notice on our site, and/or by updating any privacy
              information on this page. Your continued use of the Site and/or
              Services available through this Site after such modifications will
              constitute your: (a) acknowledgment of the modified Privacy
              Policy; and (b) agreement to abide and be bound by that Policy.
            </p>
            <h4>Contact Information</h4>
            <p>
              Web Talla welcomes your questions or comments regarding this
              Statement of Privacy. If you believe that Web Talla has not
              adhered to this Statement, please contact Web Talla at:
              <a href="mailto:info@webtalla.com">info@webtalla.com</a>
            </p>
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Cancellation
