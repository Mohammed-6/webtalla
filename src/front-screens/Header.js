import React, { useState, useEffect } from "react"
import { Modal } from "reactstrap"
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login"
import axios from "axios"
const create = axios.create()
import { Link, Redirect, useLocation, withRouter } from "react-router-dom"

// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation"

// console.log(Country.getAllCountries())

import Logo from "../assets/front-assets/images/logo.png"

import ForgetPassword from "./user-screens/user-cred/ForgetPassword"
import SignUp from "./user-screens/user-cred/SignUp"

const Header = props => {
  const [modal_standard, setModalStandard] = useState(false)
  const [axiosvertical, setAxiosvertical] = useState([])
  const [currentmenu, setcurrentmenu] = useState("/")

  const [authtype, setAuthtype] = useState("login")

  //login
  const [loginemail, setLoginemail] = useState("")
  const [loginpassword, setLoginpassword] = useState("")

  //login
  const changeLoginEmail = e => {
    setLoginemail(e.target.value)
  }
  const changeLoginPassword = e => {
    setLoginpassword(e.target.value)
  }

  const submitLogin = e => {
    const formData = new FormData()
    formData.append("email", loginemail)
    formData.append("password", loginpassword)

    create
      .post(process.env.REACT_APP_BASEURL + "/login/userlogin", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(res => {
        if (res.data !== 0 && res.data !== 2) {
          setModalStandard(false)
          localStorage.setItem("token", res.data.access_token)
          localStorage.setItem("user_name", res.data.user_name)
          localStorage.setItem("isLogin", "yes")
          props.history.push("/our-services")
        } else if (res.data === 2) {
          alert("Please verify you mail address! try again later.")
        } else {
          alert("Wrong email or password")
        }
        // console.log(res)
      })
  }

  let location = useLocation()

  const tog_standard = () => {
    setModalStandard(true)
  }
  useEffect(() => {
    if (window.opener && window.opener !== window) {
      const code = getCodeFromWindowURL(window.location.href)
      window.opener.postMessage({ type: "code", code: code }, "*")
      window.close()
    }
    window.addEventListener("message", handlePostMessage)

    window.scrollTo(0, 0)
    if (location.pathname == "/") {
      setcurrentmenu("/")
    } else if (location.pathname == "/partners") {
      setcurrentmenu("partners")
    } else if (location.pathname == "/clients") {
      setcurrentmenu("clients")
    } else if (location.pathname == "/career") {
      setcurrentmenu("career")
    } else if (location.pathname == "/contact") {
      setcurrentmenu("contact")
    }
  }, [])
  const handlePostMessage = event => {
    if (event.data.type === "code") {
      const { code } = event.data
      getUserCredentials(code)
    }
  }
  const getCodeFromWindowURL = url => {
    const popupWindowURL = new URL(url)
    return popupWindowURL.searchParams.get("code")
  }
  const getUserCredentials = code => {
    create
      .get(
        process.env.REACT_APP_BASEURL + "login/login_linkedin?code=" + code,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(res => {
        if (res.data.status === "success") {
          setModalStandard(false)
          localStorage.setItem("token", res.data.access_token)
          localStorage.setItem("user_name", res.data.user_name)
          localStorage.setItem("isLogin", "yes")
          props.history.push("/our-services")
          // return <Redirect to="/our-services" />
          funRedirect()
        }
        console.log(res)
        // Do something with user
      })
  }
  const funRedirect = () => {
    return <Redirect to="/our-services" />
  }
  const googleLogin = code => {
    const formData = new FormData()
    formData.append("code", JSON.stringify(code))
    create
      .post(process.env.REACT_APP_BASEURL + "login/login_google", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => {
        if (res.data.status === "success") {
          setModalStandard(false)
          localStorage.setItem("token", res.data.access_token)
          localStorage.setItem("user_name", res.data.user_name)
          localStorage.setItem("isLogin", "yes")
          props.history.push("/our-services")
        }
        // console.log(res)
        // Do something with user
      })
  }
  const facebookLogin = code => {
    const formData = new FormData()
    formData.append("code", JSON.stringify(code))
    create
      .post(process.env.REACT_APP_BASEURL + "login/login_facebook", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => {
        if (res.data.status === "success") {
          setModalStandard(false)
          localStorage.setItem("token", res.data.access_token)
          localStorage.setItem("user_name", res.data.user_name)
          localStorage.setItem("isLogin", "yes")
          props.history.push("/our-services")
        }
        // console.log(res)
        // Do something with user
      })
  }
  const showPopup = () => {
    const oauthUrl =
      `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=774ocr8hcx8kbo&scope=r_liteprofile%20r_emailaddress&state=123456&redirect_uri=` +
      process.env.REACT_APP_CLIENTURL
    const width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2
    window.open(
      oauthUrl,
      "Linkedin",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    )
  }
  const cleanUrl = url => {
    return url.replace(/\s+/g, "-").toLowerCase()
  }
  const clickRegsiter = () => {
    setAuthtype("register")
  }
  const clickLogin = () => {
    setAuthtype("login")
  }
  const forgetPassword = () => {
    setAuthtype("forget")
  }
  const credModalHide = () => {
    setModalStandard(false)
    setAuthtype("login")
  }
  return (
    <>
      <Modal isOpen={modal_standard} toggle={tog_standard}>
        <div className="bg-primary bg-soft">
          <div className="row">
            <div className="col-7 col">
              <div className="text-primary p-4">
                <h5 className="text-primary">Welcome!</h5>
                <p>
                  {authtype === "login"
                    ? "Sign in to continue to WebTalla."
                    : authtype === "register"
                    ? "Sign up to WebTalla"
                    : authtype === "forget"
                    ? "Forgot your password"
                    : ""}
                </p>
              </div>
            </div>
            <div className="col-5 align-self-end col">
              <span
                className="btn-close login-modal-close"
                onClick={() => setModalStandard(!modal_standard)}
                aria-label="Close"
              ></span>
            </div>
          </div>
        </div>
        <div className="modal-body">
          <div className="auth-logo">
            <a className="auth-logo-light" href="/">
              <div className="avatar-md profile-user-wid mb-4">
                <span className="avatar-title rounded-circle bg-light">
                  <img
                    src={Logo}
                    alt=""
                    className="rounded-circle"
                    height="34"
                  />
                </span>
              </div>
            </a>
            <a className="auth-logo-dark" href="/">
              <div className="avatar-md profile-user-wid mb-4">
                <span className="avatar-title rounded-circle bg-light">
                  <img
                    src={Logo}
                    alt=""
                    className="rounded-circle"
                    height="34"
                  />
                </span>
              </div>
            </a>
          </div>
          {authtype === "login" ? (
            <>
              <AvForm onValidSubmit={submitLogin}>
                <div className="p-2">
                  <div className="mb-3">
                    <div className="form-group">
                      <label for="email" className="">
                        Email
                      </label>
                      <AvField
                        name="email"
                        placeholder="Enter email"
                        required
                        id="email"
                        type="text"
                        onChange={changeLoginEmail}
                        className="form-control form-control"
                        value={loginemail}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-group">
                      <label for="password" className="">
                        Password
                      </label>
                      <AvField
                        name="password"
                        required
                        placeholder="Enter password"
                        id="password"
                        type="password"
                        onChange={changeLoginPassword}
                        className="form-control"
                        value={loginpassword}
                      />
                    </div>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="customControlInline"
                    />
                    <label
                      className="form-check-label"
                      for="customControlInline"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="mt-3 d-grid">
                    <button
                      className="btn btn-primary btn-block"
                      // onClick={submitLogin}
                      type="submit"
                    >
                      Log In
                    </button>
                  </div>
                </div>
              </AvForm>
              <p className="text-center">
                Don't have an account ?{" "}
                <a className="fw-medium text-primary" onClick={clickRegsiter}>
                  {" "}
                  Signup now{" "}
                </a>{" "}
              </p>
            </>
          ) : authtype === "register" ? (
            <>
              <SignUp credModalHide={credModalHide} />
            </>
          ) : authtype === "forget" ? (
            <>
              <ForgetPassword credModalHide={credModalHide} />

              <p className="text-center">
                Go back to{" "}
                <a class="fw-medium text-primary" onClick={clickLogin}>
                  Login
                </a>{" "}
              </p>
            </>
          ) : (
            ""
          )}
          {authtype === "login" || authtype === "register" ? (
            <>
              <div className="mt-4 text-center">
                <h5 className="font-size-14 mb-3">
                  {authtype === "login"
                    ? "Sign in"
                    : authtype === "register"
                    ? "Sign up"
                    : ""}{" "}
                  using
                </h5>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <LoginSocialFacebook
                      appId={"1724253694283387"}
                      onResolve={({ data }) => {
                        facebookLogin(JSON.stringify(data))
                      }}
                      onReject={err => alert(err)}
                    >
                      <a
                        className="social-list-item bg-primary text-white border-primary"
                        href="#"
                      >
                        <i className="mdi mdi-facebook"></i>
                      </a>
                    </LoginSocialFacebook>
                  </li>{" "}
                  <li className="list-inline-item">
                    <LoginSocialGoogle
                      client_id={
                        "745176847630-sspgkju61o2ejknq0dqci0htem9mk4a1.apps.googleusercontent.com"
                      }
                      onResolve={({ data }) => {
                        console.log(JSON.stringify(data))
                        googleLogin(data)
                      }}
                      onReject={err => console.log(err)}
                    >
                      <a
                        className="social-list-item bg-info text-white border-info"
                        href="#"
                      >
                        <i className="mdi mdi-google"></i>
                      </a>
                    </LoginSocialGoogle>
                  </li>{" "}
                  <li className="list-inline-item">
                    <a
                      onClick={showPopup}
                      className="social-list-item bg-primary text-white border-primary"
                      href="#"
                    >
                      <i className="mdi mdi-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            ""
          )}
          {authtype === "login" ? (
            <div className="mt-4 text-center">
              <a className="text-muted" onClick={forgetPassword}>
                <i className="mdi mdi-lock me-1"></i> Forgot your password?
              </a>
            </div>
          ) : authtype === "register" ? (
            <p className="text-center">
              Already have an account ?
              <a class="fw-medium text-primary" onClick={clickLogin}>
                Login
              </a>
            </p>
          ) : null}
        </div>
      </Modal>
      <div className="header header-transparent">
        <div className="navbar-container">
          <nav className="navbar nav-custom navbar-expand-lg">
            <div className="container-fluid nav-custom-container">
              <div className="responsive-mobile-menu">
                <div className="logo-wrapper">
                  <Link to="/" className="logo">
                    <img
                      className="def"
                      src={Logo}
                      alt="Outmedia"
                      height="70"
                    />
                    <img className="alt" src={Logo} alt="Outmedia" />
                  </Link>
                </div>
                <button
                  className="navbar-toggler cross-menu"
                  type="button"
                  data-toggle="collapse"
                  data-target="#bizcoxx_main_menu"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="cross-menu-wrapper">
                    <span className="bar1"></span>
                    <span className="bar2"></span>
                    <span className="bar3"></span>
                  </span>
                </button>
              </div>
              <div id="bizcoxx_main_menu" className="collapse navbar-collapse">
                <ul id="main-menu" className="navbar-nav main-menu">
                  <li
                    id="menu-item-471"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-195 current_page_item menu-item-471 nav-item active"
                  >
                    <Link to="/" className="nav-link active">
                      Home
                    </Link>
                  </li>
                  <li
                    id="menu-item-190"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-190 nav-item"
                  >
                    <Link to="/about-us" className="nav-link">
                      About Us
                    </Link>
                  </li>
                  <li
                    id="menu-item-190"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-190 nav-item"
                  >
                    <Link to="/services" className="nav-link">
                      Services
                    </Link>
                  </li>
                  <li
                    id="menu-item-190"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-190 nav-item"
                  >
                    <Link to="/partners" className="nav-link">
                      Agency Partner
                    </Link>
                  </li>
                  <li
                    id="menu-item-190"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-190 nav-item"
                  >
                    <Link to="/clients" className="nav-link">
                      Our Clients
                    </Link>
                  </li>
                  <li
                    id="menu-item-190"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-190 nav-item"
                  >
                    <Link to="/career" className="nav-link">
                      Careers
                    </Link>
                  </li>
                  <li
                    id="menu-item-190"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-190 nav-item"
                  >
                    <Link to="/contact" className="nav-link">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="nav-right-content">
                <div className="icon-part">
                  <ul className="social_link">
                    <li>
                      <a title="" href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a title="" href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                    <li>
                      <a title="" href="#">
                        <i className="fab fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                  <ul className="cart-icon">
                    <li className="cart">
                      <Link
                        to="/cart"
                        className="cart-contents"
                        title="View your
                        shopping cart"
                      >
                        <i className="bx bx-shopping-bag"></i>
                        <sup>{localStorage.getItem("cartCount")}</sup>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="btn-wrapper">
                  {localStorage.getItem("isLogin") === null ? (
                    <a className="boxed-btn blank" onClick={tog_standard}>
                      Sign Up / Login
                    </a>
                  ) : (
                    <Link to="/profile" className="boxed-btn blank">
                      {localStorage.getItem("user_name")}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default withRouter(Header)
