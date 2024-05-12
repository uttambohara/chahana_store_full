interface FileUploadImageContainerProps {
  children: React.ReactNode;
}

export default function FileUploadImageContainer({
  children,
}: FileUploadImageContainerProps) {
  return <div className="relative h-full w-[15rem]">{children}</div>;
}
