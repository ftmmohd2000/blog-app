import { RouterContext } from "next/dist/next-server/lib/router-context";
import { NextRouter } from "next/router";
import React from "react";

export const withTestRouter = (
  tree: JSX.Element,
  router: Partial<NextRouter> = {}
) => {
  const {
    route = "",
    pathname = "",
    query = {},
    asPath = "",
    push = async () => true,
    replace = async () => true,
    reload = () => null,
    back = () => null,
    prefetch = async () => undefined,
    beforePopState = () => null,
    isFallback = false,
    events = {
      on: () => null,
      off: () => null,
      emit: () => null
    },
    basePath = ""
  } = router;

  return (
    <RouterContext.Provider
      value={{
        route,
        pathname,
        query,
        asPath,
        push,
        replace,
        reload,
        back,
        prefetch,
        beforePopState,
        isFallback,
        events,
        basePath
      }}
    >
      {tree}
    </RouterContext.Provider>
  );
};
