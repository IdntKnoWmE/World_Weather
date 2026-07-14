import Clouds from '/src/assets/clouds.svg?react';
import Dew from '/src/assets/dew.svg?react';
import Pressure from '/src/assets/pressure.svg?react';
import Sunrise from '/src/assets/sunrise.svg?react';
import Sunset from '/src/assets/sunset.svg?react';
import UVIndex from '/src/assets/uv-index.svg?react';
import Visibility from '/src/assets/visibility.svg?react';
import WindDirection from '/src/assets/wind-direction.svg?react';
import WindGust from '/src/assets/wind-gust.svg?react';
import Snow from '/src/assets/snow.svg?react';
import Rain from '/src/assets/rain.svg?react';
import * as React from "react";


interface WeatherAdditionalInfo {
    label:  string ;
    valueKey: string;
    Icon: React.ComponentType<React.ComponentProps<'svg'>>;
    className: string;
}


type WeatherAdditionalInfoMappingsType = ReadonlyArray<WeatherAdditionalInfo>;



export const WeatherAdditionalInfoMappings: WeatherAdditionalInfoMappingsType =  [
    {
        label: "Cloudiness (%)",
        valueKey: "current.cloud",
        Icon: Clouds,
        className: "size-6"
    },
    {
        label: "Visibility (Km)",
        valueKey: "current.vis_km",
        Icon: Visibility,
        className: "size-6"
    },
    {
        label: "Dew (°C)",
        valueKey: "current.dewpoint_c",
        Icon: Dew,
        className: "size-6 dark:invert"
    },
    {
        label: "Chances of Rain Today (%)",
        valueKey: "forecast.forecastday.0.day.daily_chance_of_rain",
        Icon: Rain,
        className: "size-6"

    },
    {
        label: "Chances of Snow Today (%)",
        valueKey: "forecast.forecastday.0.day.daily_chance_of_snow",
        Icon: Snow,
        className: "size-6"

    },
    {
        label: "UV Index",
        valueKey: "current.uv",
        Icon: UVIndex,
        className: "size-6 dark:invert"
    },
    {
        label: "Wind Direction",
        valueKey: "current.wind_dir",
        Icon: WindDirection,
        className: "size-6 dark:invert"
    },
    {
        label: "Max Wind Speed (Kmph)",
        valueKey: "current.gust_kph",
        Icon: WindGust,
        className: "size-6 dark:invert"
    },
    {
        label: "Pressure (hPa)",
        valueKey: "current.pressure_in",
        Icon: Pressure,
        className: "size-6"
    },
    {
        label: "Sunrise",
        valueKey: "forecast.forecastday.0.astro.sunrise",
        Icon: Sunrise,
        className: "size-6"
    },
    {
        label: "Sunset",
        valueKey: "forecast.forecastday.0.astro.sunset",
        Icon: Sunset,
        className: "size-6"
    }
];