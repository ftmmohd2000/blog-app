import "bootstrap/dist/css/bootstrap.css";
import React, { ComponentType } from "react";
import { Provider } from "react-redux";
import { getStore } from "../redux/store";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo/client";

const store = getStore();

export interface IAppProps {
  Component: ComponentType;
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: IAppProps) => {
  return (
    <div className="bg-danger">
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ApolloProvider>
    </div>
  );
};

export default MyApp;
