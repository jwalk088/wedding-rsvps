import React from "react";
import { ApolloProvider } from "@apollo/client";
import { createCache, createClient } from "../utils/apollo";

function Provider({ children }) {
  return (
    <ApolloProvider client={createClient(createCache())}>
      {children}
    </ApolloProvider>
  );
}

export default Provider;
