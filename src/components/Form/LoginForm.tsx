"use client";

import { Input } from "../ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { supbaseLogin } from "@/actions/supabase/supbaseLogin";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginFormSchema, loginFormSchema } from "@/types/formTypes";
import { useState, useTransition } from "react";
import AuthCardFooter from "../Auth/AuthCardFooter";
import AuthCardProviders from "../Auth/AuthCardProviders";
import AuthForgetPassword from "../Auth/AuthForgetPassword";
import { useRouter } from "next/navigation";
import AuthAlert from "../Auth/AuthAlert";

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormSchema) {
    startTransition(async function () {
      const response = await supbaseLogin(values);
      if (response?.status === "error ") {
        setErrorMessage(response.message);
      }
      router.push("/");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="m@example.com"
                  required
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input required type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <AuthForgetPassword />
        </div>

        <AuthCardProviders />
        {errorMessage && <AuthAlert type={"error"} message={errorMessage} />}
        <AuthCardFooter
          isPending={isPending}
          linkType="Sign up"
          authType={"Sign in"}
          footerLinkMsg={"Don't have an account"}
          footerLink={"/auth/register"}
        />
      </form>
    </Form>
  );
}
