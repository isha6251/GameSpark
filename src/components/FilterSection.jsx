import { useData } from "../context/UseData";

const FilterSection = ({
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

    return (
        <div className="hidden md:block bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl p-6 mt-10 h-max shadow-md">
            {/* Search */}
            <input
                type="text"
                placeholder="🔍 Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/80 text-gray-800 placeholder-gray-400 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300" />

            {/* Category */}
            <h1 className="mt-6 font-semibold text-lg text-gray-700">📂 Category</h1>
            <div className="flex flex-col gap-2 mt-3 w-30">
                {categoryOnlyData?.map((item, index) => (
                    <label
                        key={index}
                        className={`px-4 py-2 uppercase rounded-full cursor-pointer text-sm font-medium transition-all shadow-sm ${category === item
                            ? "bg-gradient-to-r from-pink-300 to-purple-300 text-gray-800 shadow-md"
                            : "bg-white/70 text-gray-600 hover:bg-pink-100"
                            }`}>
                        <input
                            type="checkbox"
                            name={item}
                            checked={category === item}
                            value={item}
                            onChange={handleCategoryChange}
                            className="hidden"
                        />
                        {item}
                    </label>
                ))}
            </div>

            {/* Brand */}
            {/* <h1 className="mt-6 font-semibold text-lg text-gray-700">🏷️ Brand</h1>
            <select
                value={brand}
                onChange={handleBrandChange}
                className="w-full mt-3 bg-white/80 text-gray-800 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
                {brandOnlyData?.map((item, index) => (
                    <option key={index} value={item}>
                        {item.toUpperCase()}
                    </option>
                ))}
            </select> */}

            {/* Price Range */}
            <h1 className="mt-6 font-semibold text-lg text-gray-700">💲 Price Range</h1>
            <div className="flex flex-col gap-2 mt-2">
                <label className="text-gray-600 text-sm">
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
                    className="w-full accent-pink-400 cursor-pointer"
                />
            </div>

            {/* Reset Button */}
            <button
                onClick={() => {
                    setSearch("");
                    setCategory("All");
                    // setBrand("All");
                    setPriceRange([0, 5000]);
                }}
                className="w-full mt-6 py-2 rounded-lg bg-gradient-to-r from-pink-300 to-purple-300 text-gray-800 font-semibold shadow-md hover:opacity-90 transition"
            >
                Reset Filters
            </button>
        </div>
    );
};

export default FilterSection;
