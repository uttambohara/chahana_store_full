"use client";

import { Button } from "@/components/ui/button";
import { useCreateProduct } from "@/providers/create-product-provider";
import { Eye, EyeOff } from "lucide-react";

export default function ProductCardPreview() {
  const { state, dispatch } = useCreateProduct();

  const toggleShowDetails = () => {
    dispatch({ type: "TOGGLE_SHOW_CARD_DETAILS" });
  };

  return (
    <>
      {!state.showCardDetails && (
        <Eye
          color="gray"
          onClick={toggleShowDetails}
          className="cursor-pointer"
        />
      )}
      {state.showCardDetails && (
        <EyeOff
          color="gray"
          onClick={toggleShowDetails}
          className="cursor-pointer"
        />
      )}
    </>
  );
}
