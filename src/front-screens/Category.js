import React, { useState, useEffect } from "react"

import Header from "./Header"
import Footer from "./Footer"
const Category = props => {
  useEffect(() => {
    // console.log(props.coords)
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position.coords)
      },
      err => console.log(err)
    )
  }, [])

  return (
    <>
      <Header />
      <Footer />
    </>
  )
}

export default Category
