import { UploadImageAction } from "@/types/uploadImageReducerTypes";
import Image from "next/image";
import FileUploadImageContainer from "./FileUploadImageContainer";
import FileUploadImageClose from "./FileUploadImageRemove";

interface FileUploadImageListProps {
  dispatch?: React.Dispatch<UploadImageAction>;
  ArrayInString: string;
  onChange?: (imageArrInString: string) => void;
}

export default function FileUploadImageList({
  ArrayInString,
  onChange,
}: FileUploadImageListProps) {
  return (
    <div className="flex flex-col gap-1">
      {JSON.parse(ArrayInString).map(
        (imageData: { name: string; image: string }, index: number) => (
          <FileUploadImageContainer key={index}>
            <Image
              src={imageData.image}
              alt={imageData.name}
              fill
              priority
              className="object-cover rounded-sm"
            />

            <FileUploadImageClose onChange={onChange} imageData={imageData} />
          </FileUploadImageContainer>
        )
      )}
    </div>
  );
}
