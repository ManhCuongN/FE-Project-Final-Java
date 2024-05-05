// components
import React, { useContext, useReducer, useState } from 'react';
import PageHeader from "@layout/PageHeader";
import Search from "@ui/Search";
import { CSVLink } from "react-csv";
import ProductManagementTable from "@widgets/ProductManagementTable";
import { NavLink } from "react-router-dom";
import UpdateProduct from "@widgets/UpdateProduct";
import Modal from "@mui/material/Modal";
import {ProductContext} from "@contexts/ProductContext"
const csvData = [
  ["firstname", "lastname", "email"],
  ["John", "Doe", "johndoe@domain.com"],
  ["Jane", "Doe", "janedoe@domain.com"],
];



const ProductsManagement = () => {
    const {showModalUpdateProduct, setShowModalUpdateProduct} = useContext(ProductContext)
    const handleClose = () => {
        setShowModalUpdateProduct(false)
    }
  return (
    <>
      <PageHeader title="Products Management" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button className="btn btn--primary">
            <NavLink
              className={`h6 !leading-[1.4] block max-w-[180px] transition hover:text-accent `}
              to="/product-editor"
            >
              Add new product <i className="icon-circle-plus-regular" />
            </NavLink>
          </button>
        </div>
        <Search wrapperClass="lg:w-[326px]" placeholder="Search Product" />
      </div>
      <ProductManagementTable />
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "100%",
        }}
        open={showModalUpdateProduct}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{ width: 1000, height: 400, overflowY: "auto" }}>
          <UpdateProduct />
        </div>
      </Modal>
    </>
  );
};

export default ProductsManagement;
