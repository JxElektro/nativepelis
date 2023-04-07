import React, { createContext, useState } from 'react';

type ContextType = {
  lightMode: boolean;
  setLightMode: (lightMode: boolean) => void;
};

const defaultValue: ContextType = {
  lightMode: false,
  setLightMode: () => {},
};

export const Context = createContext<ContextType>(defaultValue);

export const ContextProvider = (props: any) => {
  const [lightMode, setLightMode] = useState(false);

  const value: ContextType = {
    lightMode,
    setLightMode,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

// Path: src\config\Context.tsx