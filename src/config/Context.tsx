import React, { createContext, useState } from 'react';

const lightTheme = {
  primary: "#4CAF50",
  title: "#2A3B47",
  content: "#697477",
  light: "#A0A7AC",
  border: "#EFF3F5",
  container: "#FFF",
  body: "#E1F0E0",
  barStyle: "dark-content",
  backgroundColor: "#F3F9F1",
};

const darkTheme = {
  primary: "#4CAF50",
  title: "#EFF3F5",
  content: "#C8CDD0",
  light: "#A0A7AC",
  border: "#2A3B47",
  container: "#212E36",
  body: "#203026",
  barStyle: "light-content",
  backgroundColor: "#2C3E34",
};

type ContextType = {
  lightMode: boolean;
  setLightMode: (lightMode: boolean) => void;
  theme: typeof lightTheme;
};

const defaultValue: ContextType = {
  lightMode: false,
  setLightMode: () => {},
  theme: lightTheme,
};

export const Context = createContext<ContextType>(defaultValue);

export const ContextProvider = (props: any) => {
  const [lightMode, setLightMode] = useState(false);

  const theme = lightMode ? lightTheme : darkTheme;

  const value: ContextType = {
    lightMode,
    setLightMode,
    theme,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

// Path: src\config\Context.tsx