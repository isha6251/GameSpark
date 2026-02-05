// import axios from "axios";
// import { useState } from "react";
// import { DataContext } from "./DataContextInstance";

// export const DataProvider = ({ children }) => {
//     const [data, setData] = useState([]);

//     const fetchAllProducts = async () => {
//         try {
//             const res = await axios.get("https://fakestoreapi.in/api/products?limit=150");
//             const productsData = res.data.products || [];
//             setData(productsData);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         }
//     };

//     const getUniqueCategory = (dataList, property) => {
//         if (!Array.isArray(dataList)) return ["All"];
//         const newVal = dataList.map(item => item[property]);
//         return ["All", ...new Set(newVal)];
//     };

//     const categoryOnlyData = getUniqueCategory(data, "category");
//     const brandOnlyData = getUniqueCategory(data, "brand");

//     return (
//         <DataContext.Provider
//             value={{
//                 data,
//                 setData,
//                 fetchAllProducts,
//                 categoryOnlyData,
//                 brandOnlyData
//             }}>
//             {children}
//         </DataContext.Provider>
//     );
// };

import axios from "axios";
import { useState } from "react";
import { DataContext } from "./DataContextInstance";

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);

    const fetchAllProducts = async () => {
        try {
            const res = await axios.get("https://fakestoreapi.com/products?limit=150");
            const productsData = res.data || [];
            setData(productsData);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const getUniqueCategory = (dataList, property) => {
        if (!Array.isArray(dataList)) return ["All"];
        const newVal = dataList.map(item => item[property]);
        return ["All", ...new Set(newVal)];
    };

    const categoryOnlyData = getUniqueCategory(data, "category");

    return (
        <DataContext.Provider
            value={{
                data,
                setData,
                fetchAllProducts,
                categoryOnlyData,
            }}>
            {children}
        </DataContext.Provider>
    );
};
