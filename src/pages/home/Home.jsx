// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import Layout from '../../components/layout/layout'
import myContext from '../../context/data/myContext';
const Home = () => {
    const context = useContext(myContext);
    console.log(context)
    const {name,rollno} = context;
  return (
    // <div>Home</div>
    <Layout>
        
<h1>Name: {name}</h1>
<h1>Rollno: {rollno}</h1>




        </Layout>
  )
}

export default Home