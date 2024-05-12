"use client";
import { useModal } from "@/providers/modal-provider";
import React, { ComponentPropsWithoutRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subheading?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
} & ComponentPropsWithoutRef<"div">;

const CustomModal = ({
  children,
  defaultOpen,
  subheading,
  title,
  ...others
}: Props) => {
  const { className } = others;
  const { isOpen, setClose } = useModal();

  console.log(className);
  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent className={cn("bg-card", className)}>
        <DialogHeader className="text-left">
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription>{subheading}</DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
