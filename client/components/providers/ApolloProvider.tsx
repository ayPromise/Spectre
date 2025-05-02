"use client";

import React, { PropsWithChildren } from "react";
import { ApolloLink, ApolloProvider } from "@apollo/client";

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink: ApolloLink = new HttpLink({
    uri: 'http://localhost:3001/graphql'
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});


const CustomApolloProvider: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
};

export default CustomApolloProvider;
