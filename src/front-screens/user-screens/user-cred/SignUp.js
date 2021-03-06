import React, { useState, useEffect } from "react"
import { Country, State, City } from "country-state-city"
import ReCAPTCHA from "react-google-recaptcha"

import axios from "axios"
const create = axios.create()

// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation"

const SignUp = props => {
  // register hooks
  const [title, setTitle] = useState("Mr")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [address, setAddress] = useState("")
  const [brandname, setBrandname] = useState("")
  const [country, setCountry] = useState("Nigeria")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpass, setConfirmpass] = useState("")
  const [captchastatus, setCaptchastatus] = useState(false)
  const [captchainput, setCaptchainput] = useState("")
  const [captcha, setCaptcha] = useState("")
  const [captchaimage, setCaptchaimage] = useState("")
  const [verificationcode, setVerificationcode] = useState("")
  const [confirm, setConfirm] = useState(false)
  const [submitstatus, setSubmitstatus] = useState(false)

  const [singlebtn, setSinglebtn] = useState(false)

  const changeTitle = e => {
    setTitle(e.target.value)
  }
  const changeFirstname = e => {
    setFirstname(e.target.value)
  }
  const changeLastname = e => {
    setLastname(e.target.value)
  }
  const changeAddress = e => {
    setAddress(e.target.value)
  }
  const changeBrandname = e => {
    setBrandname(e.target.value)
  }
  const changeCountry = e => {
    const tt = e.target.value
    const splt = tt.split(",")

    setCountry(tt)
    setPhone(splt[1])
  }
  const changeEmail = e => {
    setEmail(e.target.value)
  }
  const changePhone = e => {
    setPhone(e.target.value)
  }
  const changePassword = e => {
    setPassword(e.target.value)
  }
  const changeConfirmpass = e => {
    setConfirmpass(e.target.value)
  }
  const changeVerificationCode = e => {
    setVerificationcode(e.target.value)
  }
  const changeCaptcha = e => {
    if (e.target.value === captcha && captchaimage !== "") {
      if (phone !== "") {
        create
          .post(
            process.env.REACT_APP_BASEURL +
              "/login/generateSms?code=" +
              e.target.value +
              "&phone=" +
              phone
          )
          .then(res => {
            if (res.data == "error") {
              alert("Phone number is invalid")
              reloadCaptcha()
              e.target.value = ""
            } else {
              setCaptchastatus(true)
              setSubmitstatus(true)
              setCaptchaimage("")
            }
          })
      }
    }
  }
  const changeConfirm = e => {
    setConfirm(!confirm)
  }
  useEffect(() => {
    create
      .post(process.env.REACT_APP_BASEURL + "/login/captchaGenerator")
      .then(res => {
        setCaptchaimage(
          process.env.REACT_APP_BASEURL +
            "assets/images/captcha_images/" +
            res.data.filename
        )
        setCaptcha(res.data.word)
      })
  }, [])
  const createAnAccount = e => {
    const tt = country
    const splt = tt.split(",")

    const formData = new FormData()
    formData.append("title", title)
    formData.append("first_name", firstname)
    formData.append("last_name", lastname)
    formData.append("address", address)
    formData.append("brand_name", brandname)
    formData.append("country", splt[0])
    formData.append("phone", phone)
    formData.append("login_email", email)
    formData.append("password", password)
    formData.append("captcha", captcha)
    formData.append("verify", verificationcode)

    if (captchastatus === false) {
      alert("Captcha does not match")
      return
    }
    if (password !== confirmpass) {
      alert("Both password does not match!")
    } else {
      create
        .post(
          process.env.REACT_APP_BASEURL + "/login/createaccount",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then(res => {
          if (res.data === "otpwrong") {
            alert("Please enter correct otp.")
          } else if (res.data === "exists") {
            alert("User Email already exists.")
          } else if (res.data.status === "sms") {
            alert("Please enter OTP to confirm your mobile number")
          } else if (res.data.status === "success") {
            alert("You have registered successfully.")
            props.credModalHide()
          } else {
            console.log(res)
          }
        })
    }
  }

  //forgetpassword
  const changeForgetPasswordEmail = e => {
    setForgetpasswordemail(e.target.value)
  }

  const submitForgetpass = e => {
    const formData = new FormData()
    formData.append("email", forgetpasswordemail)

    create
      .post(process.env.REACT_APP_BASEURL + "/login/forgetpass", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(res => {
        if (res.data !== 0) {
          props.credModalHide()
          alert("Please check your mail to change password")
        } else {
          alert("Email address does not exists")
        }
        console.log(res)
      })
  }
  const captchaChange = value => {
    console.log("Captcha value:", value)
  }
  const reloadCaptcha = () => {
    create
      .post(process.env.REACT_APP_BASEURL + "/login/captchaGenerator")
      .then(res => {
        setCaptchaimage(
          process.env.REACT_APP_BASEURL +
            "assets/images/captcha_images/" +
            res.data.filename
        )
        setCaptcha(res.data.word)
      })
  }
  return (
    <>
      <AvForm onValidSubmit={createAnAccount}>
        <div class="p-2">
          <div className="mb-3">
            <div className="row">
              <div className="col-md-2">
                <div className="form-group">
                  <label for="title" className="">
                    Title
                  </label>
                  <select
                    className="form-control m-0"
                    id="title"
                    value={title}
                    onChange={changeTitle}
                  >
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                  </select>
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-group">
                  <label for="firstname" className="">
                    First Name<span className="text-danger">*</span>
                  </label>
                  <AvField
                    name="firstname"
                    id="firstname"
                    type="text"
                    className="form-control"
                    required
                    value={firstname}
                    onChange={changeFirstname}
                  />
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-group">
                  <label for="lastname" className="">
                    Last Name<span className="text-danger">*</span>
                  </label>
                  <AvField
                    name="lastname"
                    id="lastname"
                    type="text"
                    className="form-control"
                    required
                    value={lastname}
                    onChange={changeLastname}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3 mt-3">
              <div className="form-group">
                <label for="address" className="">
                  Address<span className="text-danger">*</span>
                </label>
                <AvField
                  name="address"
                  id="address"
                  type="text"
                  className="form-control"
                  required
                  value={address}
                  onChange={changeAddress}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="form-group">
                <label for="brandname" className="">
                  Brand Name<span className="text-danger">*</span>
                </label>
                <AvField
                  name="brandname"
                  id="brandname"
                  type="text"
                  className="form-control"
                  required
                  value={brandname}
                  onChange={changeBrandname}
                />
              </div>
            </div>
            <div className="form-group">
              <label for="title" className="">
                Country<span className="text-danger">*</span>
              </label>
              <select
                className="form-control"
                required
                id="title"
                value={country}
                onChange={changeCountry}
              >
                {Country.getAllCountries().map(cnt => {
                  let sel = ""
                  if (cnt.name === "Nigeria") {
                    sel = "selected"
                  }
                  return (
                    <option
                      selected={sel}
                      value={cnt.name + "," + cnt.phonecode}
                    >
                      {cnt.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="form-group mt-3">
              <label for="email" className="">
                Email<span className="text-danger">*</span>
              </label>
              <AvField
                placeholder="Enter email"
                id="email"
                type="email"
                name="email"
                className="form-control form-control"
                required
                value={email}
                onChange={changeEmail}
              />
            </div>
            <div className="form-group mt-3">
              <label for="phone" className="">
                Phone<span className="text-danger">*</span>
              </label>
              <AvField
                id="phone"
                type="phone"
                name="phone"
                className="form-control form-control"
                required
                value={phone}
                onChange={changePhone}
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="row">
              <div className="col-md-5">
                <div className="form-group">
                  <label for="password" className="">
                    Password<span className="text-danger">*</span>
                  </label>
                  <AvField
                    name="password"
                    id="password"
                    name="password"
                    type={confirm ? "text" : "password"}
                    className="form-control"
                    required
                    value={password}
                    onChange={changePassword}
                  />
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-group">
                  <label for="confirm" className="">
                    Confirm<span className="text-danger">*</span>
                  </label>
                  <AvField
                    name="confirm"
                    id="confirm"
                    name="conpassword"
                    type={confirm ? "text" : "password"}
                    className="form-control"
                    required
                    value={confirmpass}
                    onChange={changeConfirmpass}
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="confirm-password">
                  {confirm ? (
                    <i className="fas fa-eye-slash" onClick={changeConfirm}></i>
                  ) : (
                    <i className="fas fa-eye" onClick={changeConfirm}></i>
                  )}
                </div>
              </div>
            </div>
          </div>
          {submitstatus ? (
            <div className="mb-3">
              <div className="form-group">
                <label for="verify" className="">
                  Enter verification code
                  <span className="text-danger">*</span>
                </label>
                <AvField
                  id="verify"
                  type="text"
                  name="verify"
                  className="form-control"
                  onChange={changeVerificationCode}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          {!captchastatus ? (
            <>
              <div className="text-center">
                <img src={captchaimage} />
                &nbsp;
                <a onClick={reloadCaptcha}>
                  <i className="fas fa-redo"></i>
                </a>
              </div>
              <div className="mb-3">
                <div className="form-group">
                  <label for="verify" className="">
                    Enter captcha
                    <span className="text-danger"></span>
                  </label>
                  <AvField
                    id="captcha"
                    type="text"
                    name="captcha"
                    className="form-control"
                    onKeyUp={changeCaptcha}
                  />
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          <div className="mt-4 d-grid">
            <button className="btn btn-primary btn-block" type="submit">
              CREATE AN ACCOUNT
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="mb-0">
              By registering you agree to the WebTalla
              <a className="text-primary" href="/terms-condition">
                Terms of Use
              </a>
            </p>
          </div>
        </div>
      </AvForm>
    </>
  )
}

export default SignUp
