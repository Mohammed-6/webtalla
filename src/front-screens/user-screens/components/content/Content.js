import React from "react"
import classNames from "classnames"
import { Container } from "reactstrap"
import { Switch, Route } from "react-router-dom"

import Topbar from "./Topbar"

import Services from "../pages/Services"
import ListServices from "../pages/ListServices"
import Profile from "../pages/Profile"
import Cart from "../pages/Cart"
import userOrders from "../pages/userOrders"

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
  </Container>
)

export default Content
