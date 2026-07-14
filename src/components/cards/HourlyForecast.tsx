import Card from "./Card.tsx";
import WeatherIcon from "../WeatherIcon.tsx";
import { getForecastData } from "@/API/WeatherAPI.ts";
import HourlySkeleton from "@/components/skeletons/HourlySkeleton.tsx";
import {useWeatherQuery} from "@/hooks/useWeatherQuery.ts";



function HourlyForecast() {

    const { data, shouldShowSkeleton, locationString, isError } = useWeatherQuery({
        queryKeyPrefix: 'HourlyForecast',
        fetchFn: getForecastData,
        extraParams: {days: 1, timePeriod: 60}
    });

    if (shouldShowSkeleton) {
        return <HourlySkeleton key={`skeleton-${locationString}`} />;
    }


    // Standard fallback routes
    if (isError || !data || Array.isArray(data)) {
        return (
            <Card title="Hourly Forecast (Today)"
                  cardClassName="w-full h-60 p-6"
                  childrenClassName="h-50 pb-10 flex justify-center items-center text-center">
                <p className="text-center text-2xl font-medium ">No data found for this location.</p>
            </Card>
        )
    }


    return (
        <>
            <Card title="Hourly Forecast (Today)"
                  cardClassName="w-full p-6"
                  childrenClassName="flex gap-6 p-4 overflow-x-scroll scrollbar-thin scrollbar-thumb-cyan-900">

                {(data?.forecast?.forecastday[0]?.hour ?? []).map((hour) => (

                    <div
                        key={hour.time_epoch}
                        className="flex flex-col h-40 w-30 shrink-0 gap-2 items-center p-4 rounded-2xl bg-cyan-900/30"
                    >
                        <p className="whitespace-nowrap text-lg font-medium">
                            {new Date(hour.time_epoch * 1000).toLocaleTimeString(undefined, {
                                timeZone: data.location.tz_id,
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                            })}
                        </p>
                        <div className="p-1 bg-cyan-900/20 rounded-full">
                            <WeatherIcon
                                className="size-14"
                                src={hour.condition.icon}
                                text={hour.condition.text}
                            />
                        </div>

                        <p className="font-semibold text-lg">{Math.round(hour.temp_c)}°C</p>
                    </div>

                ))}

            </Card>
        </>
    );
}

export default HourlyForecast;