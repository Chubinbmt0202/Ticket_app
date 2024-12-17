// context/TripContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface TripDetails {
  noiDi: string;
  noiDen: string;
  ngayKhoiHanh: string;
}

interface TripContextType {
  tripDetails: TripDetails;
  setTripDetails: React.Dispatch<React.SetStateAction<TripDetails>>;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    noiDi: "Chưa chọn",
    noiDen: "Chưa chọn",
    ngayKhoiHanh: "",
  });

  return (
    <TripContext.Provider value={{ tripDetails, setTripDetails }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTripContext = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTripContext must be used within a TripProvider");
  }
  return context;
};
