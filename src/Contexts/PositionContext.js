import { createContext, useContext, useEffect, useState } from "react";

const PositionContext = createContext();

function PositionProvider({ children }) {
  const [position, setPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function () {
    function getPosition() {
      if (!navigator.geolocation)
        return setError("Your browser does not support geolocation");

      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setIsLoading(false);
        },
        (error) => {
          console.log(error);
          setError(
            "Error getting location please check your internet connection"
          );
          setIsLoading(false);
        }
      );
    }

    getPosition();
  }, []);

  return (
    <PositionContext.Provider value={{ position, isLoading, error, setError }}>
      {children}
    </PositionContext.Provider>
  );
}

function usePosition() {
  const context = useContext(PositionContext);
  if (context === undefined)
    throw new Error("Positioncontext was used outside the context provider");
  return context;
}

export { PositionProvider, usePosition };
