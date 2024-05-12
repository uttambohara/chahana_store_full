"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import LoaderEl from "../Global/LoaderEl";

interface DeleteModalProps {
  isPending: boolean;
  deleteFn: () => void;
}

export default function DeleteModal({ deleteFn, isPending }: DeleteModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="text-red-500 hover:text-red-600"
          size="icon"
          variant="outline"
        >
          {isPending && <LoaderEl />}
          {!isPending && <TrashIcon size={16} />}
          <span className="sr-only">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteFn} className="bg-destructive">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
