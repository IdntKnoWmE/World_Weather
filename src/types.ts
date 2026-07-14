
export type Coordinates = {
    lat: number;
    lng: number;
}

export interface LocationContextType {
    coordinates: Coordinates;
    isChangingLocation: boolean;
    setIsChangingLocation: (value: boolean) => void;
}

// Universal parameter interface for weather API services
export interface WeatherFetchParams {
    lat: number;
    lng: number;
    days?: number;
    timePeriod?: number;
}