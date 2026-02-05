// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import Loading from "../assets/Loading4.webm"
// import { ChevronLeft } from 'lucide-react'
// import ProductListView from '../components/ProductListView'

// const CategoryProduct = () => {
//     const [searchData, setSearchData] = useState([])
//     const params = useParams()
//     const category = params.category
//     const navigate = useNavigate()


//     const getFilterData = async () => {
//         try {
//             const res = await axios.get(`https://fakestoreapi.in/api/products/category?type=${category}`)
//             const data = res.data.products
//             setSearchData(data)

//         } catch (error) {
//             console.error(error)
//         }
//     }

//     useEffect(() => {
//         getFilterData()
//         window.scrollTo(0, 0)
//     }, [])

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
//             {
//                 searchData.length > 0 ? (
//                     <div className="max-w-6xl mx-auto py-15 px-4">
//                         {/* Back Button */}
//                         <button
//                             onClick={() => navigate('/')}
//                             className="flex items-center gap-2 px-4 py-2 mb-6 rounded-xl shadow-md 
//                             bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium 
//                             hover:shadow-lg hover:scale-105 transition-all duration-300"
//                         >
//                             <ChevronLeft size={18} /> Back
//                         </button>

//                         {/* Category Title */}
//                         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 capitalize">
//                             {category} <span className="text-pink-500">Products</span>
//                         </h1>

//                         {/* Product List */}
//                         <div className="grid gap-6">
//                             {searchData.map((product) => (
//                                 <ProductListView key={product.id} product={product} />
//                             ))}
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
//                         <video muted autoPlay loop className="w-40 h-40">
//                             <source src={Loading} type="video/webm" />
//                         </video>
//                         <p className="text-lg font-medium text-gray-600 animate-pulse">
//                             Loading {category} products...
//                         </p>
//                     </div>
//                 )
//             }
//         </div>
//     )
// }

// export default CategoryProduct


import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from "../assets/Loading3.webm"
import { ChevronLeft } from 'lucide-react'
import ProductListView from '../components/ProductListView'

const CategoryProduct = () => {
    const [searchData, setSearchData] = useState([])
    const params = useParams()
    const category = params.category
    const navigate = useNavigate()

    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                const res = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
                if (isMounted) setSearchData(res.data);
            } catch (err) {
                console.error("Category fetch error:", err);
            }
        })();

        window.scrollTo(0, 0);
        return () => { isMounted = false; };
    }, [category]);

    return (
        <div>
            {
                searchData.length > 0 ? (
                    <div className='max-w-6xl mx-auto mt-10 mb-10 px-4'>
                        <button
                            onClick={() => navigate('/')}
                            className='bg-pink-100 text-pink-600 sm:text-xl mb-5 px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center'
                        >
                            <ChevronLeft /> Back
                        </button>
                        {
                            searchData.map((product) => (
                                <ProductListView key={product.id} product={product} />
                            ))
                        }
                    </div>
                ) : (
                    <div className='flex items-center justify-center h-[400px]'>
                        <video muted autoPlay loop>
                            <source src={Loading} type='video/webm' />
                        </video>
                    </div>
                )
            }
        </div>
    )
}

export default CategoryProduct
