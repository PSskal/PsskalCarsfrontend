"use client";
import { createContext, useContext, useState } from "react";

const CarContext = createContext();

export function CarProvider({ children }) {
  const [cars, setCars] = useState([]);
  const [location, setLocation] = useState("Lima");
  const [lastFetchedLocation, setLastFetchedLocation] = useState(null);

  return (
    <CarContext.Provider
      value={{
        cars,
        setCars,
        location,
        setLocation,
        lastFetchedLocation,
        setLastFetchedLocation,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}

export function useCarContext() {
  return useContext(CarContext);
}
