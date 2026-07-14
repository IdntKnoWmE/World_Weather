import { z } from 'zod';

// Condition object used in multiple places
const conditionSchema = z.object({
    text: z.string(),
    icon: z.string(),
    code: z.number().int(),
});

export const currentWeatherApiSchema = z.object({
    location: z.object({
        name: z.string(),
        region: z.string(),
        country: z.string(),
        lat: z.number(),
        lon: z.number(),
        tz_id: z.string(),
        localtime_epoch: z.number(),
        localtime: z.string(),
    }),
    current: z.object({
        last_updated_epoch: z.number(),
        last_updated: z.string(),
        temp_c: z.number(),
        temp_f: z.number(),
        is_day: z.union([z.literal(0), z.literal(1)]),
        condition: conditionSchema,
        wind_mph: z.number(),
        wind_kph: z.number(),
        wind_degree: z.number(),
        wind_dir: z.string(),
        pressure_mb: z.number(),
        pressure_in: z.number(),
        precip_mm: z.number(),
        precip_in: z.number(),
        humidity: z.number(),
        cloud: z.number(),
        feelslike_c: z.number(),
        feelslike_f: z.number(),
        windchill_c: z.number().nullish(), // Can be nullish depending on the season/temperature thresholds
        windchill_f: z.number().nullish(),
        heatindex_c: z.number().nullish(), // Can be nullish depending on the season/temperature thresholds
        heatindex_f: z.number().nullish(),
        dewpoint_c: z.number(),
        dewpoint_f: z.number(),
        vis_km: z.number(),
        vis_miles: z.number(),
        uv: z.number(),
        gust_mph: z.number().nullish(),
        gust_kph: z.number().nullish(),
        will_it_rain: z.union([z.literal(0), z.literal(1)]).nullish(), // Forecast field sometimes omitted or null in current data
        chance_of_rain: z.number().nullish(),
        will_it_snow: z.union([z.literal(0), z.literal(1)]).nullish(),
        chance_of_snow: z.number().nullish(),
        wetbulb_c: z.number().nullish(),
        wetbulb_f: z.number().nullish(),
        air_quality: z.object({
            co: z.number(),
            no2: z.number(),
            o3: z.number(),
            so2: z.number(),
            pm2_5: z.number(),
            pm10: z.number(),
            'us-epa-index': z.number(),
            'gb-defra-index': z.number(),
        }).optional(),
        short_rad: z.number().nullish(), // Solar radiation indices vary significantly by station/time
        diff_rad: z.number().nullish(),
        dni: z.number().nullish(),
        gti: z.number().nullish(),
    }),
});

export type currentWeatherApiSchema = z.infer<typeof currentWeatherApiSchema>;


