import React, { useEffect, useState } from "react"
import { NavItem, NavLink, Nav } from "reactstrap"
import classNames from "classnames"
import { Link, withRouter } from "react-router-dom"
import axios from "axios"
const create = axios.create()

const SideBar = ({ isOpen, toggle, navigation }) => {
  const [axiosvertical, setAxiosvertical] = useState([])
  useEffect(() => {
    create
      .post(process.env.REACT_APP_BASEURL + "adslots/vertical_index")
      .then(res => {
        // console.log(res.data.data)
        setAxiosvertical(res.data.data)
      })
  }, [])
  const cleanUrl = url => {
    return url.replace(/\s+/g, "-").toLowerCase()
  }
  const goThere = url => {
    history.push(`/services/${cleanUrl(url)}`)
  }
  return (
    <>
      <div className={classNames("sidebar", { "is-open": isOpen })}>
        <div className="side-menu">
          <Nav vertical className="list-unstyled pb-3">
            <p>Media Verticals</p>
            {axiosvertical.map(itm => {
              return (
                <NavItem>
                  <NavLink>
                    <Link to={`/services/${cleanUrl(itm.vertical_name)}`}>
                      {itm.vertical_name}
                    </Link>
                  </NavLink>
                </NavItem>
              )
            })}
          </Nav>
        </div>
      </div>
      {isOpen ? (
        <div
          className={classNames("leftside-bar", { "is-open": isOpen })}
          onClick={toggle}
        ></div>
      ) : (
        ""
      )}
    </>
  )
}
export default withRouter(SideBar)
