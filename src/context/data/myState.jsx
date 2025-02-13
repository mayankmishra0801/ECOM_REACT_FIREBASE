// eslint-disable-next-line no-unused-vars
import React,{useEffect, useState} from 'react'
// import { useState } from 'react';
import MyContext from './myContext'
// import { Description } from '@headlessui/react';
import { doc, onSnapshot,addDoc, orderBy, query, setDoc, Timestamp, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';
function MyState(props) {

  const [mode,setMode] = useState('light');
    
  
  const toggleMode = () => {
    if(mode === 'light'){
        setMode("dark");
        document.body.style.backgroundColor = 'rgb(17,24,39';
    }else{
        setMode("light");
        document.body.style.backgroundColor = 'white';
    }
  }
     
  const [loading,setLoading] = useState(false);

  const [products, setproducts] = useState({
       
        title:null,
        price:null,
        imageUrl:null,
        category:null,
        description:null,
        time:Timestamp.now(),
        date: new Date().toLocaleString(
             
            "en-US",
            {
                month:"short",
                day:"numeric",
                year:"numeric"
            }
        )


  });



  const addProduct = async() => {

       if(products.title == null || products.price == null
       || products.imageUrl == null || products.category == null
       || products.description == null){
           return toast.error("All fields are required");
       }

       setLoading(true);

       try{

           const productRef = collection(fireDB,"products");
           await addDoc(productRef,products);
           toast.success("Product added successfully");
           setTimeout(()=>{
            window.location.href='/dashboard';

           },800)
           getProductData();
        //    closeModal();
           setLoading(false);

       }catch(error){
           console.log(error)
           setLoading(false);

       }
       
  }
 

  const [product, setProduct] = useState([])

  const getProductData = async()=>{
        setLoading(true);
        try{
            const q = query(collection(fireDB,
                "products"
            ),
            orderBy("time","desc")
        );

        const data = onSnapshot(q,(QuerySnapshot)=>{
            let productArray = [];
            QuerySnapshot.forEach((doc)=>{
                  
                      
                    productArray.push({
                        ...doc.data(),
                        id:doc.id
                    });
                });
                    setProduct(productArray);
                     setLoading(false);



                  });
                  
                  return () => data;
                
        }catch(error){
                console.log(error);
                setLoading(false);
            }
    
        }

        useEffect(() => {         
            getProductData();
        },[])

  

//   const [product, setProduct] = useState({
//     title:null,
//     price:null,
//     imageUrl:null,
//     category:null,

//   })

    // const state = {
    //             name:"Mayank",
    //             rollno:20
    //         }

    //         const color = "red"

    const edithandle = (item)=>{
        setProduct(item);

    }

    const updateProduct = async()=>{
      setLoading(true);
      try{
        if (products && products.id) {
        await setDoc(doc(fireDB,'products',products?.id),products);
        toast.success("Product updated successfully");
        setTimeout(()=>{
            window.location.href='/dashboard';
        },800)
        getProductData();
    }else{
        toast.error("Product data or id missing");
    }
        setLoading(false);

      }catch(error){
          
          setLoading(false);
          console.log(error);
      }
    //   setProducts("");
    }

     const deleteProduct = async(item)=>{
        
        try{
            setLoading(true);
            await deleteDoc(doc(fireDB,'products',item.id));
            toast.success("Product deleted successfully");
            setLoading(false);
            getProductData();

        }catch(error){
             
            setLoading(false);
            console.log(error);
        }


     }



     const [order, setOrder] = useState([]);

     const getOrderData = async () => {
       setLoading(true)
       try {
         const result = await getDocs(collection(fireDB, "order"))
         const ordersArray = [];
         result.forEach((doc) => {
           ordersArray.push(doc.data());
           setLoading(false)
         });
         setOrder(ordersArray);
         console.log(ordersArray)
         setLoading(false);
       } catch (error) {
         console.log(error)
         setLoading(false)
       }
     }
   
   
     useEffect(() => {
       getProductData();
       getOrderData()
   
     }, []);


     const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "user"))
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false)
      });
      setUser(usersArray);
      console.log(usersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }




  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();
  }, []);


  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')




        
          return (
        
        
            // <MyContext.Provider value={{state,color}}>
            <MyContext.Provider value={{mode,toggleMode,loading,setLoading,
                products,setproducts,addProduct,product,
                edithandle,updateProduct,deleteProduct,
                order,user,searchkey, setSearchkey,filterType,setFilterType,filterPrice,setFilterPrice
            }}>

              
                 
                 {props.children}
        
        
            </MyContext.Provider>
        
          
        
        )




 
}

export default MyState