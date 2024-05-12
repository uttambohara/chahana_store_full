"use client";

import { TProductWithCategorySubCategoryWithColorWithSizes } from "@/types";
import { CreateProductAction } from "@/types/createProductReducerTypes";
import { UploadImageAction } from "@/types/uploadImageReducerTypes";

import { Dispatch, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

interface UseInitProductDataProps {
  productBasedOnParamId?: TProductWithCategorySubCategoryWithColorWithSizes;
  form: UseFormReturn<
    {
      name: string;
      sku: string;
      description: string;
      salesPrice: number;
      discount: number;
      quantity: number;
    },
    any,
    undefined
  >;
  CreateProductDispatch: Dispatch<CreateProductAction>;
  ImageDispatch: Dispatch<UploadImageAction>;
}

export default function useInitProductData({
  productBasedOnParamId,
  form,
  CreateProductDispatch,
  ImageDispatch,
}: UseInitProductDataProps) {
  useEffect(() => {
    const productBasedOnParamIdObject = productBasedOnParamId?.[0];

    if (productBasedOnParamId && productBasedOnParamIdObject) {
      // ...
      form.reset({
        name: productBasedOnParamIdObject.name,
        sku: productBasedOnParamIdObject.sku,
        quantity: productBasedOnParamIdObject.quantity,
        description: productBasedOnParamIdObject.description,
        salesPrice: productBasedOnParamIdObject.salesPrice,
        discount: productBasedOnParamIdObject.discount || 0,
      });

      // ...
      CreateProductDispatch({
        type: "INIT",
        payload: {
          category: productBasedOnParamIdObject.category,
          sub_category: productBasedOnParamIdObject.sub_category,
          colors: productBasedOnParamIdObject.color,
          sizes: productBasedOnParamIdObject.sizes,
        },
      });
      ImageDispatch({
        type: "INIT",
        payload: {
          productImgs: JSON.parse(productBasedOnParamIdObject.productImgs),
        },
      });
    }
  }, []);

  return null;
}
