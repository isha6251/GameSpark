import { useEffect, useState, useMemo } from 'react';
import { useData } from '../context/UseData';
import FilterSection from '../components/FilterSection';
import Loading from "../assets/Loading3.webm";
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import Lottie from 'lottie-react';
import notfound from "../assets/notfound.json";
import MobileFilter from '../components/MobileFilter';

const Products = () => {
  const { data, fetchAllProducts } = useData();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo(0, 0);
  };

  const filteredData = useMemo(() => {
    return data?.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );
  }, [data, search, category, brand, priceRange]);

  const dynamicPage = Math.ceil(filteredData?.length / 12);

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 mb-10'>
        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          search={search}
          setSearch={setSearch}
          brand={brand}
          setBrand={setBrand}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          category={category}
          setCategory={setCategory}
          handleCategoryChange={handleCategoryChange}
          handleBrandChange={handleBrandChange}
        />

        {data?.length > 0 ? (
          <div className='flex gap-9'>
            <FilterSection
              search={search}
              setSearch={setSearch}
              brand={brand}
              setBrand={setBrand}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              category={category}
              setCategory={setCategory}
              handleCategoryChange={handleCategoryChange}
              handleBrandChange={handleBrandChange}
            />

            {filteredData?.length > 0 ? (
              <div className='flex flex-col justify-center items-center'>
                <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-2 md:gap-7 mt-10'>
                  {filteredData
                    .slice(page * 12 - 12, page * 12)
                    .map((product, index) => (
                      <ProductCard key={index} product={product} />
                    ))}
                </div>
                <Pagination
                  pageHandler={pageHandler}
                  page={page}
                  dynamicPage={dynamicPage}
                />
              </div>
            ) : (
              <div className='flex justify-center items-center md:h-[600px] md:w-[900px] mt-10'>
                <Lottie animationData={notfound} className='w-[500px]' />
              </div>
            )}
          </div>
        ) : (
          <div className='flex items-center justify-center h-[400px]'>
            <video muted autoPlay loop>
              <source src={Loading} type='video/webm' />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
