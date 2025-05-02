"use client";

import React, { PropsWithChildren } from "react";
import { default as ApolloProvider } from "./ApolloProvider";

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <ApolloProvider>
            {children}
        </ApolloProvider>
    );
};

export default Providers;
