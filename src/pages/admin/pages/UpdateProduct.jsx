import React, { useContext } from 'react'
import myContext from '../../../context/data/myContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function UpdateProduct() {
    const context = useContext(myContext);
    const { products, setproducts, updateProduct } = context;
    const navigate = useNavigate();

    // const title = products?.title || '';
    // const price = products?.price || '';
    // const imageUrl = products?.imageUrl || '';
    // const category = products?.category || '';
    // const description = products?.description || '';

    const { title, price, imageUrl, category, description, id } = products;
    const handleUpdate = async () => {
        if (!title || !price || !imageUrl || !category || !description) {
            toast.error("All fields are required!");
            return;
        }

        try {
            // Proceed with the update logic
            await updateProduct();  // Assuming updateProduct handles the Firestore update
            toast.success("Product updated successfully");

            // Navigate to the dashboard after update
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            toast.error("Error updating product");
        }
    };
    return (
        <div>
            <div className=' flex justify-center items-center h-screen'>
                <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Update Product</h1>
                    </div>
                    <div>
                        <input type="text"
                            value={title || ''}
                            onChange={(e) => setproducts({ ...products, title: e.target.value })}
                            name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product title'
                        />
                    </div>
                    <div>
                        <input type="text"
                            value={price || ''}
                            onChange={(e) => setproducts({ ...products, price: e.target.value })}
                            name='price'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product price'
                        />
                    </div>
                    <div>
                        <input type="text"
                            value={imageUrl || ''}
                            onChange={(e) => setproducts({ ...products, imageUrl: e.target.value })}
                            name='imageurl'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product imageUrl'
                        />
                    </div>
                    <div>
                        <input type="text"
                            value={category || ''}
                            onChange={(e) => setproducts({ ...products, category: e.target.value })}
                            name='category'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product category'
                        />
                    </div>
                    <div>
                        <textarea cols="30" rows="10" name='title'
                         value={description || ''}
                         onChange={(e) => setproducts({ ...products, description: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product desc'>

                        </textarea>
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <button
                        onClick={updateProduct}
                            className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                            Update Product
                        </button>
                    </div>
                 
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct