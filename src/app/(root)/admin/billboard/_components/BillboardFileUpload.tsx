"use client";

import { uploadBillboardImages } from "@/actions/supabase/supabaseDatabase";
import FileUploadImage from "@/components/FileUpload/FileUploadImage";
import LoaderEl from "@/components/Global/LoaderEl";
import { Button } from "@/components/ui/button";
import { useUploadImage } from "@/providers/upload-image-provider";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function BillboardFileUpload() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { state, dispatch } = useUploadImage();

  async function handleBillboardUpload() {
    startTransition(async () => {
      const imagesFromState = state.productImgs;
      if (!!!imagesFromState?.length) {
        toast.error("There are currently no images on the state to display.!");
        return;
      }
      const response = await uploadBillboardImages(imagesFromState);
      if (response.length > 0) {
        toast.success("Billboard image uploaded");
      }
      dispatch({ type: "RESET" });
      router.refresh();
    });
  }

  return (
    <div className="space-y-2">
      <FileUploadImage
        fileNumber={5}
        bucketName={"admin"}
        folderName={"billboard"}
        dispatch={dispatch}
      />
      <div className="flex md:justify-start justify-center">
        <Button
          onClick={handleBillboardUpload}
          disabled={!!!state.productImgs?.length}
          className="flex items-center gap-1 mt-4"
        >
          {isPending && <LoaderEl />}
          {!isPending && <Upload size={16} />}
          Upload billboard
        </Button>
      </div>
    </div>
  );
}
