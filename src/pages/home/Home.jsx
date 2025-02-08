// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import Layout from '../../components/layout/layout'
import myContext from '../../context/data/myContext';
import HeroSection from '../../components/heroSection/HeroSection';
import Filter from '../../components/filter/Filter';
// import ProductCard from '../../components/productCard/ProductCard';
import Testimonial from '../../components/testimonial/Testimonial';
const Home = () => {
    const context = useContext(myContext);
    console.log(context)
    // const {name,rollno} = context;
    // const {state,color} = context;

  return (
    // <div>Home</div>
    <Layout>
        <HeroSection/>
        <Filter/>
        {/* <ProductCard/> */}
        <Testimonial/> 

{/* <h1>Name: {state.name}</h1>
<h1>Rollno: {state.rollno}</h1> */}
{/* <h2>Color:{color}</h2> */}




        </Layout>
  )
}

export default Home