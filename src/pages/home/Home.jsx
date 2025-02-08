// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout/layout'
import myContext from '../../context/data/myContext';
import HeroSection from '../../components/heroSection/HeroSection';
import Filter from '../../components/filter/Filter';
import ProductCard from '../../components/productCard/ProductCard';
import Testimonial from '../../components/testimonial/Testimonial';
import { addToCart, deleteFromCart } from '../../redux/cartSlice';
function Home(){
    const context = useContext(myContext);
    console.log(context)
    // const {name,rollno} = context;
    // const {state,color} = context;
   
    const dispatch = useDispatch();
    const cartItem = useSelector((state)=>state.cart);

      console.log(cartItem)

    const addCart = () =>{
        dispatch(addToCart("shirt"));
    }

    const deleteCart = () =>{
          dispatch(deleteFromCart("shirt"));
    }
  return (
    // <div>Home</div>
    <Layout>
        <div className='flex gap-5 justify-center'>
            <button className='bg-gray-300 p-5' onClick={addCart}>Add</button>
            <button className='bg-gray-300 p-5' onClick={deleteCart}> Delete</button>


        </div>
        <HeroSection/>
        <Filter/>
        <ProductCard/>
        <Testimonial/> 

{/* <h1>Name: {state.name}</h1>
<h1>Rollno: {state.rollno}</h1> */}
{/* <h2>Color:{color}</h2> */}




        </Layout>
  )
}

export default Home