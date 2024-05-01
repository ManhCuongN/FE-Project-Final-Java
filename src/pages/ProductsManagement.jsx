// components
import PageHeader from '@layout/PageHeader';
import Search from '@ui/Search';
import {CSVLink} from 'react-csv';
import ProductManagementTable from '@widgets/ProductManagementTable';
import {NavLink} from 'react-router-dom';

const csvData = [
    ["firstname", "lastname", "email"],
    ["John", "Doe", "johndoe@domain.com"],
    ["Jane", "Doe", "janedoe@domain.com"],
];

const ProductsManagement = () => {
    return (
        <>
            <PageHeader title="Products Management" />
            <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
                <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
               
                    <button className="btn btn--primary">
                     
                        <NavLink className={`h6 !leading-[1.4] block max-w-[180px] transition hover:text-accent `}
                     to="/product-editor">
                  Add new product <i className="icon-circle-plus-regular"/>
                 </NavLink>
                    </button>
                </div>
                <Search wrapperClass="lg:w-[326px]" placeholder="Search Product"/>
            </div>
            <ProductManagementTable/>
        </>
    )
}

export default ProductsManagement