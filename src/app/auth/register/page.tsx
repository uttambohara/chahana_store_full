import AuthCard from "@/components/Auth/AuthCard";
import RegisterForm from "@/components/Form/RegisterForm";

export default function LoginPage() {
  return (
    <AuthCard
      cardTitle={"Create an account"}
      cardDescription={"Enter your information below to sign up."}
      form={<RegisterForm />}
    />
  );
}
