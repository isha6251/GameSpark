import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../assets/Loading4.webm";
import Breadcrums from "../components/Breadcrums";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    // const getSingleProduct = async () => {
    //     try {
    //         setLoading(true);
    //         const { data } = await axios.get(
    //             `https://fakestoreapi.in/api/products/${id}`
    //         );
    //         setProduct(data.product);
    //     } catch (error) {
    //         console.error("Product fetch error:", error);
    //         toast.error(
    //             error.response?.data?.message ||
    //             "Failed to load product. Please try again."
    //         );
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const getSingleProduct = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `https://fakestoreapi.com/products/${id}`
            );
            setProduct(data);
        } catch (error) {
            console.error("Product fetch error:", error);
            toast.error(
                error.response?.data?.message ||
                "Failed to load product. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSingleProduct();
        window.scrollTo(0, 0);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <video muted autoPlay loop>
                    <source src={Loading} type="video/webm" />
                </video>
            </div>
        );
    }

    if (!product) {
        return (
            <p className="text-center mt-10 text-gray-600">
                Product not found or unavailable.
            </p>
        );
    }
    // Add Discount
    const originalPrice = Math.round(
        product.price + (product.price * product.discount) / 100
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4 py-5 sm:py-10">
            <div className="max-w-7xl mx-auto">
                <Breadcrums title={product.title} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10 sm:mt-6">
                    {/* Product Image */}
                    <div className="bg-white rounded-3xl shadow-lg p-5 flex items-center justify-center">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="rounded-2xl max-h-[250px] sm:max-h-[400px] object-contain"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-8 flex flex-col gap-6">
                        <h1 className="md:text-3xl sm:text-2xl text-xl font-bold text-gray-800">
                            {product.title}
                        </h1>

                        <div className="text-gray-500 font-medium text-xs">
                            {product.brand?.toUpperCase()} / {product.category?.toUpperCase()} /{" "}
                            {product.model}
                        </div>

                        <p className="text-xl sm:text-2xl font-bold text-pink-600 flex items-center gap-3">
                            ${product.price}
                            <span className="line-through text-gray-400 text-lg">
                                ${originalPrice}
                            </span>
                            <span className="bg-pink-500 text-white text-sm px-3 py-1 rounded-full">
                                {product.discount}% OFF
                            </span>
                        </p>

                        <p className="text-gray-600 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4">
                            <label className="text-sm font-medium text-gray-700">
                                Quantity:
                            </label>
                            <input
                                type="number"
                                min={1}
                                defaultValue={1}
                                className="w-20 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                            />
                        </div>

                        {/* Add to Cart Button */}
                        <div className="flex gap-4 mt-5">
                            <button
                                onClick={() => addToCart(product)}
                                className="flex items-center justify-center gap-2 p-2 md:px-4 md:py-2 text-lg 
                                bg-pink-100 text-pink-600 hover:text-white hover:bg-pink-300 font-light 
                                sm:font-semibold rounded-xl shadow-md hover:scale-105 transition-all "
                            >
                                <IoCartOutline className="w-6 h-6" /> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Loading from "../assets/Loading4.webm";
// import Breadcrums from "../components/Breadcrums";
// import { IoCartOutline } from "react-icons/io5";
// import { useCart } from "../context/CartContext";
// import { toast } from "react-toastify";

// const SingleProduct = () => {
//     const { id } = useParams();
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const { addToCart } = useCart();

//     const getSingleProduct = async () => {
//         try {
//             setLoading(true);
//             const { data } = await axios.get(
//                 `https://fakestoreapi.com/products/${id}`
//             );
//             setProduct(data);
//         } catch (error) {
//             console.error("Product fetch error:", error);
//             toast.error(
//                 error.response?.data?.message ||
//                 "Failed to load product. Please try again."
//             );
//         } finally {
//             setLoading(false);
//         }
//     };


//     useEffect(() => {
//         getSingleProduct();
//         window.scrollTo(0, 0);
//     }, []);

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-screen">
//                 <video muted autoPlay loop>
//                     <source src={Loading} type="video/webm" />
//                 </video>
//             </div>
//         );
//     }
//     if (!product) {
//         return (
//             <p className="text-center mt-10 text-gray-600">
//                 Product not found or unavailable.
//             </p>
//         );
//     }

//     // Add Discount
//     const originalPrice = Math.round(
//         product.price + (product.price * product.discount) / 100
//     );

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4 py-10">
//             <div className="max-w-6xl mx-auto">
//                 <Breadcrums title={product.title} />

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
//                     {/* Product Image */}
//                     <div className="bg-white rounded-3xl shadow-lg p-6 flex items-center justify-center">
//                         <img
//                             src={product.image}
//                             alt={product.title}
//                             className="rounded-2xl max-h-[500px] object-contain"
//                         />
//                     </div>

//                     {/* Product Details */}
//                     <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col gap-6">
//                         <h1 className="md:text-3xl text-2xl font-bold text-gray-800">
//                             {product.title}
//                         </h1>

//                         <div className="text-gray-500 font-medium">
//                             {product.brand?.toUpperCase()} / {product.category?.toUpperCase()} /{" "}
//                             {product.model}
//                         </div>

//                         <p className="text-2xl font-bold text-pink-600 flex items-center gap-3">
//                             ${product.price}
//                             <span className="line-through text-gray-400 text-lg">
//                                 ${originalPrice}
//                             </span>
//                             <span className="bg-pink-500 text-white text-sm px-3 py-1 rounded-full">
//                                 {product.discount}% OFF
//                             </span>
//                         </p>

//                         <p className="text-gray-600 leading-relaxed">
//                             {product.description}
//                         </p>

//                         {/* Quantity Selector */}
//                         <div className="flex items-center gap-4">
//                             <label className="text-sm font-medium text-gray-700">
//                                 Quantity:
//                             </label>
//                             <input
//                                 type="number"
//                                 min={1}
//                                 defaultValue={1}
//                                 className="w-20 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
//                             />
//                         </div>

//                         {/* Add to Cart Button */}
//                         <div className="flex gap-4 mt-6">
//                             <button
//                                 onClick={() => addToCart(product)}
//                                 className="flex items-center justify-center gap-2 px-6 py-3 text-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-all md:px-3 md:py-2"
//                             >
//                                 <IoCartOutline className="w-6 h-6" /> Add to Cart
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default SingleProduct;
