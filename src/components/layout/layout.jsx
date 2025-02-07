// eslint-disable-next-line no-unused-vars
import React from 'react'
import Navbar from '../navbar/navbar'
import Footer from '../Footer/Footer'
const layout = ({children}) => {
  return (
    <div>
        
        <Navbar/>
        <div className="content">
          {children}
        </div>
        <Footer/>
        </div>
  )
}

export default layout