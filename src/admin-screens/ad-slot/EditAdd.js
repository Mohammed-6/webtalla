import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import { Container, Card, CardBody, CardTitle, Col, Form } from "reactstrap"

import axios from "axios"
const create = axios.create()
import Dropzone from "react-dropzone"

import Breadcrumbs from "../../components/Common/Breadcrumb"
import queryString from "query-string"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

import { Link } from "react-router-dom"

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
  },
}
const EditAd = () => {
  const [mediavertical, setmediavertical] = useState("")
  const [adsprovider, setadsprovider] = useState("")
  const [adname, setadname] = useState("")
  const [place, setplace] = useState("")
  const [slot, setslot] = useState("")
  const [time, settime] = useState("")
  const [duration, setduration] = useState("")
  const [rates, setrates] = useState("")
  const [beforerates, setBeforerates] = useState("120000")
  const [edit, setEdit] = useState(false)
  const [editid, setEditid] = useState(false)

  const [metatitle, setMetatitle] = useState("")
  const [metakeywords, setMetakeywords] = useState("")
  const [metadescription, setMetadescription] = useState("")

  const [selectedFiles, setselectedFiles] = useState([])
  const [attachments, setattachments] = useState([])

  const [axiosvertical, setAxiosvertical] = useState([])
  const [axiosprovider, setAxiosprovider] = useState([])
  const [filters, setFilters] = useState([])
  const [efilters, setEfilters] = useState([])

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
  const changeFilterr = (e, key, itm) => {
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
        filter_key: itm.filter_key,
        filter_name: itm.filter_name,
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
    setEfilters([])
    setdata([])
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
    const tt = queryString.parse(location.search)
    setEditid(tt.id)
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
    create
      .post(process.env.REACT_APP_BASEURL + "adslots/ad_index/" + tt.id, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => {
        console.log(res.data.data)
        setmediavertical(res.data.data.mediavertical)
        setadsprovider(res.data.data.adsprovider)
        setadname(res.data.data.adname)
        setplace(res.data.data.place)
        setslot(res.data.data.slot)
        settime(res.data.data.time)
        setduration(res.data.data.duration)
        setrates(res.data.data.rates)
        setBeforerates(res.data.data.before_rates)
        setEditid(res.data.data.as_id)
        setMetatitle(res.data.data.meta_title)
        setMetadescription(res.data.data.meta_description)
        setMetakeywords(res.data.data.meta_keywords)
        setattachments(JSON.parse(res.data.data.attachments))
        setEfilters(res.data.filters)
        setFilters(res.data.filters)
      })
  }, [])
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
  const editAds = () => {
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
      .post(
        process.env.REACT_APP_BASEURL + "adslots/update_ad?id=" + editid,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(res => {
        console.log(res)
        window.location.replace("/admin/ads")
      })
  }
  const deleteImage = aa => {
    const formData = new FormData()
    formData.append("attachments", JSON.stringify(attachments))
    formData.append("edit", editid)
    create
      .post(
        process.env.REACT_APP_BASEURL + "adslots/update_ads_image?id=" + aa,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(res => {
        console.log(res)
        setattachments(JSON.parse(res.data.data.attachments))
      })
  }
  return (
    <>
      <div className="page-content">
        <MetaTags>
          <title>Add Ad</title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Form Elements" />
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">Edit Ads</div>
                  <div className="row">
                    <div className="col-md-6">
                      <div class="col-sm-auto mb-3">
                        <label class="">Media Vertical</label>
                        <select
                          class="form-select form-control"
                          onChange={changemediavertical}
                          value={mediavertical}
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
                          value={adsprovider}
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
                        {efilters.map((itm, k) => {
                          return (
                            <div className="col-md-6">
                              <div class="mb-3 form-group">
                                <label class="">{itm.filter_name}</label>
                                <input
                                  type="text"
                                  class="form-control form-control"
                                  onChange={e => changeFilterr(e, k, itm)}
                                  defaultValue={itm.filter_value}
                                />
                              </div>
                            </div>
                          )
                        })}
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
                          value={adname}
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
                          value={place}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Slot</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          value={slot}
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
                          value={time}
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
                          value={duration}
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
                          value={beforerates}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Rates</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          value={rates}
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
                  <div className="pb-3">
                    <Carousel responsive={responsive}>
                      {attachments.map((ttl, k) => (
                        <div className="text-center">
                          <img
                            src={
                              process.env.REACT_APP_BASEURL +
                              "assets/images/product-images/" +
                              ttl.file_name
                            }
                            height="100"
                          />
                          <div className="pt-2">
                            <a
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteImage(k)}
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      ))}
                    </Carousel>
                  </div>
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
                    <a class="me-1 btn btn-primary" onClick={editAds}>
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

export default EditAd
