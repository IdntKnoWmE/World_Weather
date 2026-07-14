import { z } from "zod"

export const WeatherResponseSchema = z.object({
    coord: z.object({
        lon: z.number(),
        lat: z.number(),
    }),
    weather: z.array(
        z.object({
            id: z.number(),
            main: z.string(),
            description: z.string(),
            icon: z.string(),
        })
    ),
    base: z.string(),
    main: z.object({
        temp: z.number(),
        feels_like: z.number(),
        temp_min: z.number().optional(),
        temp_max: z.number().optional(),
        pressure: z.number(),
        humidity: z.number(),
        sea_level: z.number(),
        grnd_level: z.number(),
    }),
    visibility: z.number(),
    wind: z.object({
        speed: z.number(),
        deg: z.number(),
        gust: z.number(),
    }),
    clouds: z.object({
        all: z.number(),
    }),
    dt: z.number(),
    sys: z.object({
        country: z.string(),
        sunrise: z.number(),
        sunset: z.number(),
    }),
    timezone: z.number(),
    id: z.number(),
    name: z.string(),
    cod: z.number(),
});

export const AirPollutionResponseSchema = z.object({
    coord: z.object({
        lon: z.number(),
        lat: z.number(),
    }),
    list: z.array(
        z.object({
            main: z.object({
                aqi: z.number(),
            }),
            components: z.object({
                co: z.number(),
                no: z.number(),
                no2: z.number(),
                o3: z.number(),
                so2: z.number(),
                pm2_5: z.number(),
                pm10: z.number(),
                nh3: z.number(),
            }),
            dt: z.number(),
        })
    ),
});

export const ForecastResponseSchema = z.object({
    cod: z.string(),
    message: z.number(),
    cnt: z.number(),
    city: z.object({
        id: z.number(),
        name: z.string(),
        coord: z.object({
            lat: z.number(),
            lon: z.number(),
        }),
        country: z.string(),
        population: z.number(),
        timezone: z.number(),
        sunrise: z.number(),
        sunset: z.number(),
    }),
    list: z.array(
        z.object({
            dt: z.number(),
            main: z.object({
                temp: z.number(),
                feels_like: z.number(),
                temp_min: z.number(),
                temp_max: z.number(),
                pressure: z.number(),
                sea_level: z.number(),
                grnd_level: z.number(),
                humidity: z.number(),
                temp_kf: z.number(),
                dew_point: z.number(),
            }),
            weather: z.array(
                z.object({
                    id: z.number(),
                    main: z.string(),
                    description: z.string(),
                    icon: z.string(),
                })
            ),
            clouds: z.object({
                all: z.number(),
            }).optional(),
            wind: z.object({
                speed: z.number(),
                deg: z.number(),
                gust: z.number(),
            }),
            visibility: z.number(),
            pop: z.number().optional(),
            rain: z.object({
                '3h': z.number(),
            }).optional(),
            sys: z.object({
                pod: z.string(),
            }).optional(),
            dt_txt: z.string(),
        })
    ),
});

export type ForecastResponse = z.infer<typeof ForecastResponseSchema>;


export type AirPollutionResponse = z.infer<typeof AirPollutionResponseSchema>;
export type WeatherResponse = z.infer<typeof WeatherResponseSchema>;


