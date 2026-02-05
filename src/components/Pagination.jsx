const getPages = (current, total) => {
    const pages = [];
    if (total <= 5) {
        for (let i = 1; i <= total; i++) {
            pages.push(i);
        }
    } else {
        if (current <= 3) {
            pages.push(1, 2, 3, "...", total);
        } else if (current >= total - 2) {
            pages.push(1, "...", total - 2, total - 1, total);
        } else {
            pages.push(1, "...", current - 1, current, current + 1, "...", total);
        }
    }
    return pages;
};

const Pagination = ({ page, pageHandler, dynamicPage }) => {
    return (
        <div className="mt-10 flex items-center justify-center gap-3">
            {/* Prev Button */}
            <button
                disabled={page === 1}
                className={`px-4 py-2 rounded-xl font-medium shadow-md transition-all duration-300 
                ${page === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-pink-300 to-purple-300 text-black hover:shadow-lg sm:hover:scale-105"
                    }`}
                onClick={() => pageHandler(page - 1)}
            >
                Prev
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
                {getPages(page, dynamicPage)?.map((item, index) => (
                    <span
                        key={index}
                        onClick={() => typeof item === "number" && pageHandler(item)}
                        className={`px-3 py-1 rounded-lg cursor-pointer transition-all duration-300
                        ${item === page
                                ? "bg-gradient-to-r from-pink-300 to-purple-300 text-black font-bold shadow-md scale-110"
                                : "bg-white text-gray-700 hover:bg-pink-100 hover:text-pink-600 shadow"
                            }`}
                    >
                        {item}
                    </span>
                ))}
            </div>

            {/* Next Button */}
            <button
                disabled={page === dynamicPage}
                className={`px-4 py-2 rounded-xl font-medium shadow-md transition-all duration-300 
                ${page === dynamicPage
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-pink-300 to-purple-300 text-black hover:shadow-lg sm:hover:scale-105"
                    }`}
                onClick={() => pageHandler(page + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
