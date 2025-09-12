"use client";
import { createContext, useContext } from "react";
export const CarContext = createContext();

export const useCars = () => {
  return useContext(CarContext);
};

// You can add a provider component here if needed
export const CarContextProvider = ({ children }) => {
  return (
    <CarContext.Provider value={{ name: "Car Context" }}>
      {children}
    </CarContext.Provider>
  );
};
