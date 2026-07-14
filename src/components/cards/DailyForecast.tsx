import Card from "./Card.tsx";
import WeatherIcon from "../WeatherIcon.tsx";
import {getForecastData} from "@/API/WeatherAPI.ts";
import DailySkeleton from "@/components/skeletons/DailySkeleton.tsx";
import {useWeatherQuery} from "@/hooks/useWeatherQuery.ts"


function DailyForecast() {

    const { data, shouldShowSkeleton, locationString, isError } = useWeatherQuery({
        queryKeyPrefix: 'DailyForecast',
        fetchFn: getForecastData,
        extraParams: {days: 9, timePeriod: 24}
    });

    if (shouldShowSkeleton) {
        return <DailySkeleton key={`skeleton-${locationString}`} />;
    }


    // Standard fallback routes
    if (isError || !data || Array.isArray(data)) {
        return (
            <Card title="Daily Forecast"
                  cardClassName="w-full lg:w-1/2 h-150 lg:mb-10 p-6"
                  childrenClassName="flex flex-col gap-3">
                <div className="flex justify-between items-center text-lg font-semibold text-gray-500">
                    <p>Day</p>
                    <p>Weather</p>
                    <p>Avg Temp</p>
                    <p>Min Temp</p>
                    <p>Max Temp</p>
                </div>
                <div className="h-120 flex justify-center items-center text-center">
                    <p className="text-center text-2xl font-medium pb-10">No data found for this location.</p>
                </div>
            </Card>
        )
    }

    return (
        <>
            <Card title="Daily Forecast"
                  cardClassName="w-full lg:w-1/2 h-150 lg:mb-10 p-6"
                  childrenClassName="flex flex-col gap-3">
                    <div className="flex justify-between items-center text-lg font-semibold text-gray-500">
                        <p>Day</p>
                        <p>Weather</p>
                        <p>Avg Temp</p>
                        <p>Min Temp</p>
                        <p>Max Temp</p>
                    </div>

                    <div className="flex flex-col gap-2.5">
                        {
                            data?.forecast?.forecastday.map((day, idx) => (
                                <div
                                    key={day.date_epoch}
                                    className="flex justify-between items-center text-center text-lg py-1"

                                >

                                    <p className="font-semibold w-8">
                                        {
                                            idx === 0
                                            ? "Today"
                                            : new Date(day.date_epoch * 1000).toLocaleDateString(undefined,
                                                {
                                                    timeZone: data.location.tz_id,
                                                    weekday: "short"
                                                }
                                            )
                                        }
                                    </p>
                                    <div className="flex justify-center">
                                        <WeatherIcon
                                            className="size-9"
                                            src={day.day.condition.icon}
                                            text={day.day.condition.text}
                                        />
                                    </div>
                                    <p className="font-medium">{Math.round(day.day.avgtemp_c)}°C</p>
                                    <p className=" font-normal">{Math.round(day.day.mintemp_c)}°C</p>
                                    <p className=" font-medium">{Math.round(day.day.maxtemp_c)}°C</p>
                                </div>
                            ))}
                    </div>

            </Card>
        </>
    );
}

export default DailyForecast;