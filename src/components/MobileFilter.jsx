import { FaFilter } from "react-icons/fa6";
import { useData } from "../context/UseData";

const MobileFilter = ({
    openFilter,
    setOpenFilter,
    search,
    setSearch,
    // brand,
    // setBrand,
    priceRange,
    setPriceRange,
    category,
    setCategory,
    // handleBrandChange,
    handleCategoryChange, }) => {
    const { categoryOnlyData, brandOnlyData } = useData();

    const toggleFilter = () => {
        setOpenFilter(!openFilter);
    };

    return (
        <>
            {/* Header */}
            <div className="bg-white flex justify-between items-center md:hidden px-4 py-3 mt-5 shadow-sm rounded-lg">
                <h1 className="font-semibold text-lg text-gray-800">Filters</h1>
                <button onClick={toggleFilter}>
                    <FaFilter className="text-gray-600 text-xl" />
                </button>
            </div>

            {/* Drawer */}
            {openFilter && (
                <div className="bg-white p-4 md:hidden shadow-md rounded-xl mt-3 space-y-6">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-gray-50 p-2 rounded-lg border border-gray-300 w-full focus:ring-2 focus:ring-blue-400 outline-none"
                    />

                    {/* Category */}
                    <div>
                        <h2 className="font-semibold text-lg text-gray-700">Category</h2>
                        <div className="flex flex-col gap-2 mt-3">
                            {categoryOnlyData?.map((item, index) => (
                                <label
                                    key={index}
                                    className="flex items-center gap-3 cursor-pointer text-gray-600">
                                    <input
                                        type="checkbox"
                                        name={item}
                                        checked={category === item}
                                        value={item}
                                        onChange={handleCategoryChange}
                                        className="w-4 h-4 text-blue-500 rounded focus:ring-blue-400" />
                                    <span className="uppercase text-sm">{item}</span>
                                </label>))}
                        </div>
                    </div>

                    {/* Brand 
                    <div>
                        <h2 className="font-semibold text-lg text-gray-700 mb-2">Brand</h2>
                        <select
                            className="bg-gray-50 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            value={brand}
                            onChange={handleBrandChange}>
                            {brandOnlyData?.map((item, index) => (
                                <option key={index} value={item}>
                                    {item.toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>*/}

                    {/* Price Range */}
                    <div>
                        <h2 className="font-semibold text-lg text-gray-700 mb-2">
                            Price Range
                        </h2>
                        <label className="text-gray-600 text-sm block mb-2">
                            ${priceRange[0]} - ${priceRange[1]}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="5000"
                            value={priceRange[1]}
                            onChange={(e) =>
                                setPriceRange([priceRange[0], Number(e.target.value)])
                            }
                            className="w-full cursor-pointer"
                        />
                    </div>

                    {/* Reset Button */}
                    <button
                        className="w-full rounded-lg py-2 font-medium 
                        shadow bg-pink-100 text-pink-600
                        hover:text-white hover:bg-pink-300 transition"
                        onClick={() => {
                            setSearch("");
                            setCategory("All");
                            // setBrand("All");
                            setPriceRange([0, 5000]);
                            setOpenFilter(false);
                        }}>
                        Reset Filters
                    </button>
                </div>
            )}
        </>
    );
};

export default MobileFilter;
