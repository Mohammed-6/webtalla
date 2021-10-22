import React, { useState, useEffect } from "react"
import { Link, Redirect, useLocation, withRouter } from "react-router-dom"
import { Country, State, City } from "country-state-city"

import axios from "axios"
const create = axios.create()

import Banner1 from "../../../assets/front-assets/images/banner-ads.jpg"

const EditCustomer = props => {
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
  const [confirm, setConfirm] = useState(false)

  const [profilesrc, setProfilesrc] = useState(Banner1)

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
    setCountry(e.target.value)
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
  const changeConfirm = e => {
    setConfirm(!confirm)
  }

  const changeProfile = e => {
    setProfilesrc(URL.createObjectURL(e.target.files[0]))
    const formData = new FormData()
    formData.append("profile", e.target.files[0])
    create
      .post(
        process.env.REACT_APP_BASEURL +
          "basic/changeprofile?access_token=" +
          props.match.params.id,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then(res => {
        console.log(res)
      })
  }
  useEffect(() => {
    create
      .get(
        process.env.REACT_APP_BASEURL +
          "login/verify_user_access?access_token=" +
          props.match.params.id
      )
      .then(res => {
        setTitle(res.data.title)
        setFirstname(res.data.first_name)
        setLastname(res.data.last_name)
        setAddress(res.data.address)
        setBrandname(res.data.brand_name)
        setCountry(res.data.country)
        setEmail(res.data.email)
        setPhone(res.data.phone)
        if (res.data.profile_picture !== "") {
          setProfilesrc(
            process.env.REACT_APP_BASEURL +
              "assets/images/user-profile/" +
              res.data.profile_picture
          )
        }
        console.log(res)
      })
  }, [])
  const createAnAccount = e => {
    const formData = new FormData()
    formData.append("title", title)
    formData.append("last_name", lastname)
    formData.append("address", address)
    formData.append("brand_name", brandname)
    formData.append("country", country)
    formData.append("phone", phone)
    formData.append("password", password)

    // if (password !== "") {
    //   if (password !== confirmpass) {
    //     alert("Both password does not match!")
    //     return false
    //   } else if (password < 8) {
    //     alert("Password must be at least 8 characters!")
    //     return false
    //   }
    // } else {
    create
      .post(
        process.env.REACT_APP_BASEURL +
          "/login/updateaccount?access_token=" +
          props.match.params.id,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then(res => {
        console.log(res)
        alert("Account updated successfully")
      })
    // }
  }
  return (
    <>
      <div className="page-content">
        <div className="container pt-5">
          <div className="row">
            <div className="offset-md-2 col-md-8">
              <div className="row">
                <div className="col-md-4">
                  <img
                    class="rounded-circle avatar-xl pprofile"
                    alt="Skote"
                    src={profilesrc}
                  />
                  <label htmlFor="myInput" className="profile-edit">
                    <i className="fas fa-pencil-alt">
                      <input
                        id="myInput"
                        type="file"
                        onChange={changeProfile}
                        style={{ display: "none" }}
                      />
                    </i>
                  </label>
                </div>
                <div className="col-md-8">
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-md-2">
                        <div className="form-group">
                          <label for="title" className="">
                            Title
                          </label>
                          <select
                            className="form-control"
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
                            First Name
                          </label>
                          <input
                            name="firstname"
                            id="firstname"
                            type="text"
                            className="form-control"
                            value={firstname}
                            onChange={changeFirstname}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="form-group">
                          <label for="lastname" className="">
                            Last Name
                          </label>
                          <input
                            name="lastname"
                            id="lastname"
                            type="text"
                            className="form-control"
                            value={lastname}
                            onChange={changeLastname}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 mt-3">
                      <div className="form-group">
                        <label for="address" className="">
                          Address
                        </label>
                        <input
                          name="address"
                          id="address"
                          type="text"
                          className="form-control"
                          value={address}
                          onChange={changeAddress}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="form-group">
                        <label for="brandname" className="">
                          Brand Name
                        </label>
                        <input
                          name="brandname"
                          id="brandname"
                          type="text"
                          className="form-control"
                          value={brandname}
                          onChange={changeBrandname}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="title" className="">
                        Country
                      </label>
                      <select
                        className="form-control"
                        id="title"
                        value={country}
                        onChange={changeCountry}
                      >
                        <option></option>
                        {Country.getAllCountries().map(cnt => {
                          let sel = ""
                          if (cnt.name === "Nigeria") {
                            sel = "selected"
                          }
                          return (
                            <option selected={sel} value={cnt.name}>
                              {cnt.name}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="form-group mt-3">
                      <label for="email" className="">
                        Email
                      </label>
                      <input
                        placeholder="Enter email"
                        id="email"
                        type="email"
                        className="form-control form-control"
                        value={email}
                        onChange={changeEmail}
                        readonly
                        disabled
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label for="phone" className="">
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="phone"
                        className="form-control form-control"
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
                            Password
                          </label>
                          <input
                            name="password"
                            id="password"
                            type={confirm ? "text" : "password"}
                            className="form-control"
                            value={password}
                            onChange={changePassword}
                          />
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="form-group">
                          <label for="confirm" className="">
                            Confirm
                          </label>
                          <input
                            name="confirm"
                            id="confirm"
                            type={confirm ? "text" : "password"}
                            className="form-control"
                            value={confirmpass}
                            onChange={changeConfirmpass}
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="confirm-password">
                          {confirm ? (
                            <i
                              className="fas fa-eye-slash"
                              onClick={changeConfirm}
                            ></i>
                          ) : (
                            <i
                              className="fas fa-eye"
                              onClick={changeConfirm}
                            ></i>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 d-grid">
                      <button
                        className="btn btn-primary btn-block"
                        type="button"
                        onClick={createAnAccount}
                      >
                        UPDATE ACCOUNT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditCustomer
