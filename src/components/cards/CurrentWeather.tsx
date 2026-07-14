import Card from "./Card.tsx";
import WeatherIcon from "../WeatherIcon.tsx";
import Wind from "/src/assets/wind.svg?react";
import Humidity from "/src/assets/humidity.svg?react";
import Temperature from "/src/assets/temperature.svg?react";
import {getCurrentWeatherData} from "@/API/WeatherAPI.ts";
import CurrentSkeleton from "@/components/skeletons/CurrentSkeleton.tsx";
import {useWeatherQuery} from "@/hooks/useWeatherQuery.ts";

export default function CurrentWeather() {

    const { data, shouldShowSkeleton, locationString, isError } = useWeatherQuery({
        queryKeyPrefix: 'currentWeather',
        fetchFn: getCurrentWeatherData,
    });

    if (shouldShowSkeleton) {
        return <CurrentSkeleton key={`skeleton-${locationString}`} />;
    }


    // Standard fallback routes
    if (isError || !data || Array.isArray(data)) {
        return (

            <Card
                title="Current Weather"
                cardClassName="w-full h-185 p-6"
                childrenClassName="w-full h-full py-4 flex justify-center items-center text-center
                                   bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl"
            >
                <p className="text-center text-2xl font-medium">No data found for this location.</p>
            </Card>
        )
    }

    // Final paint executes ONLY when background loading completes entirely
    return (
        <div key={`content-wrapper-${locationString}`}>
            <Card
                title="Current Weather"
                cardClassName="w-full lg:h-185 p-6"
                childrenClassName="w-full h-full py-4 flex justify-center items-center text-center
                                   dark:bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl"
            >
                <div className="w-full flex flex-col gap-6 lg:gap-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full md:items-center gap-6 pb-6">

                        {/*Local Time*/}
                        <div
                            className="flex flex-col gap-1 p-4 rounded-2xl items-center  hover:scale-115 transition-all duration-300
                                        sm:justify-self-start lg:justify-self-center sm:pl-20 lg:pl-0">
                            <span
                                className="text-sm uppercase tracking-widest dark:text-slate-500 font-semibold">
                                Local Time
                            </span>
                            <h3 className="text-lg lg:text-2xl tracking-widest font-medium dark:text-white">
                                {new Intl.DateTimeFormat(undefined, {
                                    timeZone: data.location.tz_id,
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                }).format(new Date(data.location.localtime_epoch * 1000))}
                            </h3>
                        </div>

                        {/*Place*/}
                        <div
                            className="flex flex-col p-4 rounded-2xl hover:scale-115 transition-all duration-300
                                        items-center sm:justify-self-end lg:justify-self-center sm:pr-20 lg:pr-0">
                            <span className="text-sm uppercase tracking-widest dark:text-slate-500 font-semibold">
                                Place
                            </span>
                            <h3 className="text-lg lg:text-[18px] font-medium tracking-wide dark:text-cyan-500 capitalize">
                                {data.location.name}
                            </h3>
                            <span className="text-xs uppercase tracking-widest dark:text-slate-500 font-semibold">
                                {data.location.region}, {data.location.country}
                            </span>
                        </div>

                        {/* Added Date and Week Day */}
                        <div
                            className="flex flex-col gap-1 p-4 sm:col-span-2 lg:col-span-1 rounded-2xl  hover:scale-115 transition-all duration-300
                                        sm:-mt-10 lg:mt-0">
                            <span
                                className="text-sm uppercase tracking-widest dark:text-slate-500 font-semibold">Today Date</span>
                            <p className="text-lg lg:text-2xl tracking-widest font-medium dark:text-white">
                                {new Intl.DateTimeFormat(undefined, {
                                    timeZone: data.location.tz_id,
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                }).format(new Date(data.location.localtime_epoch * 1000))}
                            </p>
                        </div>

                    </div>

                    {/* Middle Row: Massive Temperature Display & Condition */}
                    <div className="flex lg:flex-row items-center justify-center gap-6 my-10">

                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
                            <div className="p-3 dark:bg-white/10 rounded-2xl backdrop-blur-md shadow-inner">
                                <WeatherIcon
                                    src={data.current.condition.icon}
                                    text={data.current.condition.text}
                                    className="size-12 lg:size-15 drop-shadow-[0_4px_12px_rgba(34,211,238,0.4)]"
                                />
                            </div>
                            <h3 className="capitalize text-base lg:text-xl font-bold tracking-wide mt-1 dark:text-slate-100">
                                {data.current.condition.text}
                            </h3>
                        </div>

                        <h2 className="text-6xl lg:text-8xl pb-2 font-extrabold text-transparent bg-clip-text bg-black dark:bg-linear-to-b from-white to-slate-400 select-none">
                            {Math.round(data.current.temp_c)}°C
                        </h2>

                    </div>

                    {/* Bottom Row: Weather Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full md:items-center gap-6 pt-6">


                        {/* Wind */}
                        <div
                            className="flex gap-2 p-4 sm:col-span-2 lg:col-span-1 rounded-2xl justify-center
                                        hover:scale-115 transition-all duration-300"
                        >

                            <Wind className="size-12 lg:size-15 dark:invert"/>
                            <div className="flex flex-col items-center gap-1 dark:text-slate-400">
                                <span className="text-sm lg:text-lg font-semibold">Wind</span>
                                <p className="text-xl lg:text-2xl font-semibold dark:text-white">
                                    {Math.round(data.current.wind_kph)} kph
                                </p>
                            </div>
                        </div>


                        {/* Feels Like */}
                        <div
                            className="flex gap-2 p-4 rounded-2xl justify-center sm:justify-start lg:justify-center  hover:scale-115 transition-all duration-300
                                         sm:pl-20 lg:pl-0">

                            <Temperature className="size-12 lg:size-15 dark:invert"/>

                            <div className="flex flex-col items-center gap-1 dark:text-slate-400">
                                <span className="text-sm lg:text-lg font-semibold">Feels Like</span>
                                <p className="text-xl lg:text-2xl font-semibold dark:text-white">{Math.round(data.current.feelslike_c)}°C</p>
                            </div>

                        </div>

                        {/* Humidity */}
                        <div
                            className="flex gap-2 p-4 rounded-2xl justify-center sm:justify-end lg:justify-center hover:scale-115 transition-all duration-300
                                        sm:pr-20 lg:pr-0">

                            <Humidity className="size-13 lg:size-15 dark:invert"/>
                            <div className="flex flex-col items-center gap-1 dark:text-slate-400">
                                <span className="text-sm lg:text-lg font-semibold">Humidity</span>
                                <p className="text-xl lg:text-2xl font-semibold dark:text-white">{data.current.humidity}%</p>
                            </div>

                        </div>


                    </div>
                </div>
            </Card>

        </div>
    );
}
