import React, { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  withRouter,
  Redirect,
  useHistory,
} from "react-router-dom"

import SideBar from "./components/sidebar/SideBar"
import Content from "./components/content/Content"

const UserHeader = props => {
  const [sidebarIsOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen)
  useEffect(() => {
    // console.log(props)
  }, [])
  const history = useHistory()
  const mainRedirect = data => {
    console.log(data)
    history.push("/our-services/")
    // return <Redirect to={`/services/${data} `} />
  }
  return (
    <div className="App wrapper">
      <SideBar
        toggle={toggleSidebar}
        isOpen={sidebarIsOpen}
        mainRedirect={mainRedirect}
      />
      <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
    </div>
  )
}

export default withRouter(UserHeader)
