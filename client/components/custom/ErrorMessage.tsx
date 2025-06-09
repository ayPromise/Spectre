import React, { PropsWithChildren } from "react";

const ErrorMessage: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="text-center py-20 text-red-600">{children}</div>;
};

export default ErrorMessage;
