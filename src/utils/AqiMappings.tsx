export type OpenWeatherAQIIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type getPollutantIndexAndRange = [
    index: OpenWeatherAQIIndex,
    minValue: number,
    maxValue: number,
    ];

export interface AQITierDetails {
    index: OpenWeatherAQIIndex;
    label: string;
    color: string;           // Clean Tailwind UI Typography Colors
    rgbaColor: string;       // ChartJS sector rendering colors
    chartValue: number;      // 0-100 normalized point to update the Doughnut Indicator
}


export type OpenWeatherPollutantKey = 'so2' | 'no2' | 'pm10' | 'pm2_5' | 'o3' | 'co' | 'nh3' | 'no' | 'aqi' | string;

// Breakpoint structures including NH3 targets for layout categorization components
export const POLLUTANT_THRESHOLDS: Record<OpenWeatherPollutantKey, number[]> = {
    so2: [20, 80, 250, 350],
    no2: [40, 70, 150, 200],
    pm10: [20, 50, 100, 200],
    pm2_5: [10, 25, 50, 75],
    o3: [60, 100, 140, 180],
    co: [4400, 9400, 12400, 15400],
    // NH3 is treated as an informative parameter (Standard European threshold indexing fallback bounds)
    nh3: [10, 25, 40, 70],
    aqi: [50, 100, 200, 300, 400],
    no: [10, 25, 40, 70]
};


const chartValueMul = +(100/6).toFixed(2);


// Universal OpenWeather scale mapping parameters
export const OPEN_WEATHER_AQI_MAPPING: Record<OpenWeatherAQIIndex, AQITierDetails> = {
    1: {index: 1, label: 'Good', color: 'text-emerald-500', rgbaColor: 'rgba(16, 185, 129, 0.80)', chartValue: chartValueMul},
    2: {index: 2, label: 'Fair', color: 'text-green-400', rgbaColor: 'rgba(74, 222, 128, 0.80)', chartValue: 2* chartValueMul},
    3: {index: 3, label: 'Moderate', color: 'text-yellow-400', rgbaColor: 'rgba(250, 204, 21, 0.80)', chartValue: 3*chartValueMul},
    4: {index: 4, label: 'Poor', color: 'text-orange-500', rgbaColor: 'rgba(249, 115, 22, 0.80)', chartValue: 4*chartValueMul},
    5: {index: 5, label: 'Very Poor', color: 'text-red-500', rgbaColor: 'rgba(244, 12, 12, 0.80)', chartValue: 5*chartValueMul},
    6: {index: 6, label: 'Severe', color: 'text-purple-500', rgbaColor: 'rgba(150, 53, 247, 0.80)', chartValue: 6*chartValueMul},
    0: {index: 0, label: 'Unknown', color: 'text-gray-400', rgbaColor: 'rgba(156, 163, 175, 0.80)', chartValue: 0}, // For Unknown pollutants

};


/**
 * Calculates a standard sub-index tier (1-5) for individual components.
 */
export function getPollutantSubIndex(key: OpenWeatherPollutantKey, value: number): getPollutantIndexAndRange {
    // Return Good (1) immediately if it is 'no' or falls out of threshold scope
    if (key === 'no' || !(key in POLLUTANT_THRESHOLDS)) return [ 0, 0 , 0];

    const thresholds: number[] = POLLUTANT_THRESHOLDS[key as Exclude<OpenWeatherPollutantKey, 'no'>];
    if (value < thresholds[0]) return [1, 0, thresholds[0]];
    if (value < thresholds[1]) return [2, thresholds[0] + 1, thresholds[1]];
    if (value < thresholds[2]) return [3, thresholds[1] + 1, thresholds[2]];
    if (value < thresholds[3]) return [4, thresholds[2] + 1, thresholds[3]];
    if (value < thresholds[4]) return [5, thresholds[3] + 1, thresholds[4]];
    return [6, thresholds[4] + 1, key === "co"? 20000 : 2000];
}


export interface AQITextDetails {
    label: string;
    subText: string;
    healthStatement: string;
    actionAdvice: string;
    bgClass: string;     // Muted background for card wrappers
    textClass: string;   // Clean Tailwind UI typography colors
}

export const AQI_TEXT_MAPPING: Record<string, AQITextDetails> = {
    'Unknown': {
        label: 'Unknown',
        subText: 'Unknown Impact',
        healthStatement: 'No health evaluation present!',
        actionAdvice: 'No advice available! Stay safe',
        bgClass: 'bg-gray-50/50 dark:bg-gray-950/20',
        textClass: 'text-gray-500 dark:text-gray-400'
    },
    'Good': {
        label: 'Good',
        subText: 'Minimal Impact',
        healthStatement: 'Air quality is completely satisfactory, and air pollution poses little or no risk.',
        actionAdvice: 'Perfect day for outdoor sports, ventilation, and open-air activities.',
        bgClass: 'bg-emerald-50/50 dark:bg-emerald-950/20',
        textClass: 'text-emerald-500 dark:text-emerald-400'
    },
    'Fair': {
        label: 'Fair',
        subText: 'Minor Discomfort',
        healthStatement: 'May cause minor breathing discomfort to sensitive individuals over long periods.',
        actionAdvice: 'Safe to proceed with normal outdoor routines. Keep an eye out if highly sensitive.',
        bgClass: 'bg-green-50/50 dark:bg-green-950/20',
        textClass: 'text-green-500 dark:text-green-400'
    },
    'Moderate': {
        label: 'Moderate',
        subText: 'Breathing Discomfort',
        healthStatement: 'May cause breathing discomfort to people with lung disease, asthma, or heart illness.',
        actionAdvice: 'Consider reducing prolonged heavy exertion outdoors if you experience symptoms.',
        bgClass: 'bg-yellow-50/50 dark:bg-yellow-950/20',
        textClass: 'text-yellow-500 dark:text-yellow-400'
    },
    'Poor': {
        label: 'Poor',
        subText: 'Health Alert',
        healthStatement: 'May cause breathing discomfort to most people on prolonged exposure.',
        actionAdvice: 'Cut back on intense outdoor training. Close windows during peak traffic hours.',
        bgClass: 'bg-orange-50/50 dark:bg-orange-950/20',
        textClass: 'text-orange-500 dark:text-orange-400'
    },
    'Very Poor': {
        label: 'Very Poor',
        subText: 'Respiratory Illness',
        healthStatement: 'May cause respiratory illness to people on prolonged exposure. Effect is more pronounced.',
        actionAdvice: 'Avoid morning outdoor jogs. Sensitive groups should stay indoors and use air purifiers.',
        bgClass: 'bg-red-500/50 dark:bg-red-950/20',
        textClass: 'text-red-500 dark:text-red-400'
    },
    'Severe': {
        label: 'Severe',
        subText: 'Emergency Health Impact',
        healthStatement: 'Affects healthy people and seriously impacts those with existing diseases.',
        actionAdvice: 'Stay completely indoors. Keep doors/windows shut. Run air filtration systems at full capacity.',
        bgClass: 'bg-purple-50/50 dark:bg-purple-950/20',
        textClass: 'text-purple-500 dark:text-purple-400'
    }
};
