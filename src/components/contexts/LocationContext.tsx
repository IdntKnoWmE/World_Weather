import {createContext, type ReactElement, type ReactNode, useContext, useMemo, useState} from "react";
import type {Coordinates} from "@/types.ts";


export interface LocationContextType {
    coordinates: Coordinates;
    city: string;
    isChangingLocation: boolean; // 💡 Track global layout loading state
    setLocation: (coordinates: Coordinates) => void;
    setCity: (city: string) => void;
    setIsChangingLocation: (loading: boolean) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children } : {children : ReactNode}): ReactElement=> {

    const [coordinates, setCoordinates] = useState<Coordinates>({
        lat: 29,
        lng: 77,
    });
    const [isChangingLocation, setIsChangingLocation] = useState<boolean>(false);
    const [city, setCity] = useState<string>("Custom");

    const setLocation = (newCoords: Coordinates) => {
        setCoordinates((prev) => {

            // Strict Primitive Guard: Stops the update loop if the values are identical!
            if (prev.lat === newCoords.lat && prev.lng === newCoords.lng){
                setIsChangingLocation(false); // Cancel animation if coords are identical
                return prev;
            }

            return { lat: newCoords.lat, lng: newCoords.lng };
        });
    };

    const contextValue = useMemo(() => ({
        coordinates,
        city,
        isChangingLocation,
        setLocation,
        setCity,
        setIsChangingLocation
    }), [coordinates, city, isChangingLocation]);

    return (
        <LocationContext.Provider value={contextValue}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = (): LocationContextType => {
    const context = useContext(LocationContext);
    if (!context) throw new Error("Must use useLocation inside LocationProvider");
    return context;
}
