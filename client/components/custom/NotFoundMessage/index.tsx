import React, { PropsWithChildren } from "react";

const NotFoundMessage: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="text-center py-20 text-muted-foreground">{children}</div>
  );
};

export default NotFoundMessage;
