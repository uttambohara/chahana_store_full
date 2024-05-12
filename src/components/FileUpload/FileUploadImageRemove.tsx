import { deleteSupbaseImage } from "@/actions/supabase/supabaseImage";
import { UploadImageAction } from "@/types/uploadImageReducerTypes";
import { X } from "lucide-react";

interface FileUploadImageRemoveProps {
  imageData: { name: string; image: string };
  onChange?: (imageArrInString: string) => void;
  dispatch?: React.Dispatch<UploadImageAction>;
}

export default function FileUploadImageRemove({
  dispatch,
  onChange,
  imageData,
}: FileUploadImageRemoveProps) {
  async function handleImageRemove() {
    if (onChange) onChange("");
    if (dispatch) {
      dispatch({
        type: "REMOVE_IMAGE",
        payload: {
          productImg: imageData,
        },
      });
    }
    await deleteSupbaseImage(imageData.name);
  }

  return (
    <div
      onClick={handleImageRemove}
      className="flex items-center shadow-md p-1 text-xs absolute top-2 left-1/2 -translate-x-1/2 bg-red-500/80 text-white rounded-full cursor-pointer hover:scale-105"
    >
      <X size={14} />
      <span>Remove</span>
    </div>
  );
}
