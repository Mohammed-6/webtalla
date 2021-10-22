import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import { Container } from "reactstrap"
import { Link } from "react-router-dom"

import axios from "axios"
const create = axios.create()

import Breadcrumbs from "../../components/Common/Breadcrumb"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
const Ads = () => {
  const [axioslist, setAxioslist] = useState([])
  useEffect(() => {
    create
      .post(process.env.REACT_APP_BASEURL + "adslots/ad_index")
      .then(res => {
        console.log(res.data.data)
        setAxioslist(res.data.data)
      })
  }, [])
  const deleteAd = (e, id) => {
    if (confirm("Are you sure you want to delete")) {
      create
        .post(process.env.REACT_APP_BASEURL + "adslots/delete_ad?id=" + id)
        .then(res => {
          console.log(res.data.data)
          create
            .post(process.env.REACT_APP_BASEURL + "adslots/ad_index")
            .then(res => {
              console.log(res.data.data)
              showToast()
              setAxioslist(res.data.data)
            })
        })
    }
  }
  const showToast = () => {
    var toastType
    var title = ""
    var message = "Ads deleted successfully."
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
          <title>Ads</title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs title="Ads" breadcrumbItem="Ads List" />
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">Ads List</div>
                  <div class="mb-2 row">
                    <div class="col-sm-4"></div>
                    <div class="col-sm-8">
                      <div class="text-sm-end">
                        <Link
                          to="/admin/add-ad"
                          class="btn-rounded mb-2 me-2 btn btn-success"
                        >
                          <i class="mdi mdi-plus me-1"></i> Add New Add
                        </Link>
                      </div>
                    </div>
                  </div>
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <td>S.No</td>
                        <td>Media Vertical</td>
                        <td>Ads Provider</td>
                        <td>Ad Name</td>
                        <td>Place</td>
                        <td>Slot</td>
                        <td>Time</td>
                        <td>Duration</td>
                        <td>Rates</td>
                        <td>Actions</td>
                      </tr>
                    </thead>
                    <tbody>
                      {axioslist.map((itm, k) => {
                        return (
                          <tr>
                            <td>{k + 1}</td>
                            <td>{itm.vertical_name}</td>
                            <td>{itm.companyname}</td>
                            <td>{itm.adname}</td>
                            <td>{itm.place}</td>
                            <td>{itm.slot}</td>
                            <td>{itm.time}</td>
                            <td>{itm.duration}</td>
                            <td>{itm.rates}</td>
                            <td style={{ display: "flex" }}>
                              <Link
                                className="btn btn-sm btn-primary"
                                to={"edit-ad?id=" + itm.as_id}
                              >
                                Edit
                              </Link>
                              &nbsp;
                              <a
                                className="btn btn-sm btn-primary"
                                onClick={e => deleteAd(e, itm.as_id)}
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
