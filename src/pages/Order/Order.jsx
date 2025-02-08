// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import Layout from '../../components/layout/layout'
import myContext from '../../context/data/myContext';
const Order = () => {
    const context = useContext(myContext);
    const {name,rollno} = context;
    // console.log(context)


  return (


    <Layout>
        
        
        Order
        
        <h1>Name: {name}</h1>
        <h1>Rollno: {rollno}</h1>
        
        
        </Layout>

  )
}

export default Order