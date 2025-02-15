import React, { useContext, useEffect,useState } from 'react'
import Filter from '../../components/filter/Filter'
// import ProductCard from '../../components/productCard/ProductCard'
import Layout from '../../components/layout/layout'
import myContext from '../../context/data/myContext'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import { toast } from 'react-toastify'

function Allproducts() {
  const context = useContext(myContext)
  const { mode, product ,searchkey, setSearchkey,filterType,setFilterType,
      filterPrice,setFilterPrice} = context

  const dispatch = useDispatch()
  const cartItems = useSelector((state)=> state.cart);
  console.log(cartItems)

//   const addCart = (product)=> {
//       dispatch(addToCart(product));
//       toast.success('add to cart');

//   }

const addCart = (product) => {
    // Add to Redux cart
    dispatch(addToCart(product));

    // Retrieve the user data
    const user = JSON.parse(localStorage.getItem('user'));

    // If the user is logged in, store the updated cart in localStorage with user-specific key
    if (user) {
        const currentCart = JSON.parse(localStorage.getItem(`cart_${user.uid}`)) || [];
        currentCart.push(product);
        localStorage.setItem(`cart_${user.uid}`, JSON.stringify(currentCart));  // Save to user-specific cart
    } else {
        // If no user is logged in, save cart globally
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        currentCart.push(product);
        localStorage.setItem('cart', JSON.stringify(currentCart));  // Save to general cart
    }

    toast.success('Added to cart');
};

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredProducts = product.filter((obj)=>
    obj.title.toLowerCase().includes(searchkey)
).filter((obj)=>obj.category.toLowerCase().includes(filterType)).filter((obj)=>obj.price.includes(filterPrice))


   const indexOfLastProduct = currentPage*itemsPerPage
   const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
   const currentProducts = filteredProducts.slice(indexOfFirstProduct,indexOfLastProduct)

   const paginate = (pageNumber)=> setCurrentPage(pageNumber)
   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)


//   useEffect(() => {
//       localStorage.setItem('cart', JSON.stringify(cartItems));
//   }, [cartItems])

useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));  // Get user data from localStorage

    if (user) {
        // If user exists, store cart items under the user-specific key
        localStorage.setItem(`cart_${user.uid}`, JSON.stringify(cartItems));
    }
    else {
        // If no user is logged in, store cart items globally under a general cart key
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }
}, [cartItems]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <Filter/>
      <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Our Latest Collection</h1>
                    <div class="h-1 w-20 bg-pink-600 rounded"></div>
                </div>

                <div className="flex flex-wrap -m-4">
                    {/* {product.filter((obj)=> obj.title.toLowerCase().includes(searchkey))
                     .filter((obj) => obj.category.toLowerCase().includes(filterType))
                     .filter((obj) => obj.price.includes(filterPrice)).map((item, index) => { */}
 {currentProducts.map((item, index) => {

                        const { title, price, description, imageUrl,id } = item;
                        return (
                            <div onClick={()=> window.location.href = `/productinfo/${id}`}   key={index} className="p-4 md:w-1/4  drop-shadow-lg " >
                                <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                    <div className="flex justify-center cursor-pointer" >
                                        <img className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out" src={imageUrl} alt="blog" />
                                    </div>
                                    <div className="p-5 border-t-2">
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>E-Bharat</h2>
                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '', }}>{title}</h1>
                                        {/* <p className="leading-relaxed mb-3">{item.description.}</p> */}
                                        <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{price}</p>
                                        <div className=" flex justify-center">
                                            <button type="button" 
                                            onClick={()=> addCart(item)}
                                            className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2">Add To Cart</button>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })}




                </div>

                <div className='flex justify-center mt-8'>
                    <button onClick={()=>paginate(currentPage-1)} disabled={currentPage === 1}
                        className="px-4 py-2 text-white bg-pink-600 hover:bg:pink-700 rounded-md mx-2"
                        >
                         Previous
                    </button>
                    <span className='text-lg font-medium mx-2'>Page {currentPage} of {totalPages}</span>
                    <button
                     onClick={()=>paginate(currentPage+1)}
                     disabled={currentPage === totalPages}
                     className='px-4 py-2 text-white bg-pink-600 hover:bg-pink-700 rounded-md mx-2'
                    >
                        Next

                    </button>
                </div>

            </div>
        </section >
    </Layout>
  )
}

export default Allproducts