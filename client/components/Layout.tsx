import React from "react";

import Head from "next/head";
import { Header } from "./Header";

interface ILayoutProps {
  children: (Element | JSX.Element)[] | Element | JSX.Element;
  pageTitle: string;
}

export const Layout = ({ children, pageTitle }: ILayoutProps) => {
  return (
    <div className="container">
      <Header title={pageTitle} />
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {children}
    </div>
  );
};
