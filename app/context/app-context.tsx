"use client";
import React, { useState, useEffect, createContext } from "react";

interface AppContextType {
  caregiver: any;
  setCareGiverHandler: (care_giver: any) => void;
}

const AppContext = createContext<AppContextType>({
  caregiver: { label: "", value: "" },
  setCareGiverHandler: (care_giver: any) => {},
});

export default AppContext;

export const AppContextProvider = (props: any) => {
  const [caregiver, setCareGiver] = useState({ label: "", value: "" });

  useEffect(() => {
    // Ensure this code runs only in the browser
    if (typeof window !== "undefined") {
      const storedCaregiver = localStorage.getItem("caregiver");
      if (storedCaregiver) {
        setCareGiver(JSON.parse(storedCaregiver));
      }

      // Listen for localStorage changes in other tabs
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === "caregiver") {
          const newCaregiver = event.newValue ? JSON.parse(event.newValue) : { label: "", value: "" };
          setCareGiver(newCaregiver);
        }
      };

      window.addEventListener("storage", handleStorageChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []);

  const setCareGiverHandler = (care_giver: any) => {
    setCareGiver(care_giver);
    console.log(care_giver)
    if (typeof window !== "undefined") {
      localStorage.setItem("caregiver", JSON.stringify(care_giver));
    }
  };

  const contextValue: AppContextType = {
    caregiver: caregiver,
    setCareGiverHandler: setCareGiverHandler,
  };

  return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>;
};
