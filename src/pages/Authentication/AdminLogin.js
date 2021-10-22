import React, { Component } from "react"
import PropTypes from "prop-types"

import { Alert, Card, CardBody, Col, Container, Row } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"

//Social Media Imports
import { GoogleLogin } from "react-google-login"
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"

//Import config
import { facebook, google } from "../../config"

// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation"

// actions
import { apiError, loginUser, socialLogin } from "../../store/actions"

// import images
import profile from "../../assets/images/profile-img.png"
import logo from "../../assets/images/logo.svg"
import lightlogo from "../../assets/images/logo-light.svg"
import axios from "axios"
const create = axios.create()

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      loading: false,
    }

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this)
    this.logmeIn = this.logmeIn.bind(this)
  }

  // handleValidSubmit
  handleValidSubmit(event, values) {
    this.props.loginUser(values, this.props.history)
  }

  componentDidMount() {
    this.props.apiError("")
  }

  signIn = (res, type) => {
    const { socialLogin } = this.props
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      }
      socialLogin(postData, this.props.history, type)
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      }
      socialLogin(postData, this.props.history, type)
    }
  }

  //handleGoogleLoginResponse
  googleResponse = response => {
    this.signIn(response, "google")
  }

  //handleTwitterLoginResponse
  twitterResponse = () => {}

  //handleFacebookLoginResponse
  facebookResponse = response => {
    this.signIn(response, "facebook")
  }

  logmeIn() {
    this.setState({ loading: true })
    const formData = new FormData()
    formData.append("email", this.state.email)
    formData.append("password", this.state.password)

    create
      .post(process.env.REACT_APP_BASEURL + "/login/adminlogin", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(res => {
        if (res.data !== 0) {
          localStorage.setItem("adminLogin", true)
          localStorage.setItem("adminToken", res.data.access_token)
          localStorage.setItem("auser_name", res.data.user_name)
          this.props.history.push("/dashboard")
          this.setState({ loading: false })
        } else {
          alert("Wrong email or password")
          this.setState({ loading: false })
        }
        // console.log(res)
      })
  }

  render() {
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="bx bx-home h2" />
          </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-primary bg-soft">
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary">Welcome!</h5>
                          <p>Sign in to continue to WebTalla.</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profile} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div className="auth-logo">
                      <Link to="/" className="auth-logo-light">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={lightlogo}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                      <Link to="/" className="auth-logo-dark">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logo}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      <AvForm
                        className="form-horizontal"
                        onValidSubmit={this.logmeIn}
                      >
                        {this.props.error && this.props.error ? (
                          <Alert color="danger">{this.props.error}</Alert>
                        ) : null}

                        <div className="mb-3">
                          <AvField
                            name="email"
                            label="Email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            required
                            onKeyUp={e =>
                              this.setState({ email: e.target.value })
                            }
                          />
                        </div>

                        <div className="mb-3">
                          <AvField
                            name="password"
                            label="Password"
                            type="password"
                            required
                            placeholder="Enter Password"
                            onKeyUp={e =>
                              this.setState({ password: e.target.value })
                            }
                          />
                        </div>

                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customControlInline"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customControlInline"
                          >
                            Remember me
                          </label>
                        </div>

                        <div className="mt-3 d-grid">
                          {this.state.loading === false ? (
                            <button
                              className="btn btn-primary btn-block"
                              type="submit"
                            >
                              Log In
                            </button>
                          ) : (
                            ""
                          )}
                          {this.state.loading ? (
                            <div
                              className="spinner-border text-primary text-center m-1"
                              role="status"
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </AvForm>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    © {new Date().getFullYear()} WebTalla. Crafted with{" "}
                    <i className="mdi mdi-heart text-danger" /> by Sasaran
                    Technologies
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

Login.propTypes = {
  apiError: PropTypes.any,
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func,
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError, socialLogin })(Login)
)
