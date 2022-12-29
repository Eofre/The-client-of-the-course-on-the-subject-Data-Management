import React from "react";
import cl from "./Container.module.scss";

interface ContainerProps {
  children: React.ReactChild | React.ReactNode;
  maxWidth?: string;
}

function Container({ children, maxWidth }: ContainerProps) {
  return (
    <div className={cl.conteiner} style={{ maxWidth }}>
      {children}
    </div>
  );
}

export default Container;
