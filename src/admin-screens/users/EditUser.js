import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap"
import Dropzone from "react-dropzone"
import { Link, withRouter } from "react-router-dom"

import axios from "axios"
const create = axios.create()

import toastr from "toastr"
import "toastr/build/toastr.min.css"

import Breadcrumbs from "../../components/Common/Breadcrumb"
const EditUser = props => {
  const [usertype, setusertype] = useState("")
  const [designation, setdesignation] = useState("")
  const [profile, setprofile] = useState("")
  const [firstname, setfirstname] = useState("")
  const [lastname, setlastname] = useState("")
  const [email, setemail] = useState()
  const [birthday, setbirthday] = useState("")
  const [address, setaddress] = useState("")
  const [zipcode, setzipcode] = useState("")
  const [city, setcity] = useState("")
  const [password, setpassword] = useState("")
  const [edit, setedit] = useState("")
  const [active, setactive] = useState("")

  const changeusertype = e => {
    setusertype(e.target.value)
  }
  const changedesignation = e => {
    setdesignation(e.target.value)
  }
  const changeprofile = e => {
    setprofile(e.target.files[0])
  }
  const changefirstname = e => {
    setfirstname(e.target.value)
  }
  const changelastname = e => {
    setlastname(e.target.value)
  }
  const changeemail = e => {
    setemail(e.target.value)
  }
  const changebirthday = e => {
    setbirthday(e.target.value)
  }
  const changeaddress = e => {
    setaddress(e.target.value)
  }
  const changezipcode = e => {
    setzipcode(e.target.value)
  }
  const changecity = e => {
    setcity(e.target.value)
  }
  const changepassword = e => {
    setpassword(e.target.value)
  }
  const changeactive = e => {
    setactive(e.target.value)
  }
  useEffect(() => {
    create
      .post(
        process.env.REACT_APP_BASEURL +
          "user/index?access_token=" +
          localStorage.getItem("adminToken") +
          "&id=" +
          props.match.params.id
      )
      .then(res => {
        console.log(res)
        setusertype(res.data.data.user_type)
        setdesignation(res.data.data.designation)
        setprofile(res.data.data.profile)
        setfirstname(res.data.data.firstname)
        setlastname(res.data.data.lastname)
        setemail(res.data.data.email)
        setbirthday(res.data.data.birthday)
        setaddress(res.data.data.address)
        setzipcode(res.data.data.zipcode)
        setcity(res.data.data.city)
        setactive(res.data.data.is_active)
        setedit(res.data.data.user)
      })
  }, [])
  const createUser = () => {
    const formData = new FormData()
    formData.append("usertype", usertype)
    formData.append("designation", designation)
    formData.append("firstname", firstname)
    formData.append("lastname", lastname)
    formData.append("email", email)
    formData.append("birthday", birthday)
    formData.append("address", address)
    formData.append("zipcode", zipcode)
    formData.append("city", city)
    formData.append("password", password)
    formData.append("profile", profile)
    formData.append("is_active", active)
    formData.append("edit", edit)

    create
      .post(
        process.env.REACT_APP_BASEURL +
          "user/update_user?access_token=" +
          localStorage.getItem("adminToken"),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(res => {
        console.log(res)
        showToast()
        props.history.push("/admin/users")
      })
  }
  const showToast = () => {
    var toastType
    var title = ""
    var message = "Profile updated successfully."
    toastr.options = {
      positionClass: "toast-top-right",
      timeOut: 5000,
      extendedTimeOut: 1000,
      closeButton: false,
      debug: false,
      progressBar: false,
      preventDuplicates: false,
      newestOnTop: true,
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
      showDuration: 300,
      hideDuration: 1000,
    }

    // setTimeout(() => toastr.success(`Settings updated `), 300)
    //Toaster Types
    if (toastType === "info") toastr.info(message, title)
    else if (toastType === "warning") toastr.warning(message, title)
    else if (toastType === "error") toastr.error(message, title)
    else toastr.success(message, title)
  }
  return (
    <>
      <div className="page-content">
        <MetaTags>
          <title>Edit Users</title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs title="Users" breadcrumbItem="Edit Users" />
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">Edit User</div>
                  <div className="row">
                    <div className="col-md-6">
                      <div class="col-sm-auto mb-3">
                        <label class="">User Type</label>
                        <select
                          class="form-select form-control"
                          onChange={changeusertype}
                          value={usertype}
                        >
                          <option value="">Choose...</option>
                          <option value="1">Admin</option>
                          <option value="2">User</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Designation</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={changedesignation}
                          defaultValue={designation}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">First Name</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={changefirstname}
                          defaultValue={firstname}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Last Name</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={changelastname}
                          defaultValue={lastname}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Email</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={changeemail}
                          defaultValue={email}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Birthday</label>
                        <input
                          type="date"
                          class="form-control form-control"
                          onChange={changebirthday}
                          defaultValue={birthday}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Previous Picture</label>
                        <br />
                        <img
                          class="rounded-circle avatar-sm"
                          src={
                            process.env.REACT_APP_BASEURL +
                            "assets/images/user-profiles/" +
                            profile
                          }
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Profile Picture</label>
                        <input
                          type="file"
                          class="form-control form-control"
                          onChange={changeprofile}
                        />
                      </div>
                    </div>
                    <h2>Address</h2>
                    <div className="col-md-12">
                      <div class="mb-3 form-group">
                        <label class="">Address</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={changeaddress}
                          defaultValue={address}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Zipcode</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={changezipcode}
                          defaultValue={zipcode}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">City</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={changecity}
                          defaultValue={city}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Password</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={changepassword}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="col-sm-auto mb-3">
                        <label class="">Status</label>
                        <select
                          class="form-select form-control"
                          onChange={changeactive}
                          value={active}
                        >
                          <option value="">Choose...</option>
                          <option value="0">Active</option>
                          <option value="1">Disabled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <a class="me-1 btn btn-primary" onClick={createUser}>
                    Save Changes
                  </a>{" "}
                  <Link to="/admin/ads" class="btn btn-secondary">
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default withRouter(EditUser)
