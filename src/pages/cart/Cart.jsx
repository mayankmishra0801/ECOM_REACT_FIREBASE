import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/layout';
import Modal from '../../components/modal/Modal';
import {useDispatch ,useSelector } from 'react-redux';
import { deleteFromCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import { setCartItems } from '../../redux/cartSlice';
// import Loader from '../../components/loader/Loader';
// import { configDotenv } from 'dotenv';
function Cart() {

  const context = useContext(myContext)
  const { mode } = context;

  const dispatch = useDispatch();
  

  const  cartItems = useSelector((state)=>state.cart);

  const [selectedItems,setSelecteditems] = useState([]);

//   const [isModalOpen,setIsModalOpen] = useState(false);
  const [isAnyItemsSelected,setIsAnyItemSelected] = useState(false);

  const toggleItemSelection = (item) =>{
    setSelecteditems((prevSelectedItems)=>
     prevSelectedItems.includes(item)? prevSelectedItems.filter((selectedItems)=>selectedItems !== item)
    : [...prevSelectedItems,item]
    )
  }

  useEffect(()=>{
    setIsAnyItemSelected(selectedItems.length > 0)
  },[selectedItems])

//   useEffect(() => {
//     // Save cart items to localStorage whenever they change
//     localStorage.setItem('cart', JSON.stringify(cartItems));
//   }, [cartItems]);
  

//   const deleteCart =  (item) =>{
//     dispatch(deleteFromCart(item));
//     toast.success("Delete Cart");
//   }

const deleteCart = (item) => {
    // Remove from Redux cart
    dispatch(deleteFromCart(item));
    
    // Retrieve the user data
    const user = JSON.parse(localStorage.getItem('user'));

    // If the user is logged in, update their specific cart
    if (user) {
        const currentCart = JSON.parse(localStorage.getItem(`cart_${user.uid}`)) || [];
        const updatedCart = currentCart.filter(cartItem => cartItem.id !== item.id);
        localStorage.setItem(`cart_${user.uid}`, JSON.stringify(updatedCart));  // Save updated cart
    } else {
        // For guest users, remove from the general cart
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = currentCart.filter(cartItem => cartItem.id !== item.id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));  // Save updated cart
    }

    toast.success("Cart item deleted");
};


//   useEffect(()=>{
//     localStorage.setItem('cart',JSON.stringify(cartItems));
//   },[cartItems])

useEffect(() => {
    // Get user ID from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        // Save cart items to localStorage for the logged-in user (using their UID)
        localStorage.setItem(`cart_${user.uid}`, JSON.stringify(cartItems));
    }else{
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }
}, [cartItems]);


// useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (user) {
//       // Load the cart for the specific user
//       const savedCart = JSON.parse(localStorage.getItem(`cart_${user.uid}`));
//       if (savedCart) {
//         dispatch(setCartItems(savedCart)); // Dispatch to set cart in Redux
//       }
//     }
//   }, []);

useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        // Fetch user-specific cart from localStorage and update Redux
        const savedCart = JSON.parse(localStorage.getItem(`cart_${user.uid}`));
        if (savedCart) {
            dispatch(setCartItems(savedCart));  // Set Redux store with saved cart
        }
    } else {
        // Fetch global cart if user is not logged in
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            dispatch(setCartItems(savedCart));  // Set Redux store with saved cart
        }
    }
}, [dispatch]);

  

  const [totalAmount,setTotalAmount] = useState(0);
//   useEffect(()=>{
//     let temp = 0;
//     cartItems.forEach((cartItem)=>{
//         temp = temp + parseInt(cartItem.price);
//     })
//     setTotalAmount(temp);
//     console.log(temp)
//   },[cartItems])

useEffect(()=>{
    let temp = 0;
    selectedItems.forEach((cartItems)=>{
        temp += parseInt(cartItems.price);
    });
    setTotalAmount(temp);
},[selectedItems])
   
  console.log(cartItems)

  const shipping = parseInt(100);
  const grandTotal = totalAmount + shipping; 

  const [name,setName] = useState('');
  const [address,setAddress] = useState('');
  const [pincode,setPincode] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');

  const buyNow = async() =>{
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
        return toast.error("All fields are required", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
  }

  const addressInfo ={
    name,
    address,
    pincode,
    phoneNumber,
    date:new Date().toLocaleString(
        "en-US",
        {
            month:"short",
            day:"2-digit",
            year:"numeric"
        }
    )
  }

  var options = {
    key: import.meta.env.VITE_RAZORPAY_KEY, // Use environment variable for Razorpay key
    key_secret: import.meta.env.VITE_RAZORPAY_KEY_SECRET,
    amount: parseInt(grandTotal * 100),
    currency: "INR",
    order_receipt: 'order_rcptid_' + name,
    name: "E-Bharat",
    description: "for testing purpose",
    handler: function (response) {

      // console.log(response)
      toast.success('Payment Successful')

      const paymentId = response.razorpay_payment_id
      // store in firebase 
      const orderInfo = {
        cartItems,
        addressInfo,
        date: new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        ),
        email: JSON.parse(localStorage.getItem("user")).user.email,
        userid: JSON.parse(localStorage.getItem("user")).user.uid,
        paymentId
      }

      try {
        const orderRef= collection(fireDB,"order");
        addDoc(orderRef,orderInfo)
        selectedItems.forEach(item => {
            dispatch(deleteFromCart(item));
          });
          let updatedCartItems = cartItems.filter(item => !selectedItems.includes(item));
        // localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            localStorage.setItem(`cart_${user.uid}`, JSON.stringify(updatedCartItems));  // Save to localStorage under user-specific key
        } else {
            localStorage.setItem('cart', JSON.stringify(updatedCartItems));  // Save to general cart if no user is logged in
        }
     setSelecteditems([])
     setTotalAmount(0)
        // Optionally, show the success message after removing the items from cart
        // toast.success("Selected items removed from the cart");
        const result = addDoc(collection(fireDB, "orders"), orderInfo)
      } catch (error) {
        console.log(error)
      }
    },

    theme: {
      color: "#3399cc"
    }
  };
  var pay = new window.Razorpay(options);
  pay.open();
  console.log(pay)
}

//   console.log(addressInfo)

  console.log(grandTotal)


  return (
    <Layout >
      <div className="h-screen bg-gray-100 pt-5 mb-[60%] " style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
          <div className="rounded-lg md:w-2/3 ">

              {cartItems.length === 0 ? (
                <p className="text-center text-gray-700">Your cart is empty.</p>
              ):(

                cartItems.map((item,index)=>{
                    const {title,price,description,imageUrl} = item;
                    return (
                        <div key={item.id || index} className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                        <img src={imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                          <div className="mt-5 sm:mt-0">
                            <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{title}</h2>
                            <h2 className="text-sm  text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{description}</h2>
                            <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{price}</p>
                          </div>
                          <div onClick={()=>deleteCart(item)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
          
                          </div>


                         <input type="checkbox" checked={selectedItems.includes(item)}
                          onChange={()=>toggleItemSelection(item)}/>




                        </div>
                      </div>



                    )
                  })

              )}

                 

          

          </div>



       {cartItems.length > 0 && (
    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
    <div className="mb-2 flex justify-between">
      <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
      <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{totalAmount}</p>
    </div>
    <div className="flex justify-between">
      <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
      <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{shipping}</p>
    </div>
    <hr className="my-4" />
    <div className="flex justify-between mb-3">
      <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
      <div className>
        <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{grandTotal}</p>
      </div>
    </div>
    {/* <Modal  /> */}


<Modal
 isAnyItemsSelected={isAnyItemsSelected}
 name={name}
 addressInfo={address}
 pincode={pincode}
 phoneNumber={phoneNumber}
 setName={setName}
 setAddress={setAddress}
 setPincode={setPincode}
 setPhoneNumber={setPhoneNumber}
buyNow={buyNow}
/>

  </div>
       )}

      
        </div>
      </div>
    </Layout>
  )
}

export default Cart