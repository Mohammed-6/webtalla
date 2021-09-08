import React, { useState, useEffect } from "react"

import axios from "axios"
const create = axios.create()

// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation"
const ForgetPassword = props => {
  // forget password
  const [forgetpasswordemail, setForgetpasswordemail] = useState("")

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
  return (
    <>
      <div class="p-2">
        <div
          class="text-center mb-4 alert alert-success fade show"
          role="alert"
        >
          Enter your Email and instructions will be sent to you!
        </div>
        <AvForm onValidSubmit={submitForgetpass}>
          <div class="form-group">
            <div class="form-group">
              <label for="fpemail" class="">
                Email
              </label>
              <AvField
                name="email"
                placeholder="Enter email"
                type="email"
                id="fpemail"
                class="form-control"
                value={forgetpasswordemail}
                onChange={changeForgetPasswordEmail}
                required
              />
            </div>
          </div>
          <div class="text-end mt-2">
            <button class="btn btn-primary w-md" type="submit">
              Reset
            </button>
          </div>
        </AvForm>
      </div>
    </>
  )
}

export default ForgetPassword
