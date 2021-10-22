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
import { Link } from "react-router-dom"

import axios from "axios"
const create = axios.create()

import toastr from "toastr"
import "toastr/build/toastr.min.css"
import Breadcrumbs from "../../components/Common/Breadcrumb"
const AddAd = props => {
  const [mediavertical, setmediavertical] = useState("")
  const [adsprovider, setadsprovider] = useState("")
  const [adname, setadname] = useState()
  const [place, setplace] = useState("")
  const [slot, setslot] = useState("")
  const [time, settime] = useState("")
  const [duration, setduration] = useState("")
  const [rates, setrates] = useState("")
  const [beforerates, setBeforerates] = useState("")
  const [edit, setEdit] = useState(false)
  const [editid, setEditid] = useState(false)

  const [metatitle, setMetatitle] = useState("")
  const [metakeywords, setMetakeywords] = useState("")
  const [metadescription, setMetadescription] = useState("")

  const [selectedFiles, setselectedFiles] = useState([])

  const [axiosvertical, setAxiosvertical] = useState([])
  const [axiosprovider, setAxiosprovider] = useState([])
  const [filters, setFilters] = useState([])

  const [data, setdata] = useState([])

  const changeFilter = (e, key, itm) => {
    const checkexists = data.some(chk => chk.key === key)
    if (checkexists) {
      console.log("exists")
      const index = data.findIndex(c => c.key === key)
      const newArray = data.slice()
      newArray.splice(index, 1)
      setdata(newArray)
      let col
      col = {
        key: key,
        mvid: mediavertical,
        filter_key: itm.key,
        filter_name: itm.data,
        filter_value: e.target.value,
      }
      setdata(data => data.concat(col))
      console.log(data)
    } else {
      console.log("not exists!")
      let col
      col = {
        key: key,
        mvid: mediavertical,
        filter_key: itm.key,
        filter_name: itm.data,
        filter_value: e.target.value,
      }
      setdata(data => data.concat(col))
      console.log(data)
    }
  }

  const changemediavertical = e => {
    setmediavertical(e.target.value)
    axiosvertical.map(tm => {
      if (tm.mv_id === e.target.value) {
        console.table(tm.filters)
        if (tm.filters !== null) {
          setFilters(JSON.parse(tm.filters))
        }
      }
    })
  }
  const changeadsprovider = e => {
    setadsprovider(e.target.value)
  }
  const changeadname = e => {
    setadname(e.target.value)
  }
  const changeplace = e => {
    setplace(e.target.value)
  }
  const changeslot = e => {
    setslot(e.target.value)
  }
  const changetime = e => {
    settime(e.target.value)
  }
  const changeduration = e => {
    setduration(e.target.value)
  }
  const changerates = e => {
    setrates(e.target.value)
  }
  const changeMetatitle = e => {
    setMetatitle(e.target.value)
  }
  const changeMetakeywords = e => {
    setMetakeywords(e.target.value)
  }
  const changeDescription = e => {
    setMetadescription(e.target.value)
  }
  const changeBeforerates = e => {
    setBeforerates(e.target.value)
  }
  useEffect(() => {
    create
      .post(process.env.REACT_APP_BASEURL + "adslots/provider_index")
      .then(res => {
        console.log(res.data.data)
        setAxiosprovider(res.data.data)
      })
    create
      .post(process.env.REACT_APP_BASEURL + "adslots/vertical_index")
      .then(res => {
        console.log(res.data.data)
        setAxiosvertical(res.data.data)
      })
  }, [])
  const addAds = () => {
    console.log(selectedFiles)
    const formData = new FormData()
    formData.append("mediavertical", mediavertical)
    formData.append("adsprovider", adsprovider)
    formData.append("filters", JSON.stringify(data))
    formData.append("adname", adname)
    formData.append("place", place)
    formData.append("slot", slot)
    formData.append("time", time)
    formData.append("duration", duration)
    formData.append("rates", rates)
    formData.append("before_rates", beforerates)
    formData.append("meta_title", metatitle)
    formData.append("meta_description", metadescription)
    formData.append("meta_keywords", metakeywords)
    selectedFiles.forEach(file => {
      formData.append("attachments[]", file, file.name)
    })

    create
      .post(process.env.REACT_APP_BASEURL + "adslots/add_ad", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => {
        console.log(res)
        showToast()
        props.history.push("/admin/ads")
      })
  }
  const editProvider = (e, id) => {
    create
      .post(process.env.REACT_APP_BASEURL + "adslots/ad_index?id=" + id)
      .then(res => {
        console.log(res.data.data)
        setmediavertical(res.data.data.mediavertical)
        setadsprovider(res.data.data.adsprovider)
        setadname(res.data.data.adname)
        setplace(res.data.data.place)
        setslot(res.data.data.slot)
        setstate(res.data.data.state)
        setEditid(res.data.data.sp_id)
        setEdit(true)
      })
  }
  const handleAcceptedFiles = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setselectedFiles(files)
  }

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }
  const showToast = () => {
    var toastType
    var title = ""
    var message = "Ads added successfully."
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
          <title>Add Ad</title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs title="Ads" breadcrumbItem="Add Ads" />
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">Add Ads</div>
                  <div className="row">
                    <div className="col-md-6">
                      <div class="col-sm-auto mb-3">
                        <label class="">Media Vertical</label>
                        <select
                          class="form-select form-control"
                          onChange={changemediavertical}
                        >
                          <option>Choose...</option>
                          {axiosvertical.map((itm, k) => (
                            <option value={itm.mv_id}>
                              {itm.vertical_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="col-sm-auto mb-3">
                        <label class="">Ads Provider</label>
                        <select
                          class="form-select form-control"
                          onChange={changeadsprovider}
                        >
                          <option>Choose...</option>
                          {axiosprovider.map((itm, k) => (
                            <option value={itm.sp_id}>{itm.companyname}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="row">
                        <label>Filters</label>
                        {filters.map((itm, k) => {
                          return (
                            <div className="col-md-6">
                              <div class="mb-3 form-group">
                                <label class="">{itm.data}</label>
                                <input
                                  type="text"
                                  class="form-control form-control"
                                  onChange={e => changeFilter(e, k, itm)}
                                />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Ad Name</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={changeadname}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Place</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={changeplace}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Slot</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={changeslot}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Time</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={changetime}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div class="mb-3 form-group">
                        <label class="">Duration</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={changeduration}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Before Rates</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={changeBeforerates}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Rates</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={changerates}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Card>
                <CardBody>
                  <CardTitle className="mb-3 h4">Product Images</CardTitle>
                  <Form className="dropzone">
                    <Dropzone
                      onDrop={acceptedFiles =>
                        handleAcceptedFiles(acceptedFiles)
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div>
                          <div
                            className="dz-message needsclick"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className="dz-message needsclick">
                              <div className="mb-3">
                                <i className="display-4 text-muted bx bxs-cloud-upload" />
                              </div>
                              <h4>Drop files here or click to upload.</h4>
                            </div>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <div className="dropzone-previews mt-3" id="file-previews">
                      {selectedFiles.map((f, i) => {
                        return (
                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
                          >
                            <div className="p-2">
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={f.name}
                                    src={f.preview}
                                  />
                                </Col>
                                <Col>
                                  <Link
                                    to="#"
                                    className="text-muted font-weight-bold"
                                  >
                                    {f.name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>{f.formattedSize}</strong>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        )
                      })}
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <div class="card">
                <div class="card-body">
                  <div class="h4 card-title">Meta Data</div>
                  <p class="card-title-desc">Fill all information below</p>
                  <form class="">
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="mb-3">
                          <label for="metatitle" class="">
                            Meta title
                          </label>
                          <input
                            id="metatitle"
                            name="productname"
                            type="text"
                            class="form-control form-control"
                            onChange={changeMetatitle}
                            value={metatitle}
                          />
                        </div>
                        <div class="mb-3">
                          <label for="metakeywords" class="">
                            Meta Keywords
                          </label>
                          <input
                            id="metakeywords"
                            name="manufacturername"
                            type="text"
                            class="form-control form-control"
                            onChange={changeMetakeywords}
                            value={metakeywords}
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="mb-3">
                          <label for="metadescription" class="">
                            Meta Description
                          </label>
                          <textarea
                            class="form-control"
                            id="metadescription"
                            rows="5"
                            onChange={changeDescription}
                            value={metadescription}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <a class="me-1 btn btn-primary" onClick={addAds}>
                      Save Changes
                    </a>{" "}
                    <Link to="/admin/ads" class="btn btn-secondary">
                      Cancel
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default AddAd
