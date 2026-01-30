import Signin from "@/components/Signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In Page | Praedico",
  description: "Sign in to your Praedico account",
};

const SigninPage = () => {
  return <Signin />;
};

export default SigninPage;
