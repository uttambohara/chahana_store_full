import FileUploadImageRemove from "@/components/FileUpload/FileUploadImageRemove";
import { UploadImageAction } from "@/types/uploadImageReducerTypes";
import Image from "next/image";
import React, { Dispatch } from "react";

interface BillboardImageItem {
  img: {
    name: string;
    image: string;
  };
  dispatch: Dispatch<UploadImageAction>;
}

export default function BillboardImageItem({
  img,
  dispatch,
}: BillboardImageItem) {
  return (
    <div key={img.name} className="relative h-[16rem] w-full">
      <Image
        src={img.image}
        alt={img.name}
        fill
        priority
        className="object-cover rounded-sm"
      />
      <FileUploadImageRemove imageData={img} dispatch={dispatch} />
    </div>
  );
}
