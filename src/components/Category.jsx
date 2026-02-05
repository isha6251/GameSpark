import { useNavigate } from 'react-router-dom';
import { useData } from '../context/UseData';

const Category = () => {
    const navigate = useNavigate();
    const { data } = useData();

    const getUniqueCategory = (data, property) => {
        let newVal = data?.map((curElem) => curElem[property]);
        newVal = [...new Set(newVal)];
        return newVal;
    };

    const categoryOnlyData = getUniqueCategory(data, "category");

    const pastelGradients = [
        "from-pink-200 to-purple-200",
        "from-sky-200 to-indigo-200",
        "from-green-200 to-emerald-200",
        "from-rose-200 to-pink-200",
        "from-yellow-200 to-orange-200"
    ];

    return (
        <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
            <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-10 px-4">
                {categoryOnlyData?.map((item, index) => {
                    const gradient = pastelGradients[index % pastelGradients.length];
                    return (
                        <button
                            key={index}
                            onClick={() => navigate(`/category/${item}`)}
                            className={`uppercase bg-gradient-to-r ${gradient} text-gray-700 font-medium px-5 py-2 rounded-full cursor-pointer shadow-md sm:hover:scale-105 transition-all`}>
                            {item}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Category;
