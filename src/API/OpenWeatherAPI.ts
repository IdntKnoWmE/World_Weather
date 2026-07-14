import {WeatherResponseSchema, AirPollutionResponseSchema, ForecastResponseSchema} from "../schemas/OpenWeatherAPISchemas/schemas.ts";

const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY


type CurrentOpenWeatherArgsType = {
    lat: number
    lng: number
}

export async function getCurrentWeatherData({lat, lng}: CurrentOpenWeatherArgsType) {

    const result = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?" +
        `lat=${lat}&` +
        `lon=${lng}&` +
        `units=metric&` +
        `mode=JSON&` +
        `appid=${OPEN_WEATHER_API_KEY}`
    )
    const data = await result.json();
    return WeatherResponseSchema.parse(data);

}

type ForecastArgsType = {
    lat: number
    lng: number
}

export async function getForecastData({lat, lng}: ForecastArgsType) {

    const result = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?" +
        `lat=${lat}&` +
        `lon=${lng}&` +
        `units=metric&` +
        `mode=JSON&` +
        `appid=${OPEN_WEATHER_API_KEY}`
    )
    const data = await result.json();
    return ForecastResponseSchema.parse(data);
}

type PollutionArgsType = {
    lat: number
    lng: number
}

export async function getPollutionForecastData({lat, lng}: PollutionArgsType) {

    // return {
    //     "coord":{
    //         "lon":78,
    //         "lat":29
    //     },
    //     "list":[
    //         {
    //             "main":{
    //                 "aqi":30
    //             },
    //             "components":{
    //                 "co":254.98,
    //                 "no":0.52,
    //                 "no2":3.69,
    //                 "o3":92.28,
    //                 "so2":3.91,
    //                 "pm2_5":38.28,
    //                 "pm10":81.8,
    //                 "nh3":10.64
    //             },
    //             "dt":1783747841
    //         }
    //     ]
    // }

    const result = await fetch(
        "https://api.openweathermap.org/data/2.5/air_pollution/forecast?" +
        `lat=${lat}&` +
        `lon=${lng}&` +
        `units=metric&` +
        `mode=JSON&` +
        `appid=${OPEN_WEATHER_API_KEY}`
    )
    const data = await result.json();
    return AirPollutionResponseSchema.parse(data);
}