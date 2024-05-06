// components
import React, {  useState, useContext } from 'react';
import Spring from "@components/Spring";
import Select from "@ui/Select";
import RangeDatePicker from "@ui/RangeDatePicker";
import DropFiles from "@components/DropFiles";
import { toast } from "react-toastify";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";

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


import {ProductContext} from '@contexts/ProductContext'

// utils
import classNames from "classnames";
import dayjs from "dayjs";

const ProductEditor = () => {

  const [imageUrl, setImageUrl] = useState(null)
  const [isUploading, setIsUploading] = useState(false);
  const {addProduct} = useContext(ProductContext)
  const categories = PRODUCT_CATEGORIES.filter(
    (category) => category.value !== "all"
  );
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  // do something with the data
  const handlePublish = async (data) => {
    const newProduct = {
        ...data,
        productThumb:imageUrl,
        productQuantity: parseInt(data.productQuantity),
        productPrice: parseFloat(data.productPrice)
    }
    console.log("new", newProduct);
    const res = await addProduct(newProduct)
    if(res.errors) {
       res.errors.map(((err) => {
        toast.error(err);
       }))
    } else {
        toast.success(res.message);
    }
  };

  const handleFileUpload = (files) => {
    if (files.length > 0) {
      const file = files[0];
 

      const formData = new FormData();
      formData.append("file", file);

      setIsUploading(true); 

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
        })
        .finally(() => {
          setIsUploading(false); // Reset uploading state
        });;
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
                     {isUploading && (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <p className="absolute bg-white bg-opacity-70 px-4 py-2 rounded-lg shadow-lg">
                          Uploading...
                        </p>
                      </div>
                    )}
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Uploaded Image"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    ) : (
                      <MediaDropPlaceholder />
                    )}
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
                id="description"
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
              placeholder="Enter product name"
              {...register("productName", { required: true })}
            />
          </div>

          <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="regularPrice">
                Regular Price
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.regularPrice,
                })}
                id="productPrice"
                placeholder="$99.99"
                {...register("productPrice", {
                  required: true,
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Please enter a valid number.", // Thông báo lỗi nếu không hợp lệ
                },
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

export default ProductEditor;
