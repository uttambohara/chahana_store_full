import { CardFooter } from "@/components/ui/card";
import AuthCardFooterLink from "./AuthCardFooterLink";
import AuthCardSubmitButton from "./AuthCardSubmitButton";

interface AuthCardFooterProps {
  authType: "Sign up" | "Sign in";
  footerLinkMsg: string;
  footerLink: string;
  linkType: "Sign up" | "Sign in";
  isPending: boolean;
}

export default function AuthCardFooter({
  authType,
  footerLinkMsg,
  footerLink,
  linkType,
  isPending,
}: AuthCardFooterProps) {
  return (
    <CardFooter className="flex-col p-0">
      <AuthCardSubmitButton authType={authType} isPending={isPending} />

      <AuthCardFooterLink
        message={footerLinkMsg}
        link={footerLink}
        reqAuthType={linkType}
      />
    </CardFooter>
  );
}
