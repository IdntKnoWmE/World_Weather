import {createContext, type ReactElement, type ReactNode, useContext, useState} from "react";

interface MapTypeContextType {
    mapType: string;
    setWeatherMap: (mapType: string) => void;
}


const MapTypeContext = createContext<MapTypeContextType | undefined>(undefined);

export const MapTypeProvider = ({ children } : {children : ReactNode}): ReactElement=> {

    const [mapType, setMapType] = useState<string>("simple");

    const setWeatherMap = (newMapType: string) => {
        if (newMapType){
            setMapType(newMapType);
        }
    };

    return (
        <MapTypeContext.Provider value={{mapType, setWeatherMap}}>
            {children}
        </MapTypeContext.Provider>
    );
};

export const useMapType = (): MapTypeContextType => {
    const context = useContext(MapTypeContext);
    if (!context) throw new Error("Must use useLocation inside MapTypeContext");
    return context;
}
