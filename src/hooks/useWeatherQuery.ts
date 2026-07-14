import { useEffect } from 'react';
import {useQuery, useQueryClient, type UseQueryResult} from '@tanstack/react-query';
import type {WeatherFetchParams} from "@/types.ts";
import {useLocation} from "@/components/contexts/LocationContext.tsx";

interface UseWeatherQueryConfig<TData> {
    queryKeyPrefix: string;
    fetchFn: (params: WeatherFetchParams) => Promise<TData>;
    staleTime?: number;
    extraParams?: Omit<WeatherFetchParams, 'lat' | 'lng'>;
}

type UseWeatherQueryReturn<TData> = UseQueryResult<TData, Error> & {
    locationString: string;
    shouldShowSkeleton: boolean;
}


// A type-safe reusable hook to handle weather caching, location state syncing, and loading rules.
export function useWeatherQuery<TData>({
                                           queryKeyPrefix,
                                           fetchFn,
                                           staleTime = 1000 * 60 * 15,
                                           extraParams = {},
                                       }: UseWeatherQueryConfig<TData>): UseWeatherQueryReturn<TData> {

    const { coordinates, isChangingLocation, setIsChangingLocation } = useLocation();
    const queryClient = useQueryClient(); // Access React Query's global cache instance

    const lat = Number(coordinates.lat);
    const lng = Number(coordinates.lng);

    // Converting lat/lng to clean, uniform strings to build a stable key identifier
    const locationString = `${lat}-${lng}`;

    // Query key tuple typed explicitly for standard structure layout
    const queryKey: [string, number, number] = [queryKeyPrefix, lat, lng];

    const queryResult = useQuery<TData, Error>({
        queryKey: queryKey,
        queryFn: async (): Promise<TData> => {
            return await fetchFn({ lat, lng, ...extraParams });
        },
        staleTime: staleTime,
    });

    // Check the global cache directly: Do we have data for this exact location yet?
    const cachedData = queryClient.getQueryData<TData>(queryKey);
    const hasNoCachedDataYet = !cachedData;

    // if we have reached here to the API call then we set our global parameter isChangingLocation false.
    useEffect(() => {
        if (!hasNoCachedDataYet) {
            setIsChangingLocation(false);
        }
    }, [hasNoCachedDataYet, setIsChangingLocation]);

    // Bulletproof Guard Clause:
    // Show skeleton if it's the initial load, a background refetch, OR if the cache for this new city is empty!
    const shouldShowSkeleton =
        isChangingLocation ||
        queryResult.isLoading ||
        queryResult.isFetching ||
        hasNoCachedDataYet;

    return {
        ...queryResult,
        locationString,
        shouldShowSkeleton,
    };
}