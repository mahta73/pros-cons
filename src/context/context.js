import React from 'react';

// make a new context
const ThemeContext = React.createContext(); 

export const ContextProvider = ThemeContext.Provider;
export const ContextCunsomer = ThemeContext.Consumer;