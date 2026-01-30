import Signup from "@/components/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up Page | Praedico",
  description: "Create your account on Praedico",
};

const SignupPage = () => {
  return <Signup />;
};

export default SignupPage;
