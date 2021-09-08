import React, { useState, useEffect } from "react"
import { Link, Redirect, useLocation, withRouter } from "react-router-dom"

import Logo from "../assets/front-assets/images/logo.png"

import Header from "./Header"
import UserHeader from "./user-screens/index"
const CheckHeader = props => {
  return (
    <>
      {localStorage.getItem("isLogin") === null ? <Header /> : <UserHeader />}
    </>
  )
}

export default withRouter(CheckHeader)
