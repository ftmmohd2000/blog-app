import React from "react";
import LoginForm from "../components/LoginForm";
import { Layout } from "../components/Layout";

const LoginPage = () => {
  return (
    <Layout pageTitle="Login">
      <LoginForm />
    </Layout>
  );
};

export default LoginPage;
