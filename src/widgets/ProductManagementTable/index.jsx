// components
import FilterItem from "@ui/FilterItem";
import Select from "@ui/Select";
import StyledTable from "./styles";
import Empty from "@components/Empty";
import Pagination from "@ui/Pagination";
import ProductManagementCollapseItem from "@components/ProductManagementCollapseItem";

// hooks
import { useState, useEffect, useContext } from "react";
import usePagination from "@hooks/usePagination";
import { useWindowSize } from "react-use";

// constants
import {
  PRODUCT_MANAGEMENT_OPTIONS,
  PRODUCT_CATEGORIES,
  STOCK_STATUS_OPTIONS,
  PRODUCT_TYPE_OPTIONS,
  PRODUCT_SELLER_OPTIONS,
  PRODUCT_ADDITIONAL_OPTIONS,
  PRODUCT_SELECT_OPTIONS,
} from "@constants/options";
import { PRODUCTS_MANAGEMENT_COLUMN_DEFS } from "@constants/columnDefs";

// data placeholder
import products_management from "@db/products_management";
import { ProductContext } from "@contexts/productContext";
const ProductManagementTable = () => {
  const {
    productState: { products, product, isProductLoading },
    getProduct,
    showModalUpdateProduct,
    setShowModalUpdateProduct,
    findProduct
  } = useContext(ProductContext);

  useEffect(() => {
    getProduct();
    return () => {};
  }, []);

  const { width } = useWindowSize();
  const defaultFilters = {
    stockStatus: null,
    productCategory: null,
    productSeller: null,
    productType: null,
    additionalOptions: null,
  };
  const [category, setCategory] = useState("all");
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedAction, setSelectedAction] = useState(null);
  const [activeCollapse, setActiveCollapse] = useState("");

  const getQty = (category) => {
    if (category === "all") return products_management.length;
    return products_management.filter((product) => product.status === category)
      .length;
  };

  const handleFilterSelect = ({ value, label }, name) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: { label, value },
    }));
  };

  const handleApplyFilters = () => {};

  const handleClearFilters = () => {
    setFilters(defaultFilters);
  };

  const dataByStatus = () => {
    if (category === "all") return products_management;
    return products_management.filter((product) => product.status === category);
  };

  const pagination = usePagination(dataByStatus(), 8);

  const handleActionClick = (id) => {
     setShowModalUpdateProduct(true)
     findProduct(id)
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-x-6 xl:grid-cols-6">
        <Select
          options={PRODUCT_ADDITIONAL_OPTIONS}
          value={filters.additionalOptions}
          placeholder="Additional Options"
          onChange={(e) => handleFilterSelect(e, "additionalOptions")}
        />
        <div className="grid grid-cols-2 gap-3">
          <button
            className="btn btn--secondary !gap-[5px]"
            onClick={handleApplyFilters}
          >
            Apply <i className="icon-chevron-right-regular text-sm" />
          </button>
          <button
            className="btn btn--outline blue !h-[44px]"
            onClick={handleClearFilters}
          >
            Clear
          </button>
        </div>
      </div>
      <div className="flex flex-col-reverse gap-4 mt-4 mb-5 md:flex-row md:justify-between md:items-end md:mt-5 md:mb-6">
        <p>View products: {products.length}</p>
      </div>
      <div className="flex flex-1 flex-col gap-[22px]">
        <StyledTable
           columns={[
            ...PRODUCTS_MANAGEMENT_COLUMN_DEFS,
            {
              title: "Actions",
              dataIndex: "product_id",
              render: (product_id, record) => (
                <div className="flex items-center justify-end gap-11">
                  <div onClick={() => handleActionClick(record.product_id)} aria-label="Edit">
                    <i className="icon icon-pen-to-square-regular text-lg leading-none" />
                  </div>
                </div>
              ),
            },
          ]}
          dataSource={products}
          rowKey={(record) => record.sku}
          locale={{
            emptyText: <Empty text="No products found" />,
          }}
          rowSelection={{
            type: "checkbox",
          }}
          pagination={false}
        />

        {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
      </div>
    </div>
  );
};

export default ProductManagementTable;
