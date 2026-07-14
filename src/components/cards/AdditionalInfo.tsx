import Card from "./Card.tsx";
import {getForecastData} from "@/API/WeatherAPI.ts";

import {type JSX} from "react";
import {WeatherAdditionalInfoMappings} from "@/utils/AppMappings.tsx";
import {useWeatherQuery} from "@/hooks/useWeatherQuery.ts";
import AdditionalInfoSkeleton from "@/components/skeletons/AdditionalInfoSkeleton.tsx";



function AdditionalInfo() {

    const { data, shouldShowSkeleton, locationString, isError } = useWeatherQuery({
        queryKeyPrefix: 'AdditionalWeather',
        fetchFn: getForecastData,
        extraParams: {days: 1, timePeriod: 24}
    });

    if (shouldShowSkeleton) {
        return <AdditionalInfoSkeleton key={`skeleton-${locationString}`} />;
    }

    // Standard fallback routes
    if (isError || !data || Array.isArray(data)) {
        return (
            <Card title="Additional Weather Info" cardClassName="w-full lg:w-1/2 h-150 mb-10 p-6"
                  childrenClassName="flex flex-col gap-5">
                <div className="h-130 flex justify-center items-center text-center">
                    <p className="text-center text-2xl font-medium pb-10">No data found for this location.</p>
                </div>
            </Card>
        )
    }


    return (
        <Card title="Additional Weather Info"
              cardClassName="w-full lg:w-1/2 h-150 mb-10 p-6"
              childrenClassName="flex flex-col gap-5">

            {
                WeatherAdditionalInfoMappings.map(({label, valueKey, Icon, className}) => (
                    <div className="flex justify-between" key={valueKey}>
                        <div className="flex gap-2">
                            <span className="text-lg font-semibold text-gray-500">{label}</span>
                            <Icon className={className}/>
                        </div>
                        <span className="text-lg">
                            <FormatComponent valueKey={valueKey} data={data}/>
                        </span>
                    </div>
                ))
            }

        </Card>
    );
}
type DynamicObject = Record<string, unknown>;

type FormatComponentType = {
    valueKey: string;
    data: DynamicObject;
}


function FormatComponent({valueKey, data}: FormatComponentType): JSX.Element {

    const keys: string[] = valueKey.split(".");

    // Reduce down the object keys step-by-step
    const result = keys.reduce((currentLevel: Record<string, any>, currentKey: string) => {
        // If the current level exists, move deeper; otherwise return undefined
        return currentLevel && currentLevel[currentKey] !== undefined
            ? currentLevel[currentKey]
            : undefined;
    }, data);
    return <>{result}</>

}



export default AdditionalInfo;