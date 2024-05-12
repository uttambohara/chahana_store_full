"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createCategory } from "@/actions/supabase/supabaseDatabase";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import FileUploadImage from "@/components/FileUpload/FileUploadImage";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import LoaderEl from "@/components/Global/LoaderEl";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  image_url: z.string().min(2, {
    message: "Image URL must be at least 2 characters.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function CategoriesForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image_url: "",
    },
  });

  function onSubmit(values: FormSchema) {
    startTransition(async () => {
      const response = await createCategory(values);
      const { _, error } = JSON.parse(response);
      if (error) {
        toast.error(JSON.stringify(error));
      }
      router.refresh();
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo</FormLabel>
              <FormControl>
                <FileUploadImage
                  fileNumber={1}
                  bucketName={"admin"}
                  value={field.value}
                  folderName={"categories"}
                  onChange={(imgArrInString: string) => {
                    field.onChange(imgArrInString);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {" "}
          {isPending && <LoaderEl />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
