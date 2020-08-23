import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const link = createHttpLink({
  uri: "http://localhost:4000",
  credentials: "include",
  fetch
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});
