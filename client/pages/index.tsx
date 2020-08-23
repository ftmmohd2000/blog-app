import React from "react";
import { Layout } from "../components/Layout";
import Link from "next/link";

const Home = () => {
  return (
    <Layout pageTitle="bruh">
      <p>Hello User</p>
      <Link href="./login">
        <a>Login</a>
      </Link>
    </Layout>
  );
};

export default Home;
