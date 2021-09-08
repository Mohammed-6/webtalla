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

const ServiceProvider = () => {
  const [maincategory, setmaincategory] = useState("")
  const [companyname, setcompanyname] = useState("")
  const [email, setemail] = useState("")
  const [mobile, setmobile] = useState("")
  const [city, setcity] = useState("")
  const [state, setstate] = useState("")
  const [image, setImage] = useState("")
  const [details, setdetails] = useState([])
  const [edit, setEdit] = useState(false)
  const [editid, setEditid] = useState(false)

  const [rows1, setRows1] = useState([])
  const [rows2, setRows2] = useState([])
  const [rows3, setRows3] = useState([])

  const [data, setdata] = useState([])
  const [description, setdescription] = useState([])
  const [editdata, setEditdata] = useState([])
  const [editdescription, setEditdescription] = useState([])

  const [data1, setdata1] = useState([])
  const [description1, setdescription1] = useState([])
  const [editdata1, setEditdata1] = useState([])
  const [editdescription1, setEditdescription1] = useState([])

  const [data2, setdata2] = useState([])
  const [description2, setdescription2] = useState([])
  const [editdata2, setEditdata2] = useState([])
  const [editdescription2, setEditdescription2] = useState([])

  const [axioslist, setAxioslist] = useState([])

  const [mediaoptionlabel, setMediaoptionlabel] = useState("")
  const [mediaoption, setMediaoption] = useState("")
  const [mediacountlabel, setMediacountlabel] = useState("")
  const [mediacount, setMediacount] = useState("")
  const [beforeamount, setBeforeamount] = useState("")
  const [afteramount, setAfteramount] = useState("")
  const [duration, setDuration] = useState("")

  const changemaincategory = e => {
    setmaincategory(e.target.value)
  }
  const changecompanyname = e => {
    setcompanyname(e.target.value)
  }
  const changeemail = e => {
    setemail(e.target.value)
  }
  const changemobile = e => {
    setmobile(e.target.value)
  }
  const changecity = e => {
    setcity(e.target.value)
  }
  const changestate = e => {
    setstate(e.target.value)
  }
  const changeImage = e => {
    setImage(e.target.files[0])
  }
  const changeDetails = (type, e, key) => {
    const checkexists = details.some(chk => chk.key === key)
    if (checkexists) {
      console.log("exists")
      const index = details.findIndex(c => c.key === key)
      const newArray = details.slice()
      newArray.splice(index, 1)
      setdetails(newArray)
      let col
      col = {
        key: key,
        type: type,
        details: e.target.value,
      }
      setdetails(details => details.concat(col))
      console.log(details)
    } else {
      console.log("not exists!")
      let col
      col = {
        key: key,
        type: type,
        details: e.target.value,
      }
      setdetails(details => details.concat(col))
      console.log(details)
    }
  }
  useEffect(() => {
    create
      .post(process.env.REACT_APP_BASEURL + "adslots/provider_index")
      .then(res => {
        console.log(res.data.data)
        setAxioslist(res.data.data)
      })
  }, [])
  const addProvider = () => {
    const formData = new FormData()
    formData.append("maincategory", maincategory)
    formData.append("companyname", companyname)
    formData.append("email", email)
    formData.append("mobile", mobile)
    formData.append("city", city)
    formData.append("state", state)
    formData.append("image", image)
    formData.append("details", JSON.stringify(details))
    formData.append("data", JSON.stringify(data))
    formData.append("data_description", JSON.stringify(description))
    formData.append("about", JSON.stringify(data1))
    formData.append("about_description", JSON.stringify(description1))
    formData.append("faq", JSON.stringify(data2))
    formData.append("faq_description", JSON.stringify(description2))

    if (edit === true) {
      create
        .post(
          process.env.REACT_APP_BASEURL +
            "adslots/update_provider?id=" +
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
            .post(process.env.REACT_APP_BASEURL + "adslots/provider_index")
            .then(res => {
              console.log(res.data.data)
              setAxioslist(res.data.data)
              setmaincategory("")
              setcompanyname("")
              setemail("")
              setmobile("")
              setcity("")
              setstate("")
              setEditid("")
              setEdit(false)
            })
        })
    } else {
      create
        .post(
          process.env.REACT_APP_BASEURL + "adslots/add_provider",
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
            .post(process.env.REACT_APP_BASEURL + "adslots/provider_index")
            .then(res => {
              console.log(res.data.data)
              setAxioslist(res.data.data)
              setmaincategory("")
              setcompanyname("")
              setemail("")
              setmobile("")
              setcity("")
              setstate("")
              setEditid("")
              setEdit(false)
            })
        })
    }
  }
  const editProvider = (e, id) => {
    setEditdata([])
    setEditdescription([])

    setEditdata1([])
    setEditdescription1([])
    create
      .post(process.env.REACT_APP_BASEURL + "adslots/provider_index?id=" + id)
      .then(res => {
        // console.log(res.data.data)
        setmaincategory(res.data.data.maincategory)
        setcompanyname(res.data.data.companyname)
        setemail(res.data.data.email)
        setmobile(res.data.data.mobile)
        setcity(res.data.data.city)
        setstate(res.data.data.state)
        setEditid(res.data.data.sp_id)
        setImage(res.data.data.image)
        setdetails(JSON.parse(res.data.data.details))
        setEdit(true)

        // details
        const mn0 = JSON.parse(res.data.data.details)
        mn0.map(tm => {
          if (tm.type === "mediaoptionlabel") {
            setMediaoptionlabel(tm.details)
          } else if (tm.type === "mediaoption") {
            setMediaoption(tm.details)
          } else if (tm.type === "mediacountlabel") {
            setMediacountlabel(tm.details)
          } else if (tm.type === "mediacount") {
            setMediacount(tm.details)
          } else if (tm.type === "beforeamount") {
            setBeforeamount(tm.details)
          } else if (tm.type === "afteramount") {
            setAfteramount(tm.details)
          } else if (tm.type === "duration") {
            setDuration(tm.details)
          }
        })

        // data
        const mn = JSON.parse(res.data.data.data)
        setEditdata(JSON.parse(mn.data))
        setEditdescription(JSON.parse(mn.data_description))

        JSON.parse(mn.data).map((tt, key) => {
          let col
          col = {
            key: key,
            data: tt.data,
          }
          setdata(data => data.concat(col))
        })

        JSON.parse(mn.data_description).map((tt, key) => {
          let col
          col = {
            key: key,
            description: tt.description,
          }
          setdescription(description => description.concat(col))
        })
        //about
        const mn1 = JSON.parse(res.data.data.about)
        setEditdata1(JSON.parse(mn1.about))
        setEditdescription1(JSON.parse(mn1.about_description))

        JSON.parse(mn1.about).map((tt, key) => {
          let col
          col = {
            key: key,
            data: tt.data,
          }
          setdata1(data1 => data1.concat(col))
        })

        JSON.parse(mn1.about_description).map((tt, key) => {
          let col
          col = {
            key: key,
            description: tt.description,
          }
          setdescription1(description1 => description1.concat(col))
        })
        //faq
        const mn2 = JSON.parse(res.data.data.faq)
        setEditdata2(JSON.parse(mn2.faq))
        setEditdescription2(JSON.parse(mn2.faq_description))

        JSON.parse(mn2.faq).map((tt, key) => {
          let col
          col = {
            key: key,
            data: tt.data,
          }
          setdata2(data2 => data2.concat(col))
        })

        JSON.parse(mn2.faq_description).map((tt, key) => {
          let col
          col = {
            key: key,
            description: tt.description,
          }
          setdescription2(description2 => description2.concat(col))
        })
      })
  }
  const deleteProvider = (e, id) => {
    if (confirm("Are you sure you want to delete")) {
      create
        .post(
          process.env.REACT_APP_BASEURL + "adslots/delete_provider?id=" + id
        )
        .then(res => {
          console.log(res.data.data)
          create
            .post(process.env.REACT_APP_BASEURL + "adslots/provider_index")
            .then(res => {
              console.log(res.data.data)
              setAxioslist(res.data.data)
            })
        })
    }
  }
  //data
  const handleAddRowNested = () => {
    const item1 = {
      name1: "",
    }
    setRows1([...rows1, item1])
  }
  const handleRemoveRowNested = (e, idx) => {
    console.log(idx)
    document.getElementById("nested" + idx).style.display = "none"

    const index = data.findIndex(c => c.key === idx)
    const newArray = data.slice()
    newArray.splice(index, 1)
    setdata(newArray)
  }
  const changedata = (e, key) => {
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
        data: e.target.value,
      }
      setdata(data => data.concat(col))
      console.log(data)
    } else {
      console.log("not exists!")
      let col
      col = {
        key: key,
        data: e.target.value,
      }
      setdata(data => data.concat(col))
      console.log(data)
    }
  }
  const changeDescription = (e, key) => {
    const checkexists = description.some(chk => chk.key === key)
    if (checkexists) {
      console.log("exists")
      const index = description.findIndex(c => c.key === key)
      const newArray = description.slice()
      newArray.splice(index, 1)
      setdescription(newArray)
      let col
      col = {
        key: key,
        description: e.target.value,
      }
      setdescription(description => description.concat(col))
      console.log(description)
    } else {
      console.log("not exists!")
      let col
      col = {
        key: key,
        description: e.target.value,
      }
      setdescription(description => description.concat(col))
      console.log(description)
    }
  }
  //about
  const handleAddRowNested1 = () => {
    const item1 = {
      name1: "",
    }
    setRows2([...rows2, item1])
  }
  const handleRemoveRowNested1 = (e, idx) => {
    console.log(idx)
    document.getElementById("nested1" + idx).style.display = "none"

    const index = data1.findIndex(c => c.key === idx)
    const newArray = data1.slice()
    newArray.splice(index, 1)
    setdata1(newArray)
  }
  const changedata1 = (e, key) => {
    const checkexists = data1.some(chk => chk.key === key)
    if (checkexists) {
      console.log("exists")
      const index = data1.findIndex(c => c.key === key)
      const newArray = data1.slice()
      newArray.splice(index, 1)
      setdata1(newArray)
      let col
      col = {
        key: key,
        data: e.target.value,
      }
      setdata1(data1 => data1.concat(col))
      console.log(data1)
    } else {
      console.log("not exists!")
      let col
      col = {
        key: key,
        data: e.target.value,
      }
      setdata1(data1 => data1.concat(col))
      console.log(data1)
    }
  }
  const changeDescription1 = (e, key) => {
    const checkexists = description1.some(chk => chk.key === key)
    if (checkexists) {
      console.log("exists")
      const index = description1.findIndex(c => c.key === key)
      const newArray = description1.slice()
      newArray.splice(index, 1)
      setdescription1(newArray)
      let col
      col = {
        key: key,
        description: e.target.value,
      }
      setdescription1(description1 => description1.concat(col))
      console.log(description1)
    } else {
      console.log("not exists!")
      let col
      col = {
        key: key,
        description: e.target.value,
      }
      setdescription1(description1 => description1.concat(col))
      console.log(description1)
    }
  }
  //faq
  const handleAddRowNested2 = () => {
    const item1 = {
      name1: "",
    }
    setRows3([...rows3, item1])
  }
  const handleRemoveRowNested2 = (e, idx) => {
    console.log(idx)
    document.getElementById("nested2" + idx).style.display = "none"

    const index = data2.findIndex(c => c.key === idx)
    const newArray = data2.slice()
    newArray.splice(index, 1)
    setdata2(newArray)
  }
  const changedata2 = (e, key) => {
    const checkexists = data2.some(chk => chk.key === key)
    if (checkexists) {
      console.log("exists")
      const index = data2.findIndex(c => c.key === key)
      const newArray = data2.slice()
      newArray.splice(index, 1)
      setdata2(newArray)
      let col
      col = {
        key: key,
        data: e.target.value,
      }
      setdata2(data2 => data2.concat(col))
      console.log(data2)
    } else {
      console.log("not exists!")
      let col
      col = {
        key: key,
        data: e.target.value,
      }
      setdata2(data2 => data2.concat(col))
      console.log(data2)
    }
  }
  const changeDescription2 = (e, key) => {
    const checkexists = description2.some(chk => chk.key === key)
    if (checkexists) {
      console.log("exists")
      const index = description2.findIndex(c => c.key === key)
      const newArray = description2.slice()
      newArray.splice(index, 1)
      setdescription2(newArray)
      let col
      col = {
        key: key,
        description: e.target.value,
      }
      setdescription2(description2 => description2.concat(col))
      console.log(description2)
    } else {
      console.log("not exists!")
      let col
      col = {
        key: key,
        description: e.target.value,
      }
      setdescription2(description2 => description2.concat(col))
      console.log(description2)
    }
  }
  return (
    <>
      <div className="page-content">
        <MetaTags>
          <title>Provider</title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs
            title="Service Provider"
            breadcrumbItem="Service Provider"
          />
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">Service Provider List</div>
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <td>S.No</td>
                        <td>Main Category</td>
                        <td>Company Name</td>
                        <td>Email</td>
                        <td>Actions</td>
                      </tr>
                    </thead>
                    <tbody>
                      {axioslist.map((itm, k) => {
                        return (
                          <tr>
                            <td>{k + 1}</td>
                            <td>{itm.maincategory}</td>
                            <td>{itm.companyname}</td>
                            <td>{itm.email}</td>
                            <td>
                              <a
                                className="btn btn-sm btn-primary"
                                onClick={e => editProvider(e, itm.sp_id)}
                              >
                                Edit
                              </a>
                              &nbsp;
                              <a
                                className="btn btn-sm btn-primary"
                                onClick={e => deleteProvider(e, itm.sp_id)}
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
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    {edit ? "Edit" : "Add"} Service Provider
                  </div>
                  <div class="mb-3 form-group">
                    <label class="">Main Category</label>
                    <input
                      type="text"
                      class="form-control form-control"
                      onChange={changemaincategory}
                      defaultValue={maincategory}
                    />
                  </div>
                  <div class="mb-3 form-group">
                    <label class="">Company Name</label>
                    <input
                      type="text"
                      class="form-control form-control"
                      onChange={changecompanyname}
                      defaultValue={companyname}
                    />
                  </div>
                  {edit ? (
                    <div class="mb-3 form-group">
                      <label class="">Previous Image</label>
                      <br />
                      <img
                        src={
                          process.env.REACT_APP_BASEURL +
                          "assets/images/provider-images/" +
                          image
                        }
                        height="60"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div class="mb-3 form-group">
                    <label class="">Image</label>
                    <input
                      type="file"
                      class="form-control form-control"
                      onBlur={changeImage}
                    />
                    <input
                      type="hidden"
                      class="form-control form-control"
                      defaultValue={editid}
                    />
                  </div>
                  <div class="mb-3 form-group">
                    <label class="">Email</label>
                    <input
                      type="text"
                      class="form-control form-control"
                      onChange={changeemail}
                      defaultValue={email}
                    />
                  </div>
                  <div class="mb-3 form-group">
                    <label class="">Mobile</label>
                    <input
                      type="text"
                      class="form-control form-control"
                      onChange={changemobile}
                      defaultValue={mobile}
                    />
                  </div>
                  <div class="mb-3 form-group">
                    <label class="">City</label>
                    <input
                      type="text"
                      class="form-control form-control"
                      onChange={changecity}
                      defaultValue={city}
                    />
                  </div>
                  <div class="mb-3 form-group">
                    <label class="">State</label>
                    <input
                      type="text"
                      class="form-control form-control"
                      onChange={changestate}
                      defaultValue={state}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Media Option Label</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={e =>
                            changeDetails("mediaoptionlabel", e, 1)
                          }
                          defaultValue={mediaoptionlabel}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Media Option</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={e => changeDetails("mediaoption", e, 2)}
                          defaultValue={mediaoption}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Media Count Label</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={e => changeDetails("mediacountlabel", e, 3)}
                          defaultValue={mediacountlabel}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Media Count</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={e => changeDetails("mediacount", e, 4)}
                          defaultValue={mediacount}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Before Amount</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={e => changeDetails("beforeamount", e, 5)}
                          defaultValue={beforeamount}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">After Amount</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={e => changeDetails("afteramount", e, 6)}
                          defaultValue={afteramount}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="mb-3 form-group">
                        <label class="">Duration</label>
                        <input
                          type="text"
                          class="form-control form-control"
                          onChange={e => changeDetails("duration", e, 7)}
                          defaultValue={duration}
                        />
                      </div>
                    </div>
                  </div>
                  {/* data */}
                  <div className="inner-repeater mb-4">
                    <Label>Data :</Label>
                    <table style={{ width: "100%" }}>
                      <tbody>
                        {!edit ? (
                          <tr id="addrMain" key="">
                            <td>
                              <Row className="inner mb-3 ">
                                <Col md="12" className="col-8">
                                  <Input
                                    type="text"
                                    className="inner form-control"
                                    placeholder="Title... 1"
                                    onChange={e => changedata(e, 1)}
                                  />
                                </Col>
                              </Row>
                            </td>
                            <td>
                              <Row className="inner mb-3 ">
                                <Col md="9" className="col-8">
                                  <Input
                                    type="text"
                                    className="inner form-control"
                                    placeholder="Description... 1"
                                    onChange={e => changeDescription(e, 1)}
                                  />
                                </Col>
                                <Col md="3" className="col-4">
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
                          ? editdata.map((itm, idx) => {
                              let desc = ""
                              editdescription.map(ll => {
                                if (itm.key == ll.key) {
                                  desc = ll.description
                                }
                              })
                              return (
                                <>
                                  <tr id={"nested" + idx} key={idx}>
                                    <td>
                                      <Row className="inner mb-3">
                                        <Col md="12" className="col-8">
                                          <Input
                                            type="text"
                                            className="inner form-control"
                                            placeholder={"Title... " + idx}
                                            onChange={e => changedata(e, idx)}
                                            defaultValue={itm.data}
                                          />
                                        </Col>
                                      </Row>
                                    </td>
                                    <td>
                                      <Row className="inner mb-3">
                                        <Col md="9" className="col-8">
                                          <Input
                                            type="text"
                                            className="inner form-control"
                                            placeholder={
                                              "Description... " + idx
                                            }
                                            onChange={e =>
                                              changeDescription(e, idx)
                                            }
                                            defaultValue={desc}
                                          />
                                        </Col>
                                        <Col md="3" className="col-4">
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
                                </>
                              )
                            })
                          : ""}
                        {rows1.map((item1, idx) => {
                          let dd =
                            parseInt(idx) +
                            parseInt(2) +
                            parseInt(editdata.length)
                          return (
                            <tr id={"nested" + dd} key={idx + 2}>
                              <td>
                                <Row className="inner mb-3">
                                  <Col md="12" className="col-8">
                                    <Input
                                      type="text"
                                      className="inner form-control"
                                      placeholder={
                                        "Title... " +
                                        (idx + 2 + editdata.length)
                                      }
                                      onChange={e =>
                                        changedata(e, idx + 2 + editdata.length)
                                      }
                                    />
                                  </Col>
                                </Row>
                              </td>
                              <td>
                                <Row className="inner mb-3">
                                  <Col md="9" className="col-8">
                                    <Input
                                      type="text"
                                      className="inner form-control"
                                      placeholder={
                                        "Description... " +
                                        (idx + 2 + editdata.length)
                                      }
                                      onChange={e =>
                                        changeDescription(
                                          e,
                                          idx + 2 + editdata.length
                                        )
                                      }
                                    />
                                  </Col>
                                  <Col md="3" className="col-4">
                                    <Button
                                      onClick={e =>
                                        handleRemoveRowNested(
                                          e,
                                          idx + 2 + editdata.length
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
                          )
                        })}
                      </tbody>
                    </table>
                    <Button onClick={handleAddRowNested} color="success">
                      Add Filter
                    </Button>
                  </div>

                  {/* about */}
                  <div className="inner-repeater mb-4">
                    <Label>About :</Label>
                    <table style={{ width: "100%" }}>
                      <tbody>
                        {!edit ? (
                          <tr id="addrMain" key="">
                            <td>
                              <Row className="inner mb-3 ">
                                <Col md="12" className="col-8">
                                  <Input
                                    type="text"
                                    className="inner form-control"
                                    placeholder="Title... 1"
                                    onChange={e => changedata1(e, 1)}
                                  />
                                </Col>
                              </Row>
                            </td>
                            <td>
                              <Row className="inner mb-3 ">
                                <Col md="9" className="col-8">
                                  <textarea
                                    type="text"
                                    className="inner form-control"
                                    placeholder="Description... 1"
                                    onChange={e => changeDescription1(e, 1)}
                                  />
                                </Col>
                                <Col md="3" className="col-4">
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
                          ? editdata1.map((itm, idx) => {
                              let desc = ""
                              editdescription1.map(ll => {
                                if (itm.key == ll.key) {
                                  desc = ll.description
                                }
                              })
                              return (
                                <>
                                  <tr id={"nested1" + idx} key={idx}>
                                    <td>
                                      <Row className="inner mb-3">
                                        <Col md="12" className="col-8">
                                          <Input
                                            type="text"
                                            className="inner form-control"
                                            placeholder={"Title... " + idx}
                                            onChange={e => changedata1(e, idx)}
                                            defaultValue={itm.data}
                                          />
                                        </Col>
                                      </Row>
                                    </td>
                                    <td>
                                      <Row className="inner mb-3">
                                        <Col md="9" className="col-8">
                                          <textarea
                                            type="text"
                                            className="inner form-control"
                                            placeholder={
                                              "Description... " + idx
                                            }
                                            onChange={e =>
                                              changeDescription1(e, idx)
                                            }
                                            defaultValue={desc}
                                          ></textarea>
                                        </Col>
                                        <Col md="3" className="col-4">
                                          <Button
                                            onClick={e =>
                                              handleRemoveRowNested1(e, idx)
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
                                </>
                              )
                            })
                          : ""}
                        {rows2.map((item1, idx) => {
                          let dd =
                            parseInt(idx) +
                            parseInt(2) +
                            parseInt(editdata1.length)
                          return (
                            <tr id={"nested1" + dd} key={idx + 2}>
                              <td>
                                <Row className="inner mb-3">
                                  <Col md="12" className="col-8">
                                    <Input
                                      type="text"
                                      className="inner form-control"
                                      placeholder={
                                        "Title... " +
                                        (idx + 2 + editdata1.length)
                                      }
                                      onChange={e =>
                                        changedata1(
                                          e,
                                          idx + 2 + editdata1.length
                                        )
                                      }
                                    />
                                  </Col>
                                </Row>
                              </td>
                              <td>
                                <Row className="inner mb-3">
                                  <Col md="9" className="col-8">
                                    <textarea
                                      type="text"
                                      className="inner form-control"
                                      placeholder={
                                        "Description... " +
                                        (idx + 2 + editdata1.length)
                                      }
                                      onChange={e =>
                                        changeDescription1(
                                          e,
                                          idx + 2 + editdata1.length
                                        )
                                      }
                                    />
                                  </Col>
                                  <Col md="3" className="col-4">
                                    <Button
                                      onClick={e =>
                                        handleRemoveRowNested1(
                                          e,
                                          idx + 2 + editdata1.length
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
                          )
                        })}
                      </tbody>
                    </table>
                    <Button onClick={handleAddRowNested1} color="success">
                      Add About Filter
                    </Button>
                  </div>
                  {/* faq */}
                  <div className="inner-repeater mb-4">
                    <Label>Faq :</Label>
                    <table style={{ width: "100%" }}>
                      <tbody>
                        {!edit ? (
                          <tr id="addrMain" key="">
                            <td>
                              <Row className="inner mb-3 ">
                                <Col md="12" className="col-8">
                                  <Input
                                    type="text"
                                    className="inner form-control"
                                    placeholder="Title... 1"
                                    onChange={e => changedata2(e, 1)}
                                  />
                                </Col>
                              </Row>
                            </td>
                            <td>
                              <Row className="inner mb-3 ">
                                <Col md="9" className="col-8">
                                  <textarea
                                    type="text"
                                    className="inner form-control"
                                    placeholder="Description... 1"
                                    onChange={e => changeDescription2(e, 1)}
                                  />
                                </Col>
                                <Col md="3" className="col-4">
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
                          ? editdata2.map((itm, idx) => {
                              let desc = ""
                              editdescription2.map(ll => {
                                if (itm.key == ll.key) {
                                  desc = ll.description
                                }
                              })
                              return (
                                <>
                                  <tr id={"nested2" + idx} key={idx}>
                                    <td>
                                      <Row className="inner mb-3">
                                        <Col md="12" className="col-8">
                                          <Input
                                            type="text"
                                            className="inner form-control"
                                            placeholder={"Title... " + idx}
                                            onChange={e => changedata2(e, idx)}
                                            defaultValue={itm.data}
                                          />
                                        </Col>
                                      </Row>
                                    </td>
                                    <td>
                                      <Row className="inner mb-3">
                                        <Col md="9" className="col-8">
                                          <textarea
                                            type="text"
                                            className="inner form-control"
                                            placeholder={
                                              "Description... " + idx
                                            }
                                            onChange={e =>
                                              changeDescription2(e, idx)
                                            }
                                            defaultValue={desc}
                                          ></textarea>
                                        </Col>
                                        <Col md="3" className="col-4">
                                          <Button
                                            onClick={e =>
                                              handleRemoveRowNested2(e, idx)
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
                                </>
                              )
                            })
                          : ""}
                        {rows3.map((item1, idx) => {
                          let dd =
                            parseInt(idx) +
                            parseInt(2) +
                            parseInt(editdata2.length)
                          return (
                            <tr id={"nested2" + dd} key={idx + 2}>
                              <td>
                                <Row className="inner mb-3">
                                  <Col md="12" className="col-8">
                                    <Input
                                      type="text"
                                      className="inner form-control"
                                      placeholder={
                                        "Title... " +
                                        (idx + 2 + editdata2.length)
                                      }
                                      onChange={e =>
                                        changedata2(
                                          e,
                                          idx + 2 + editdata2.length
                                        )
                                      }
                                    />
                                  </Col>
                                </Row>
                              </td>
                              <td>
                                <Row className="inner mb-3">
                                  <Col md="9" className="col-8">
                                    <textarea
                                      type="text"
                                      className="inner form-control"
                                      placeholder={
                                        "Description... " +
                                        (idx + 2 + editdata2.length)
                                      }
                                      onChange={e =>
                                        changeDescription2(
                                          e,
                                          idx + 2 + editdata2.length
                                        )
                                      }
                                    />
                                  </Col>
                                  <Col md="3" className="col-4">
                                    <Button
                                      onClick={e =>
                                        handleRemoveRowNested2(
                                          e,
                                          idx + 2 + editdata2.length
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
                          )
                        })}
                      </tbody>
                    </table>
                    <Button onClick={handleAddRowNested2} color="success">
                      Add Faq Filter
                    </Button>
                  </div>
                  <a className="btn btn-primary" onClick={addProvider}>
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

export default ServiceProvider
