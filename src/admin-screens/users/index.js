import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import { Container } from "reactstrap"
import { Link } from "react-router-dom"

import axios from "axios"
const create = axios.create()

import Breadcrumbs from "../../components/Common/Breadcrumb"
const Ads = () => {
  const [axioslist, setAxioslist] = useState([])
  useEffect(() => {
    create
      .post(
        process.env.REACT_APP_BASEURL +
          "user/index?access_token=" +
          localStorage.getItem("adminToken")
      )
      .then(res => {
        console.log(res.data.data)
        setAxioslist(res.data.data)
      })
  }, [])
  const deleteAd = (e, id) => {
    if (confirm("Are you sure you want to delete")) {
      create
        .post(
          process.env.REACT_APP_BASEURL +
            "user/delete_user?access_token=" +
            localStorage.getItem("adminToken") +
            "&id=" +
            id
        )
        .then(res => {
          console.log(res.data.data)
          create
            .post(process.env.REACT_APP_BASEURL + "user/index")
            .then(res => {
              console.log(res.data.data)
              setAxioslist(res.data.data)
            })
        })
    }
  }
  return (
    <>
      <div className="page-content">
        <MetaTags>
          <title>Ads</title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs title="Users" breadcrumbItem="Users" />
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">User List</div>
                  <div class="mb-2 row">
                    <div class="col-sm-4"></div>
                    <div class="col-sm-8">
                      <div class="text-sm-end">
                        <Link
                          to="/admin/add-user"
                          class="btn-rounded mb-2 me-2 btn btn-success"
                        >
                          <i class="mdi mdi-plus me-1"></i> Add New User
                        </Link>
                      </div>
                    </div>
                  </div>
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <td>S.No</td>
                        <td>Designation</td>
                        <td>Profile</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Birthday</td>
                        <td>Address</td>
                        <td>Status</td>
                        <td>Actions</td>
                      </tr>
                    </thead>
                    <tbody>
                      {axioslist.map((itm, k) => {
                        return (
                          <tr>
                            <td>{k + 1}</td>
                            <td>{itm.designation}</td>
                            <td>
                              <img
                                class="rounded-circle avatar-sm"
                                src={
                                  process.env.REACT_APP_BASEURL +
                                  "assets/images/user-profiles/" +
                                  itm.profile
                                }
                                alt=""
                              />
                            </td>
                            <td>{itm.firstname + " " + itm.lastname}</td>
                            <td>{itm.email}</td>
                            <td>{itm.birthday}</td>
                            <td>
                              {itm.address +
                                ", " +
                                itm.city +
                                ", " +
                                itm.zipcode}
                            </td>
                            <td>
                              {itm.is_active == 0 ? "active" : "disabled"}
                            </td>
                            <td>
                              <Link
                                className="btn btn-sm btn-primary"
                                to={"edit-user/" + itm.user_id}
                              >
                                Edit
                              </Link>
                              &nbsp;
                              <a
                                className="btn btn-sm btn-primary"
                                onClick={e => deleteAd(e, itm.user_id)}
                              >
                                Delete
                              </a>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Ads
