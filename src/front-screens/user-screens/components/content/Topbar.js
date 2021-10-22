import React, { useState, useEffect } from "react"
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons"
import {
  Navbar,
  Button,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap"
import { Link, withRouter } from "react-router-dom"

import Logo from "../../../../assets/front-assets/images/logo.png"

import axios from "axios"
const create = axios.create()
const Topbar = ({ toggleSidebar }, props) => {
  const [topbarIsOpen, setTopbarOpen] = useState(false)
  const [singlebtn, setSinglebtn] = useState(false)
  const [pcount, setPcount] = useState(0)

  const toggleTopbar = () => setTopbarOpen(!topbarIsOpen)

  useEffect(() => {
    // console.log(props)
    if (localStorage.getItem("isLogin") === null) {
      window.location.replace("/")
    }
    create
      .post(
        process.env.REACT_APP_BASEURL +
          "basic/addtocart?getCart=act&accessToken=" +
          localStorage.getItem("token")
      )
      .then(res => {
        setPcount(res.data)
        // console.log(res.data)
        localStorage.setItem("cartItems", false)
      })
  }, [])
  setTimeout(() => {
    if (localStorage.getItem("cartItems") !== null) {
      if (localStorage.getItem("cartItems") === true) {
        create
          .post(
            process.env.REACT_APP_BASEURL +
              "basic/addtocart?getCart=act&accessToken=" +
              localStorage.getItem("token")
          )
          .then(res => {
            setPcount(res.data)
            console.log(res.data)
            localStorage.setItem("cartItems", false)
            localStorage.setItem("cartCount", res.data)
          })
      }
    }
    // console.log(JSON.parse(localStorage.getItem("cartItems")))
  }, 1000)
  const logOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user_name")
    localStorage.removeItem("isLogin")
    window.location.replace("/")
  }
  return (
    <Navbar
      color="light"
      light
      className="navbar shadow-sm mb-5 rounded"
      expand="md"
    >
      <Button color="info" onClick={toggleSidebar}>
        <i className="fas fa-align-left" />
      </Button>
      <NavbarToggler onClick={toggleTopbar} />
      <Collapse isOpen={topbarIsOpen} navbar>
        <Nav className="ml-auto d-flex" navbar>
          <NavItem>
            <NavLink tag={Link} to={"/"}>
              <img src={Logo} alt="WebTalla" className="user-logo" />
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
      <div class="search-box me-2">
        <div class="position-relative">
          <input
            placeholder="Search..."
            type="text"
            class="form-control border-0 form-control"
          />
          <i class="bx bx-search-alt search-icon"></i>
        </div>
      </div>
      <Nav className="ml-auto d-flex" navbar>
        <NavItem>
          <NavLink tag={Link} to={"/cart"}>
            <button class="position-relative p-0 avatar-xs rounded-circle btn btn-light">
              <span class="avatar-title bg-transparent text-reset">
                <i className="fas fa-shopping-basket"></i>
              </span>
              <span class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-success p-1">
                {pcount}
              </span>
            </button>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"#"} onClick={() => setSinglebtn(!singlebtn)}>
            <i className="fas fa-user-circle"></i>
          </NavLink>
          {singlebtn ? (
            <ul class="user-options">
              <li>
                <Link to="/user-orders#">Dashboard</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <a href="#" onClick={logOut}>
                  Logout
                </a>
              </li>
            </ul>
          ) : null}
        </NavItem>
      </Nav>
    </Navbar>
  )
}

export default withRouter(Topbar)
