import AuthCard from "@/components/Auth/AuthCard";
import LoginForm from "@/components/Form/LoginForm";

export default function LoginPage() {
  return (
    <AuthCard
      cardTitle={"Sign in to your account"}
      cardDescription={
        "Enter your email and password below to access your account."
      }
      form={<LoginForm />}
    />
  );
}
