import SectionHeading from "@/components/Global/SectionHeading";
import { UploadImageProvider } from "@/providers/upload-image-provider";
import BillboardFileUpload from "./BillboardFileUpload";
import BillboardImageList from "./BillboardImageList";
import BillboardTable from "./BillboardTable";

export default function Billboard() {
  return (
    <div className="space-y-4">
      <SectionHeading title={"Billboards"} description={"Manage billboards"} />
      <UploadImageProvider>
        <div className="grid md:grid-cols-[50%_1fr] items-center md:gap-6">
          <BillboardFileUpload />
          <BillboardImageList />
        </div>
      </UploadImageProvider>
      <BillboardTable />
    </div>
  );
}
