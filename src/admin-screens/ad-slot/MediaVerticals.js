import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import {
  Container,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap"

import axios from "axios"
const create = axios.create()

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const MediaVerticals = () => {
  const [verticalname, setVerticalname] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [edit, setEdit] = useState(false)
  const [editid, setEditid] = useState(false)

  const [rows1, setRows1] = useState([])
  const [filters, setFilters] = useState([])
  const [editfilters, setEditfilters] = useState([])

  const [axioslist, setAxioslist] = useState([])

  const changeVerticalname = e => {
    setVerticalname(e.target.value)
  }
  const changeDescription = e => {
    setDescription(e.target.value)
  }
  const changeImage = e => {
    setImage(e.target.files[0])
  }
  useEffect(() => {
    create
      .post(process.env.REACT_APP_BASEURL + "adslots/vertical_index")
      .then(res => {
        console.log(res.data.data)
        setAxioslist(res.data.data)
      })
  }, [])
  const addVertical = () => {
    const formData = new FormData()
    formData.append("vertical_name", verticalname)
    formData.append("description", description)
    formData.append("image", image)
    formData.append("filters", JSON.stringify(filters))

    if (edit === true) {
      create
        .post(
          process.env.REACT_APP_BASEURL +
            "adslots/update_vertical?id=" +
            editid,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(res => {
          console.log(res)
          create
            .post(process.env.REACT_APP_BASEURL + "adslots/vertical_index")
            .then(res => {
              console.log(res.data.data)
              setAxioslist(res.data.data)

              setVerticalname("")
              setDescription("")
              setImage("")
              setEditid("")
              setEdit(false)
            })
        })
    } else {
      create
        .post(
          process.env.REACT_APP_BASEURL + "adslots/add_vertical",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(res => {
          console.log(res)
          create
            .post(process.env.REACT_APP_BASEURL + "adslots/vertical_index")
            .then(res => {
              console.log(res.data.data)
              setAxioslist(res.data.data)
            })
        })
    }
  }
  const editVerticals = (e, id) => {
    create
      .post(process.env.REACT_APP_BASEURL + "adslots/vertical_index?id=" + id)
      .then(res => {
        console.log(res.data.data)
        setVerticalname(res.data.data.vertical_name)
        setDescription(res.data.data.description)
        setImage(res.data.data.image)
        setEditfilters(JSON.parse(res.data.data.filters))
        setEditid(res.data.data.mv_id)
        setEdit(true)

        JSON.parse(res.data.data.filters).map((tt, key) => {
          let col
          col = {
            key: key,
            data: tt.data,
          }
          setFilters(filters => filters.concat(col))
        })
      })
  }
  const deleteVerticals = (e, id) => {
    if (confirm("Are you sure you want to delete")) {
      create
        .post(
          process.env.REACT_APP_BASEURL + "adslots/delete_vertical?id=" + id
        )
        .then(res => {
          console.log(res.data.data)
          create
            .post(process.env.REACT_APP_BASEURL + "adslots/vertical_index")
            .then(res => {
              console.log(res.data.data)
              setAxioslist(res.data.data)
            })
        })
    }
  }
  const handleAddRowNested = () => {
    const item1 = {
      name1: "",
    }
    setRows1([...rows1, item1])
  }
  const handleRemoveRowNested = (e, idx) => {
    document.getElementById("nested" + idx).style.display = "none"

    const index = filters.findIndex(c => c.key === idx)
    const newArray = filters.slice()
    newArray.splice(index, 1)
    setFilters(newArray)
  }
  const changeFilters = (e, key) => {
    const checkexists = filters.some(chk => chk.key === key)
    if (checkexists) {
      console.log("exists")
      const index = filters.findIndex(c => c.key === key)
      const newArray = filters.slice()
      newArray.splice(index, 1)
      setFilters(newArray)
      let col
      col = {
        key: key,
        data: e.target.value,
      }
      setFilters(filters => filters.concat(col))
      console.log(filters)
    } else {
      console.log("not exists!")
      let col
      col = {
        key: key,
        data: e.target.value,
      }
      setFilters(filters => filters.concat(col))
      console.log(filters)
    }
  }
  return (
    <>
      <div className="page-content">
        <MetaTags>
          <title>Media Verticals</title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs title="Media" breadcrumbItem="Media Verticals" />
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">Media Verticals List</div>
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <td>S.No</td>
                        <td>Vertical Name</td>
                        <td>Image</td>
                        <td>Actions</td>
                      </tr>
                    </thead>
                    <tbody>
                      {axioslist.map((itm, k) => {
                        return (
                          <>
                            <tr>
                              <td>{k + 1}</td>
                              <td>{itm.vertical_name}</td>
                              <td>
                                <img
                                  src={
                                    process.env.REACT_APP_BASEURL +
                                    "assets/images/media-verticals/" +
                                    itm.image
                                  }
                                  height="60"
                                />
                              </td>
                              <td>
                                <a
                                  className="btn btn-sm btn-primary"
                                  onClick={e => editVerticals(e, itm.mv_id)}
                                >
                                  Edit
                                </a>
                                &nbsp;
                                <a
                                  className="btn btn-sm btn-primary"
                                  onClick={e => deleteVerticals(e, itm.mv_id)}
                                >
                                  Delete
                                </a>
                              </td>
                            </tr>
                          </>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    {edit ? "Edit" : "Add"} Media Verticals
                  </div>
                  <div class="mb-3 form-group">
                    <label class="">Verical Name</label>
                    <input
                      type="text"
                      class="form-control form-control"
                      onChange={changeVerticalname}
                      value={verticalname}
                    />
                  </div>
                  <div class="mb-3 form-group">
                    <label class="">Verical Description</label>
                    <textarea
                      class="form-control form-control"
                      onChange={changeDescription}
                      value={description}
                    ></textarea>
                  </div>
                  {/* filters */}
                  <div className="inner-repeater mb-4">
                    <Label>Filters :</Label>
                    <table style={{ width: "100%" }}>
                      <tbody>
                        {!edit ? (
                          <tr id="addrMain" key="">
                            <td>
                              <Row className="inner mb-3 ">
                                <Col md="10" className="col-8">
                                  <Input
                                    type="text"
                                    className="inner form-control"
                                    placeholder="Filter... 1"
                                    onChange={e => changeFilters(e, 1)}
                                  />
                                </Col>
                                <Col md="2" className="col-4">
                                  <Button
                                    disabled
                                    color="primary"
                                    className="btn-block inner"
                                    style={{ width: "100%" }}
                                  >
                                    <i className="fas fa-trash"></i>
                                  </Button>
                                </Col>
                              </Row>
                            </td>
                          </tr>
                        ) : (
                          ""
                        )}
                        {edit
                          ? editfilters.map((itm, idx) => (
                              <tr id={"nested" + idx} key={idx}>
                                <td>
                                  <Row className="inner mb-3">
                                    <Col md="10" className="col-8">
                                      <Input
                                        type="text"
                                        className="inner form-control"
                                        placeholder={"Filter... " + (idx + 1)}
                                        onChange={e =>
                                          changeFilters(e, idx + 1)
                                        }
                                        value={itm.data}
                                      />
                                    </Col>
                                    <Col md="2" className="col-4">
                                      <Button
                                        onClick={e =>
                                          handleRemoveRowNested(e, idx)
                                        }
                                        color="primary"
                                        className="btn-block inner"
                                        style={{ width: "100%" }}
                                      >
                                        <i className="fas fa-trash"></i>
                                      </Button>
                                    </Col>
                                  </Row>
                                </td>
                              </tr>
                            ))
                          : ""}
                        {rows1.map((item1, idx) => (
                          <tr
                            id={"nested" + idx + 2 + editfilters.length}
                            key={idx + 2 + editfilters.length}
                          >
                            <td>
                              <Row className="inner mb-3">
                                <Col md="10" className="col-8">
                                  <Input
                                    type="text"
                                    className="inner form-control"
                                    placeholder={
                                      "Filter... " +
                                      (idx + 2 + editfilters.length)
                                    }
                                    onChange={e =>
                                      changeFilters(
                                        e,
                                        idx + 2 + editfilters.length
                                      )
                                    }
                                  />
                                </Col>
                                <Col md="2" className="col-4">
                                  <Button
                                    onClick={e =>
                                      handleRemoveRowNested(
                                        e,
                                        idx + 2 + editfilters.length
                                      )
                                    }
                                    color="primary"
                                    className="btn-block inner"
                                    style={{ width: "100%" }}
                                  >
                                    <i className="fas fa-trash"></i>
                                  </Button>
                                </Col>
                              </Row>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Button onClick={handleAddRowNested} color="success">
                      Add Filter
                    </Button>
                  </div>

                  {edit ? (
                    <div class="mb-3 form-group">
                      <label class="">Previous Image</label>
                      <br />
                      <img
                        src={
                          process.env.REACT_APP_BASEURL +
                          "assets/images/media-verticals/" +
                          image
                        }
                        height="60"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div class="mb-3 form-group">
                    <label class="">Verical Image</label>
                    <input
                      type="file"
                      class="form-control form-control"
                      onBlur={changeImage}
                    />
                    <input
                      type="hidden"
                      class="form-control form-control"
                      value={editid}
                    />
                  </div>
                  <a className="btn btn-primary" onClick={addVertical}>
                    Submit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default MediaVerticals
