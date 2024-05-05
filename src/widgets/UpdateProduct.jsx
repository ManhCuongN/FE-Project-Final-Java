// components
import React, { useContext, useReducer, useState } from "react";
import Spring from "@components/Spring";
import Select from "@ui/Select";
import RangeDatePicker from "@ui/RangeDatePicker";
import DropFiles from "@components/DropFiles";
import { toast } from "react-toastify";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";
import { ProductContext } from "@contexts/ProductContext";
// hooks
import { useForm, Controller } from "react-hook-form";

// constants
import {
  PRODUCT_CATEGORIES,
  PAYMENT_OPTIONS,
  PRODUCT_TYPE_OPTIONS,
  PROMOTIONAL_OPTIONS,
  STOCK_STATUS_OPTIONS,
  UNITS_OPTIONS,
} from "@constants/options";

// utils
import classNames from "classnames";
import dayjs from "dayjs";

const UpdateProduct = () => {
  const {
    productState: { product },
    updateProduct,
    setShowModalUpdateProduct
  } = useContext(ProductContext);
  const [imageUrl, setImageUrl] = useState(product.product_thumb)
  const categories = PRODUCT_CATEGORIES.filter(
    (category) => category.value !== "all"
  );
  const productDescription = ``;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    product
  });

  const handleFileUpload = (files) => {
    if (files.length > 0) {
      const file = files[0];
 

      const formData = new FormData();
      formData.append("file", file);

      fetch("http://localhost:8081/api/v1/images/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setImageUrl(data.metadata);

        })
        .catch((error) => {
          console.error("Upload failed:", error);
          
        });
    }
  };

  // do something with the data
  const handlePublish = async (data) => {
    const updateProductData = {
       ...data,
       productThumb: imageUrl,
       product_id: product.product_id
       
    }
    const res = await updateProduct(updateProductData)
    if(res.errors) {
        res.errors.map(((err) => {
         toast.error(err);
        }))
     } else {
      toast.success(res.message);
      setShowModalUpdateProduct(false)
  }
  };

  return (
    <Spring className="card flex-1 xl:py-10">
      <h5 className="mb-[15px]">Product Settings</h5>
      <form className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,550px)] xl:gap-10">
        <div>
          <div>
            <span className="block field-label mb-2.5">Product Images</span>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 2xl:grid-cols-[repeat(5,minmax(0,1fr))]">
              <Controller
                name="productThumb"
                control={control}
                
                render={({ field }) => (
                  <DropFiles
                    wrapperClass="media-dropzone 2xl:col-span-2"
                    onChange={handleFileUpload}
                  >
                    <img
                      src={imageUrl}
                      alt="Uploaded Image"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </DropFiles>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="description">
                Description
              </label>
              <textarea
                className={classNames(
                  `field-input !h-[160px] !py-[15px] !overflow-y-auto`,
                  { "field-input--error": errors.description }
                )}
                id="productDescription"
                defaultValue={product.product_description}
                {...register("productDescription", { required: true })}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-4 gap-x-2">
          <div className="field-wrapper">
            <label className="field-label" htmlFor="productName">
              Product Name
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.productName,
              })}
              id="productName"
              defaultValue={product.product_name}
              placeholder="Enter product name"
              {...register("productName", { required: true })}
            />
          </div>

          <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="regularPrice">
                Product Price
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.regularPrice,
                })}
                id="productPrice"
                defaultValue={product.product_price}
                placeholder="$99.99"
                {...register("productPrice", {
                  required: true,
                  pattern: /^[0-9]*$/,
                })}
              />
            </div>
           
           
            <div className="field-wrapper">
              <label className="field-label" htmlFor="salePrice">
                Quantity
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.salePrice,
                })}
                id="productQuantity"
                defaultValue={product.product_quantity}
                placeholder="1"
                {...register("productQuantity", {
                  required: true,
                  pattern: /^[0-9]*$/,
                })}
              />
            </div>
          </div>
          <div className="grid gap-2 mt-5 sm:grid-cols-1 sm:mt-10 md:mt-11">
            <button
              className="btn btn--primary"
              onClick={handleSubmit(handlePublish)}
            >
              Publish Product
            </button>
          </div>
        </div>
      </form>
    </Spring>
  );
};

export default UpdateProduct;
