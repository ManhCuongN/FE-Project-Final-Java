// components
import ProductGridItem from '@components/ProductGridItem';
import Select from '@ui/Select';
import Pagination from '@ui/Pagination';
import CategoryHeader from '@ui/CategoryHeader';
import Search from '@ui/Search'
// hooks
import {useState, useEffect, useContext} from 'react';
import usePagination from '@hooks/usePagination';
import Spinner from "react-bootstrap/Spinner";
// constants
import {PRODUCT_CATEGORIES, PRODUCT_SORT_OPTIONS} from '@constants/options';

// utils
import {sortProducts} from '@utils/helpers';

// data placeholder
// import products from '@db/products';

//dataa
import {ProductContext} from '../contexts/productContext'

const ItemsGrid = () => {
    const options = PRODUCT_CATEGORIES.filter(option => option.value !== 'all');
    const [category, setCategory] = useState(options[0]);
    const [sort, setSort] = useState(PRODUCT_SORT_OPTIONS[0]);

    

    const {productState: { products, product, isProductLoading }, searchProduct, getProduct} = useContext(ProductContext)
    const productsByCategory = products.filter(product => product.category === category.value);
    const sortedProducts = sortProducts(productsByCategory, sort.value);
    const pagination = usePagination(sortedProducts, 12);
    useEffect(() => {
        pagination.goToPage(0);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, sort]);

    useEffect(() => {
      getProduct()
    }, [])
     let bodyProduct;
     if(isProductLoading) {
        bodyProduct = (
            <div className="spinner-container">
             <Spinner animation="border" variant="info" />
            </div>
        )
     } else {
        bodyProduct = (
            <div className="grid flex-1 items-start gap-[26px] mt-5 mb-[30px] sm:grid-cols-2 md:grid-cols-3 md:mt-7
                 lg:grid-cols-4 2xl:grid-cols-6">
                {
                   products.map((product) => {
                    return (
                         <ProductGridItem  product={product} key={product.product_id}/>
                    )
                   })
                       
                    
                }
            </div> 
        )
     }

     const [searchQuery, setSearchQuery] = useState('');

     const handleSearchChange = async(value) => {
       await searchProduct(value)
     };

    return (
        <>
            <div className="grid gap-[26px] lg:grid-cols-4 2xl:grid-cols-6">
                <div className="card !p-5 flex items-center gap-4 min-w-[218px]">
                    <CategoryHeader category={category.value}/>
                </div>
                <div className="flex flex-col-reverse gap-4 lg:flex-col lg:gap-3 lg:col-start-3 lg:col-end-5
                     2xl:col-start-5 2xl:col-end-7">
                    
                    <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-[26px]">
                    <Search placeholder="Search Product"
        query={searchQuery}
        setQuery={setSearchQuery}
        wrapperClass="lg:w-[326px]"
        onChange={handleSearchChange}/>
                        {/* <Select value={category} onChange={setCategory} options={options}/>
                        <Select value={sort} onChange={setSort} options={PRODUCT_SORT_OPTIONS}/> */}
                    </div>
                </div>
            </div>
             {bodyProduct}
            {
                pagination.maxPage > 1 && <Pagination pagination={pagination}/>
            }
        </>
    )
}

export default ItemsGrid