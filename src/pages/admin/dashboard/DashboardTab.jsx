import React, { useContext, useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import myContext from '../../../context/data/myContext';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { AiFillShopping, AiFillPlusCircle, AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function DashboardTab() {
    const context = useContext(myContext)
    // const { user } = useContext(myContext);

    const { mode, product, edithandle, deleteProduct, order, user } = context;

    const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [productPage, setProductPage] = useState(1);
  const [orderPage, setOrderPage] = useState(1);

  const itemsPerPage = 5;
  const indexOfLastProduct = productPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const indexOfLastOrder = orderPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;


  const filteredProducts = product.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.price.toString().includes(searchQuery) ||  // Price as string comparison
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.date.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === 'price') {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (sortBy === 'date') {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });


  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Filter orders by name, address, pincode, phone number, email, and date
  const filteredOrders = order.filter(item =>
    item.paymentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.customer?.name.toLowerCase().includes(searchQuery.toLowerCase()) || // Use optional chaining
    item.customer?.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.customer?.pincode.toString().includes(searchQuery) ||
    item.customer?.phoneNumber.includes(searchQuery) ||
    item.customer?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.date.toLowerCase().includes(searchQuery.toLowerCase())
);


    // Sorting orders
    const sortedOrders = filteredOrders.sort((a, b) => {
        if (sortBy === 'price') {
          return sortOrder === 'asc' ? a.cartItems[0].price - b.cartItems[0].price : b.cartItems[0].price - a.cartItems[0].price;
        } else if (sortBy === 'date') {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        }
        return 0;
      });
    
      const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    
      // Pagination logic for products and orders
      const nextProductPage = () => { if (productPage < Math.ceil(product.length / itemsPerPage)) setProductPage(productPage + 1); };
      const prevProductPage = () => { if (productPage > 1) setProductPage(productPage - 1); };
      const nextOrderPage = () => { if (orderPage < Math.ceil(order.length / itemsPerPage)) setOrderPage(orderPage + 1); };
      const prevOrderPage = () => { if (orderPage > 1) setOrderPage(orderPage - 1); };


    
    // console.log(product)
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const add = () => {
        window.location.href = '/addproduct'
    }
    return (
        <>
            <div className="container mx-auto">
                <div className="tab container mx-auto ">
                    <Tabs defaultIndex={0} className=" " >
                        <TabList className="md:flex md:space-x-8 bg-  grid grid-cols-2 text-center gap-4   md:justify-center mb-10 ">
                            <Tab>
                                <button type="button" className="font-medium border-b-2 hover:shadow-purple-700 border-purple-500 text-purple-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]  px-5 py-1.5 text-center bg-[#605d5d12] ">
                                    <div className="flex gap-2 items-center">
                                        <MdOutlineProductionQuantityLimits />Products</div> </button>
                            </Tab>
                            <Tab>
                                <button type="button" className="font-medium border-b-2 border-pink-500 bg-[#605d5d12] text-pink-500  hover:shadow-pink-700  rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]    px-5 py-1.5 text-center ">
                                    <div className="flex gap-2 items-center">
                                        <AiFillShopping /> Order
                                    </div>
                                </button>
                            </Tab>
                            <Tab>
                                <button type="button" className="font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-xl  hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]   px-5 py-1.5 text-center ">
                                    <div className="flex gap-2 items-center">
                                        <FaUser /> Users
                                    </div>
                                </button>
                            </Tab>
                        </TabList>
                        {/* product  */}
                        <TabPanel>
                            <div className='  px-4 md:px-0 mb-16'>
                                <h1 className=' text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}>Product Details</h1>

                                <div className="flex justify-between mb-4">
                <input
                  type="text"
                  placeholder="Search Products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300"
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300"
                >
                  <option value="price">Price</option>
                  <option value="date">Date</option>
                </select>

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>

                                <div className=" flex justify-end">
                                    <button
                                        onClick={add}
                                        type="button"
                                        className="focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} > <div className="flex gap-2 items-center">
                                            Add Product <FaCartPlus size={20} />
                                        </div></button>
                                </div>
                               
                                <div className="relative overflow-x-auto ">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
                                        <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    S.No
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Image
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Title
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Price
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Category
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                       
                                            {/* const { title, price, imageUrl, category, description, date, id } = item; */}
                                            {/* return ( */}
                                                <tbody className=''>
                                                {currentProducts.map((item, index) => (
                                                    <tr key={item.id || index} className="bg-gray-50 border-b  dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {index + 1}.
                                                        </td>
                                                        <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                                            <img className='w-16' src={item.imageUrl} alt="img" />
                                                        </th>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {item.title}
                                                        </td>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            ₹{item.price}
                                                        </td>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {item.category}
                                                        </td>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {item.date}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className=" flex gap-2">
                                                                <div className=" flex gap-2 cursor-pointer text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                    <div onClick={() => deleteProduct(item)}  >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                        </svg>
                                                                    </div>

                                                                    <Link to={'/updateproduct'}>
                                                                        <div onClick={() => edithandle(item)}  >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                            </svg>
                                                                        </div>
                                                                    </Link>

                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}

                                                </tbody>
                                            {/* ) */}
                                        {/* })} */}
                                    </table>

                                    <div className="flex justify-center mt-4">
                <button onClick={prevProductPage} disabled={productPage === 1}>Previous</button>
                <button onClick={nextProductPage} disabled={productPage === Math.ceil(product.length / itemsPerPage)}>Next</button>
              </div>
                                  


                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            {/* <Order order={order} setOrder={setOrder} setLoading={setLoading} /> */}
                            <div className="relative overflow-x-auto mb-16">
                                <h1 className=' text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}>Order Details</h1>


                                     {/* Search and Sort for Orders */}
              <div className="flex justify-between mb-4">
                <input
                  type="text"
                  placeholder="Search Orders"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300"
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300"
                >
                  <option value="price">Price</option>
                  <option value="date">Date</option>
                </select>

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>


                                {/* {order.map((allorder,index)=>{ */}
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" >
                                    <thead className="text-xs text-black uppercase bg-gray-200 " style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                 PaymentId
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Image
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Title
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Price
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Category
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Address
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Pincode
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Phone Number
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    {/* {allorder.cartItems.map((item,index)=>{ */}
                                        {/* // console.log(allorder) */}
                                        {/* return( */}
                                            <tbody>
                                                 {currentOrders.map((allorder, index) => {
                                                     console.log(allorder)

                                        // const {title,description,category,imageUrl,price} = allorder;
return(
                                        <tr key={allorder.id || index} className="bg-gray-50 border-b  dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                            
                                               
                                                {allorder.paymentId}
                                            </td>
                                            <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                                <img className='w-16' src={allorder.cartItems[0].imageUrl} alt="img" />
                                            </th>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {allorder.cartItems[0].title}
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                ₹{allorder.cartItems[0].price}
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                               {allorder?.cartItems[0].category}
                                            </td>

                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {allorder.addressInfo.name}
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {allorder.addressInfo.address}
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                            {allorder.addressInfo.pincode}
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                            {allorder.addressInfo.phoneNumber}
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {allorder.email}
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                               {allorder.date}
                                            </td>

                                        </tr>
                                                 );
                                                }
                                                )}
                                                 {/* ))} */}
                                    </tbody>
                                        {/* // ) */}
                                    {/* // })} */}
                                </table>
                                {/* ) */}
                                {/* // })} */}
                                
                                                {/* ) */}
                                                

<div className="flex justify-center mt-4">
                <button onClick={prevOrderPage} disabled={orderPage === 1}>Previous</button>
                <button onClick={nextOrderPage} disabled={orderPage === Math.ceil(order.length / itemsPerPage)}>Next</button>
              </div>



                              
                            </div>
                        </TabPanel>

                        <TabPanel>
                            {/* <User addressInfo={addressInfo} setAddressInfo={setAddressInfo} setLoading={setLoading} /> */}
                            <div className="relative overflow-x-auto mb-10">
                                <h1 className=' text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}>User Details</h1>
                               
                               
   {user && user.length > 0 ?(

<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">


<thead className="text-xs text-black uppercase bg-gray-200 " style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
    <tr>
        <th scope="col" className="px-6 py-3">
            S.No
        </th>

        <th scope="col" className="px-6 py-3">
            Name
        </th>
        <th scope="col" className="px-6 py-3">
            Email
        </th>
        <th scope="col" className="px-6 py-3">
            Uid
        </th>
       
    </tr>
</thead>
<tbody >

{user.map((item,index)=>{
const {name,uid,email,date} = item;

// console.log("khhhhj",user)
return(
    // {user.map((item, index) => {

    <tr key={uid} className="bg-gray-50 border-b  dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
           {index + 1}.
        </td>
        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
            {name}
        </td>
        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
            {email}
        </td>
        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
            {uid}
        </td>

    </tr>
)})}
</tbody>
</table>



):(
    <p>No users found</p>
)}
                               
                               
                          


            






                            </div>
                        </TabPanel>

                    </Tabs>
                </div>
            </div>
        </>
    )
}


export default DashboardTab