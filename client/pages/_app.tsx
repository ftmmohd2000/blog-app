import "bootstrap/dist/css/bootstrap.css";
import React, { ComponentType } from "react";
import { Provider } from "react-redux";
import { getStore } from "../redux/store";

const store = getStore();

export interface IAppProps {
  Component: ComponentType;
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: IAppProps) => {
  return (
    <div className="bg-danger">
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
};

export default MyApp;
