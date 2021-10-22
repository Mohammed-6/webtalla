import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Header from "../Header"
import Footer from "../Footer"

import BG from "../../assets/front-assets/images/term_condition.png"
const TermsCondition = props => {
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
                  Terms and Conditions
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
                          Terms and Conditions
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
          <h2 className="mb-5 text-center">Terms & Conditions</h2>
          <p align="justify">
            <h4>Cancellation</h4>
            <p>
              Welcome to https://www.WebTalla.com (“WebTalla/ Site”). These are
              the terms and conditions leading your use of the Website (“herein
              after referred to as Acceptable Use Policy “AUP”). By accessing
              WebTalla either through the website or any other electronic
              device, you acknowledge, accept and agree to the following terms
              and conditions of the Acceptable Use Policy (AUP), which are
              intended to make sure that WebTalla works for everyone. This AUP
              is helpful from the time you log in to WebTalla. By accepting this
              Terms and Conditions, you are also accepting and agreeing to be
              bound by the Privacy Policy and the FAQ.
            </p>
            <h4>Accessing WebTalla.com:</h4>
            <p>
              You (User) understand and agree that www.WebTalla.com is an
              internet enabled electronic platform that facilitates
              communication for the purposes of Outdoor advertising and
              distributing information pertaining to radio, television,
              newspaper, magazine, billboards and/ or Out of home services. You
              further understand and agree that we do not endorse, market or
              promote any of the Outdoor Media listings, postings or
              information, nor do we at any point in time come into possession
              of or engage in the sharing of any of the Out of home advertising
              and/ or services, you have posted your Ad-Space Boards, listed or
              provided information about on our site. While interacting with
              other users on our site, with respect to any Media listing,
              posting or information we strongly support you to exercise
              sensible diligence as you would in traditional off line channels
              and practice judgment and common sense before committing to or
              complete intended Enquiry, sale, purchase of any Ad-Space media or
              services or exchange of information. We recommend that you read
              our Privacy Policy before doing any activity on our site.
              <br />
              <br />
              While making use of WebTalla and other services such as the
              discussion forums, comments and feedback and other services
              interalia, you will post in the fitting category or area and you
              agree that your use of the Website Site shall be strictly governed
              by this AUP including the Privacy policy for listing of your
              outdoor advertising inventory which shall not violate the
              prohibited and restricted items policy (herein after referred to
              as the Privacy Policy.) (Privacy Policy) The Privacy policy shall
              be read as part of this AUP and is included in this AUP by way of
              location:
              <br />
              <br />” Your Information” is defined as any information you
              provide to us or other users of the Site during the registration,
              posting, listing or replying process of Outdoor advertising, in
              the feedback area (if any), through the Direct Messages, Blog or
              in the course of using any other feature of the Services. You
              agree that you are the lawful owner having all rights, title and
              interest in your information, and further agree that you are
              solely accountable and responsible for Your Information and that
              we act as a mere platform for your online distribution and
              publication of Your Information.
            </p>
            <h4>
              You agree that your Outdoor Media listing, posting and / or
              Enquiry Information:
            </h4>
            <p>
              <div style={{ paddingLeft: "1.5em" }}>
                • Shall “not be fraudulent, misrepresent, mislead or pertain to
                the sale of any illegal, counterfeit, other’s Boards,
                Third-party or stolen boards and / or services <br />• shall not
                breach any intellectual property, trade secret, or other
                proprietary right or rights of Advertising Media or privacy of
                any third party. <br />• shall not breach any intellectual
                property, trade secret, or other proprietary right or rights of
                Advertising Media or privacy of any third party. <br />• shall
                not consist of Outdoor Ads that is an expression of bigotry,
                racism or hatred based on age, sex, race, caste, class,
                religion, lifestyle preference, and nationality and / or is in
                the nature of being derogatory, slanderous to any third party.{" "}
                <br />• shall not be obscene, have pornography or hold
                “offensive representation of women” within the meaning of the
                Indecent Representation of Women (Prohibition) Act <br />• shall
                not allocate or contain spam, multiple / chain letters, or
                pyramid schemes in any of its forms. <br />• shall not issue
                viruses or any other technologies that may harm WebTalla users
                or impose an unreasonable load on the infrastructure or
                interfere with the proper working of www.WebTalla.com. <br />•
                Shall not, indirectly or directly, attempt, offer, to offer,
                trade or attempt to trade in any boards and services, the
                dealing of which is prohibited or controlled in any manner under
                the provisions of any applicable law, rule, regulation or
                principle for the time being in force. <br />• shall not be
                placed in an incorrect category or in an wrong area of the site.{" "}
                <br />• shall not be placed in any other www.WebTalla.com site
                except on the site that relates to the city in which you are
                located. <br />• shall not list or post or be valid to
                information that is either barred or restricted under the laws
                of the Nigeria and such posting, boards ad Space online booking,
                media listing, or information shall not violate www.WebTalla.com
                Privacy Policy. <br />• You approval to accept communications by
                call or email by such other mode of communication, electronic or
                otherwise related to the advertising services provided through
                the website. <br />• Customer or Client Enquiry of Media related
                services is only for Enquiry about outdoor advertising media
                cost, availability and more, the enquiry is not a actual booking
                of Ad- Space, by the conformation by our sales team, board owner
                booking conformation is mail which is actual booking of outdoor
                advertising boards ad space. <br />• During booking of outdoor
                media, All sites are subject to availability at the time of
                booking. • Our site will shows only the cost of the AD- Space ,
                Vnyl or flex and artwork cost not included in that display
                amount. • Duration of the campaign and the Outdoor Campaign will
                be start from your conformation day. <br />• During the display
                period, if the flex or Vynl torn off, damaged, theft occurred,
                we have no responsibility. Additional flex have to be supplied
                by you.
              </div>
              You agree that your listing, posting and / or Information: if you
              use the Site by registering on the Our WebTalla.com web site, you
              are sole responsible for maintaining the secrecy of your Login
              User ID, Password, email address and for restricting access to
              your computer, computer network and your www.WebTalla.com account,
              and you are liable for all activities that occur under your User
              ID and password. If you contact our Site using any electronic tool
              other than by registration on the Site, the AUP remains applicable
              to you in the same manner as if you are a registered user on the
              Site.
            </p>
            <h4>WebTalla Inventory Content:</h4>
            <p>
              WebTalla.com website contains content which includes Your
              Information, WebTalla’s information and in turn from other users.
              You agree not to distribute, modify, copy, or such content (other
              than Your Personal or Inventory Information), WebTalla’s
              copyrights or trademarks. When you give us any information as part
              of Your content, you are granting us a irrevocable, perpetual,
              worldwide, non-exclusive, royalty-free, sub-licensable right and
              license to use, reproduce, publish, translate, distribute, perform
              and display such content (in whole or part) worldwide through the
              Site as well as on any of our affiliates or partners websites and
              sub domains, publications and mobile platform. We need these
              rights with respect to the information in your content in order to
              host and show your content. If you believe that there is a breach,
              check our Privacy Policy and Click on DMCA copy right Icon at the
              footer of WebTalla Home page.
            </p>
            <p>
              We reserve the right to delete any such content where we have
              grounds for suspecting the destruction of these terms and our
              Privacy Policy or of any party’s rights., please notify us by
              clicking here support@WebTalla.com
            </p>
            <h4>Liability Conditions:</h4>
            <p>
              You agree not to hold www.WebTalla.com or any of its agencies,
              employees, officers, Clients responsible or responsible for any of
              your media listing, review postings or information and nor shall
              we, our team, employees or agencies be liable for any misuse,
              illegal activity or third party content as most Media listings or
              information are generated by different users directly and we do
              not have any role in the formation, publication or distribution of
              the posting, ad listing or information, nor are we in a place to
              have editorial manage over the material or content contained in
              the postings, information or Outdoor advertising boards, Media
              listings save and except to the extent provided in Privacy Policy.
            </p>
            <p>
              You understand and have the same opinion that we do not assurance
              the accuracy or authority of any Outdoor advertising boards
              information, Media listing, posting and information by other
              users. You further agree that WebTalla not liable for any loss of
              reputation, money, goodwill or any special, indirect, or important
              damages arising out of your use of the website or as a result of
              any booking, sale, purchase of Outdoor Advertising services and
              online booking services with other users of the site. We also
              cannot promise continuous or secure access to our Services.
              Therefore, to the extent legally acceptable we exclude all implied
              warranties, of merchantability, board structure fitness or quality
              of the Site and our services.
            </p>
            <h4>User’s Violation:</h4>
            <p>
              You agree that in the incident of your Outdoor advertising board
              information, media listing, Booking, Buying, posting or your
              information violates any provision of this AUP or the Terms and
              Privacy policy; we shall have the right to terminate and or
              suspend your membership of this website and refuse to provide you
              or any person acting on your behalf, access to the Site.
            </p>
            <p>
              WebTalla is an advertising company servicing the Hoardings,
              digital ad & Billboard ads marketplace, translating the
              traditional Hoarding advertising world into data-driven solutions,
              powered by the leading outdoor advertising platform.
            </p>
            <h4>Outdoor Advertising by Formats:</h4>
            <p>
              Drive growth by finding ideal outdoor media placements catered
              directly to your brand’s audience. Select outdoor advertising
              media options in Nigeria:
              <div style={{ paddingLeft: "1.5em" }}>
                1. Hoarding Advertising: Hoardings are the large billboards
                placed at strategic places facing huge traffic in this city.
                Unipole ads also giving maximum visibility for mass targeting 2.
                Bus Shelter Advertising: Number of bus stops are placed in this
                city where a large number of people gather waiting for buses. 3.
                Road Median Advertising: Road Medians are small sized lighting
                boards placed on the dividers between the main roads. 4. Pole
                Kiosk Advertising: Most of the main roads having pole kiosks on
                the poles between and beside the roads. It’s having two side
                visibilities. 5. Bus / Train / Cab / Auto Advertising: Bus
                Advertising, Train Advertising, Cab Advertising and Auto
                Advertising are treated as Transit Advertising or Moving Outdoor
                Media. 6. Airport Advertising: Airport Advertising is the finest
                way to reach high class valuable customers. 7. Mall Advertising:
                Mall advertising is advertising displays that are placed inside
                shopping malls 8. Metro Pillar Advertising: Metro train covering
                many parts of the tier 1 cities. 9. Radio & Television
                Advertising: Radio & TV station program wise advertisement
              </div>
            </p>
            <p>
              Outdoor Advertising Online Booking Terms & Conditions:
              <div style={{ paddingLeft: "1.5em" }}>
                1. All Booking Dates will be Shown as Per Availability! 2.
                “BOOKING COST“: will be shown for 30 (Days), in weeks 4(weeks) ,
                in months 1(month). 3. Tax Applicable Extra on Booking Cost. 4.
                Online Payment Gateway allows Payment after “CHECK AVAILABILITY”
                Conformation of Booking by The Board Owner! 5. To Add Your Media
                Plan Please Click on “ADD TO MEDIA PLAN” then Login To Share
                Your Media Plan! 6. In Case Booked Ad Space is Not Available As
                Per Requirements Amount will be Refunded within 3 Days from The
                Date of Invoice Generation! 7. No Cancellation will Acceptable
                after 6 days Following the Invoice Generation!
              </div>
            </p>
            <p>
              Ad Space Online Buying Terms :
              <br />
              <div style={{ paddingLeft: "1.5em" }}>
                • <b>Availability:</b> All Sites are subject to availability at
                the time of confirmation by Publishing house/ Owner <br />
                •&nbsp;&nbsp;&nbsp;
                <b>Campaign Duration:</b> Above Hoarding Board Cost allows for
                booking 30 Days (4 Weeks) Campaign Duration only <br />
                •&nbsp;&nbsp;&nbsp;
                <b>Hoarding Design and Artwork:</b> Hoarding Design Creative
                Artwork, Vinyl Flex will be supplied by Client only <br />
                •&nbsp;&nbsp;&nbsp;
                <b>Damage in Display:</b> During the display period, if the flex
                torn off, damaged, a theft occurred, we have no responsibility.
                Additional Vinyl, flex has to be supplied by the client. <br />
                •&nbsp;&nbsp;&nbsp;
                <b>Campaign Starts from :</b> The campaign will start from your
                confirmation as per your booking slot. <br />
                •&nbsp;&nbsp;&nbsp;
                <b>Additional Charges:</b> Vinyl Flex Printing & Mounting
                Charges Extra and Tax Extra
              </div>
            </p>
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TermsCondition
