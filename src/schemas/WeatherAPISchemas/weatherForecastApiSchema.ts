import { z } from "zod";

// Condition object used in multiple places
const conditionSchema = z.object({
    text: z.string(),
    icon: z.string(),
    code: z.number().int(),
});

// Reusable Binary Flag type (0 or 1)
const binaryFlagSchema = z.union([z.literal(0), z.literal(1)]);

// Hourly Data Schema
const hourSchema = z.object({
    time_epoch: z.number().int(),
    time: z.string(),
    temp_c: z.number(),
    temp_f: z.number(),
    is_day: binaryFlagSchema,
    condition: conditionSchema,
    wind_mph: z.number(),
    wind_kph: z.number(),
    wind_degree: z.number().int(),
    wind_dir: z.string(),
    pressure_mb: z.number(),
    pressure_in: z.number(),
    precip_mm: z.number(),
    precip_in: z.number(),
    snow_cm: z.number().optional(),
    humidity: z.number().int(),
    cloud: z.number().int(),
    feelslike_c: z.number(),
    feelslike_f: z.number(),
    windchill_c: z.number().nullable().optional(), // Nullable depending on hot/cold local climate thresholds
    windchill_f: z.number().nullable().optional(),
    heatindex_c: z.number().nullable().optional(), // Nullable depending on hot/cold local climate thresholds
    heatindex_f: z.number().nullable().optional(),
    dewpoint_c: z.number(),
    dewpoint_f: z.number(),
    will_it_rain: binaryFlagSchema,
    chance_of_rain: z.number().int(),
    will_it_snow: binaryFlagSchema,
    chance_of_snow: z.number().int(),
    vis_km: z.number(),
    vis_miles: z.number(),
    gust_mph: z.number(),
    gust_kph: z.number(),
    uv: z.number(),
    wetbulb_c: z.number().optional(), // Enterprise tier specific
    wetbulb_f: z.number().optional(),
    short_rad: z.number().optional(),  // Solar element (Enterprise plans only)
    diff_rad: z.number().optional(),   // Solar element (Enterprise plans only)
    dni: z.number().optional(),        // Solar element (Enterprise plans only)
    gti: z.number().optional(),        // Solar element (Enterprise plans only)
});

export const weatherForecastApiSchema = z.object({
    location: z.object({
        name: z.string(),
        region: z.string(),
        country: z.string(),
        lat: z.number(),
        lon: z.number(),
        tz_id: z.string(),
        localtime_epoch: z.number().int(),
        localtime: z.string(),
    }),
    current: z.object({
        last_updated_epoch: z.number().int(),
        last_updated: z.string(),
        temp_c: z.number(),
        temp_f: z.number(),
        is_day: z.union([z.literal(0), z.literal(1)]),
        condition: conditionSchema,
        wind_mph: z.number(),
        wind_kph: z.number(),
        wind_degree: z.number().int(),
        wind_dir: z.string(),
        pressure_mb: z.number(),
        pressure_in: z.number(),
        precip_mm: z.number(),
        precip_in: z.number(),
        humidity: z.number().int(),
        cloud: z.number().int(),
        feelslike_c: z.number(),
        feelslike_f: z.number(),
        windchill_c: z.number().nullable().optional(), // Nullable in hot climates/regions
        windchill_f: z.number().nullable().optional(),
        heatindex_c: z.number().nullable().optional(), // Nullable in cold climates/regions
        heatindex_f: z.number().nullable().optional(),
        dewpoint_c: z.number(),
        dewpoint_f: z.number(),
        vis_km: z.number(),
        vis_miles: z.number(),
        uv: z.number(),
        gust_mph: z.number(),
        gust_kph: z.number(),
        will_it_rain: z.union([z.literal(0), z.literal(1)]).optional(),
        chance_of_rain: z.number().int().optional(),
        will_it_snow: z.union([z.literal(0), z.literal(1)]).optional(),
        chance_of_snow: z.number().int().optional(),
        wetbulb_c: z.number().optional(),
        wetbulb_f: z.number().optional(),
        short_rad: z.number().optional(),
        diff_rad: z.number().optional(),
        dni: z.number().optional(),
        gti: z.number().optional(),
    }),
    forecast: z.object({
        forecastday: z.array(
            z.object({
                date: z.string(),
                date_epoch: z.number().int(),
                day: z.object({
                    maxtemp_c: z.number(),
                    maxtemp_f: z.number(),
                    mintemp_c: z.number(),
                    mintemp_f: z.number(),
                    avgtemp_c: z.number(),
                    avgtemp_f: z.number(),
                    maxwind_mph: z.number(),
                    maxwind_kph: z.number(),
                    totalprecip_mm: z.number(),
                    totalprecip_in: z.number(),
                    totalsnow_cm: z.number().optional(),
                    avgvis_km: z.number(),
                    avgvis_miles: z.number(),
                    avghumidity: z.number(),
                    daily_will_it_rain: z.union([z.literal(0), z.literal(1)]),
                    daily_chance_of_rain: z.number().int(),
                    daily_will_it_snow: z.union([z.literal(0), z.literal(1)]),
                    daily_chance_of_snow: z.number().int(),
                    condition: conditionSchema,
                    uv: z.number(),
                    avgwetbulb_c: z.number().optional(),
                    avgwetbulb_f: z.number().optional(),
                    maxwetbulb_c: z.number().optional(),
                    maxwetbulb_f: z.number().optional(),
                }),
                astro: z.object({
                    sunrise: z.string(),
                    sunset: z.string(),
                    moonrise: z.string(),
                    moonset: z.string(),
                    moon_phase: z.string(),
                    moon_illumination: z.number().int(),
                    is_moon_up: z.union([z.literal(0), z.literal(1)]).optional(),
                    is_sun_up: z.union([z.literal(0), z.literal(1)]).optional(),
                }),
                hour: z.array(hourSchema).optional(),
                // Updated to optional to protect against queries missing hourly details
            })
        ),
    }),
});

export type WeatherForecastApiResponse = z.infer<typeof weatherForecastApiSchema>;
