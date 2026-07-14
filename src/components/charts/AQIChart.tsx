import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type Plugin } from 'chart.js';
import {
    getPollutantSubIndex,
    OPEN_WEATHER_AQI_MAPPING,
    type OpenWeatherPollutantKey,
} from "@/utils/AqiMappings.tsx";

// Register core Chart.js features
ChartJS.register(ArcElement, Tooltip, Legend);

interface PollutionChartProps {
    pollutantKey: OpenWeatherPollutantKey;
    rawValue: number;
    width: number;
    height: number;
    top: number
}

function AQIChart({ pollutantKey, rawValue, width, height, top }: PollutionChartProps) {

    // 1. Calculate AQI Index and fetch corresponding tier configs
    const pollutantIndexAndRange = getPollutantSubIndex(pollutantKey, rawValue);

    const value = Math.round(rawValue);

    // segmentIndex, min and max value of our in which our pollutant value lies
    const [segmentIndex, minValue, maxValue] = pollutantIndexAndRange;

    const tier = OPEN_WEATHER_AQI_MAPPING[segmentIndex];
    const showOnlyGraph = segmentIndex === 0;



    // const gaugeLineMarkerPlugin: Plugin<'doughnut'> = {
    //     id: 'valueLineMarker',
    //     afterDraw(chart) {
    //         const { ctx } = chart;
    //         const meta = chart.getDatasetMeta(0);
    //         const arc = (meta.data[0] as ArcElement);
    //         if (!arc) return;
    //
    //         const cx = arc.x;
    //         const cy = arc.y;
    //
    //         // Calculate the percentage progress within this single specific category block
    //         const localProgress = (value - minValue) / (maxValue - minValue);
    //         const safeLocalProgress = Math.min(Math.max(localProgress, 0), 1);
    //
    //         // Each equal segment takes up exactly 1/6th of the total canvas space
    //         const segmentWeight = 1/6;
    //         const finalGaugeFraction = ((segmentIndex-1) * segmentWeight) + (safeLocalProgress * segmentWeight);
    //
    //         const finalFrac = Math.min(Math.max(finalGaugeFraction, 0), 1);
    //         const angle = Math.PI + finalFrac * Math.PI; // 180deg start, sweeps to 360deg
    //
    //         // Calculate start coordinates (on the inner track edge)
    //         const xStart = cx + arc.innerRadius * Math.cos(angle);
    //         const yStart = cy + arc.innerRadius * Math.sin(angle);
    //
    //         // Calculate end coordinates (protruding slightly past the outer track edge for style)
    //         const xEnd = cx + (arc.outerRadius + 4) * Math.cos(angle);
    //         const yEnd = cy + (arc.outerRadius + 4) * Math.sin(angle);
    //
    //         ctx.save();
    //         ctx.beginPath();
    //
    //         // Set up a sharp, premium-looking vector stroke
    //         ctx.moveTo(xStart, yStart);
    //         ctx.lineTo(xEnd, yEnd);
    //
    //         ctx.lineWidth = 3.5;                  // Clean, high-visibility line width
    //         ctx.strokeStyle = "#0f172a";          // Sleek dark slate / near black needle
    //         ctx.lineCap = "round";                // Smooth rounded capsule edges
    //
    //         // Apply drop shadow for premium depth look
    //         ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
    //         ctx.shadowBlur = 4;
    //         ctx.shadowOffsetX = 0;
    //         ctx.shadowOffsetY = 2;
    //
    //         ctx.stroke();
    //         ctx.restore();
    //     },
    // };





    // Custom Plugin to draw the perfect indicator circle marker
    const gaugeDotMarkerPlugin: Plugin<'doughnut'> = {
        id: "valueDotMarker",
        afterDraw(chart) {
            const { ctx } = chart;
            const meta = chart.getDatasetMeta(0);
            const arc = (meta.data[0] as ArcElement);
            if (!arc) return;

            const cx = arc.x;
            const cy = arc.y;
            const radius = (arc.outerRadius + arc.innerRadius) / 2;
            const innerDotRadius = (arc.outerRadius - arc.innerRadius) / 4;

            // Calculate the percentage progress within this single specific category block
            const localProgress = (value - minValue) / (maxValue - minValue);
            const safeLocalProgress = Math.min(Math.max(localProgress, 0), 1);

            // Each equal segment takes up exactly 1/6th of the total canvas space
            const segmentWeight = +(1/6).toFixed(2);
            const finalGaugeFraction = ((segmentIndex-1) * segmentWeight) + (safeLocalProgress * segmentWeight);

            const finalFrac = Math.min(Math.max(finalGaugeFraction, 0), 1);
            const angle = +(Math.min(2 * Math.PI, Math.PI + finalFrac * Math.PI)).toFixed(2); // 180deg start, sweeps to 360deg

            const x = +(cx + radius * Math.cos(angle)).toFixed(2);
            const y = +(cy + radius * Math.sin(angle)).toFixed(2);

            ctx.save();
            ctx.beginPath();

            const calc_x = x;
            const calc_y = (value<=minValue || value>=maxValue) ? y-4: y;

            ctx.arc( calc_x, calc_y, innerDotRadius, 0, Math.PI * 2);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        },
    };


    const data = {
        labels: Object.entries(OPEN_WEATHER_AQI_MAPPING).map((item) => {
            return item[1].label;
        }),
        datasets: [
            {
                data: Array(6).fill(+(100/6).toFixed(2)),
                backgroundColor: Object.entries(OPEN_WEATHER_AQI_MAPPING)
                    .filter((item) => item[1].index > 0)
                    .map((item) => {
                        return item[1].rgbaColor;
                }),
                borderWidth: 0,
                needleValue: value, // Kept property hook name for ease
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        rotation: -90,
        circumference: 180,
        radius: width,
        borderRadius: 4,
        cutout: '86%', // Thin track profile looks premium with center typography
        hoverOffset: 10,
        spacing:2,
        plugins: {
            // Hide native built-in plugins here
            legend: { display: false },
            tooltip: {
                enabled: true,
                callbacks: {
                    title: () => '',
                    label: function(context: any) {
                        const labelName = context.label || '';
                        // Appends your real pollutant concentration value to the active segment hover
                        return labelName;
                    }
                }
            },
        },
    };


    return (
        <div className={`relative flex flex-col items-center justify-center text-center select-none`}
            style={{height: height * 4}}
        >
            {/* Chart Canvas */}
            <div className={`relative w-full `}>
                {
                    showOnlyGraph
                    ? <Doughnut data={data} options={options} />
                    : <Doughnut data={data} options={options} plugins={[gaugeDotMarkerPlugin]}/>
                }

            </div>

            {/* Centered Content Stack linked to mapping */}
            <div className="absolute text-center flex flex-col items-center"
                style={{top: top}}
            >
                <h1 className={`${tier.color} font-medium tracking-tight leading-none`}
                    style={{fontSize: height-height/15}}
                >
                    {value}
                </h1>
                <h2 className={`font-bold tracking-wider uppercase mt-2.5 ${tier.color}`}
                    style={{fontSize: Math.max(height/5, 4)}}
                >
                    {tier.label}
                </h2>
                <span className={` font-bold tracking-widest text-slate-400 uppercase mt-0.5`}
                      style={{fontSize: Math.max(height/5, 4)}}
                >
                    {pollutantKey} concentration
                </span>
            </div>
        </div>
    );
}

export default AQIChart;