import React, { ComponentType } from "react";
import { Provider } from "react-redux";
import { getStore } from "../redux/store";
import { ApolloProvider } from "@apollo/client";
import { client } from "../gql/client";

const store = getStore();

const MyApp = ({
  Component,
  pageProps
}: {
  Component: ComponentType;
  pageProps: any;
}) => {
  return (
    <div>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ApolloProvider>
    </div>
  );
};

export default MyApp;
