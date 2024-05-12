"use client";

import { useUploadImage } from "@/providers/upload-image-provider";
import BillboardImageItem from "./BillboardImageItem";
import BillboardImageNotFound from "./BillboardImageNotFound";

export default function BillboardImageList() {
  const { state, dispatch } = useUploadImage();

  return (
    <div className="flex items-center gap-2">
      {!!!state.productImgs?.length && <BillboardImageNotFound />}

      {state.productImgs?.map((img) => (
        <BillboardImageItem key={img.name} img={img} dispatch={dispatch} />
      ))}
    </div>
  );
}
