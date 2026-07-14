import Card from "./Card.tsx";
import {useWeatherQuery} from "@/hooks/useWeatherQuery.ts";
import {getPollutionForecastData} from "@/API/OpenWeatherAPI.ts";
import AQIChart from "@/components/charts/AQIChart.tsx";
import {
    AQI_TEXT_MAPPING,
    getPollutantSubIndex,
    OPEN_WEATHER_AQI_MAPPING,
} from "@/utils/AqiMappings.tsx";
import PollutionInfoSkeleton from "@/components/skeletons/PollutionInfoSkeleton.tsx";

// type DailyForecastProps = {}


function PollutionForecast() {

    const { data, shouldShowSkeleton, locationString, isError } = useWeatherQuery({
        queryKeyPrefix: 'pollutionForecast',
        fetchFn: getPollutionForecastData,
    });

    if (shouldShowSkeleton) {
        return <PollutionInfoSkeleton key={`skeleton-${locationString}`} />;
    }


    // Standard fallback routes
    if (isError || !data || Array.isArray(data)) {
        return (

            <Card title="Pollution Info"
                  cardClassName="w-full h-185 p-6"
                  childrenClassName="w-full h-full flex flex-col gap-4 justify-center items-center text-center
                                  dark:bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl py-7 px-6"
            >
                <p className="text-center text-2xl font-medium">No data found for this location.</p>
            </Card>
        )
    }

    const pollutantIndexAndRange = getPollutantSubIndex('aqi', data.list[0].main.aqi);
    const  aqiIndex = pollutantIndexAndRange[0];
    const label = OPEN_WEATHER_AQI_MAPPING[aqiIndex].label;


    return (
        <>
            <Card title="Pollution Info"
                  cardClassName="w-full lg:h-185 p-6"
                  childrenClassName="w-full h-full flex flex-col gap-4 justify-center items-center text-center
                                  dark:bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl py-7 px-6"
            >

                <div className={`flex flex-col sm:flex-row gap-3 sm:h-50`}>

                    <div className={`flex flex-col gap-3 px-4 pt-8 ${AQI_TEXT_MAPPING[label].bgClass} 
                                        backdrop-blur-xl rounded-3xl shadow-2xl
                                    `}>

                        <div className="text-lg font-semibold text-red-600 text-center">
                            {AQI_TEXT_MAPPING[label].label} ({AQI_TEXT_MAPPING[label].subText})
                        </div>

                        <div className='text-sm text-yellow-500'>
                            Health: {AQI_TEXT_MAPPING[label].healthStatement}
                        </div>
                        <div className='text-sm text-blue-500'>
                            Advice: {AQI_TEXT_MAPPING[label].actionAdvice}
                        </div>
                    </div>
                    <div>
                        <AQIChart pollutantKey={"aqi"} rawValue={data.list[0].main.aqi} width={140} height={50} top={80}/>
                    </div>


                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 bg-white/5 backdrop-blur-xl rounded-lg shadow-2xl py-6">

                    <AQIChart pollutantKey={"pm2_5"} rawValue={data.list[0].components.pm2_5} width={100} height={30} top={40}/>
                    <AQIChart pollutantKey={"pm10"} rawValue={data.list[0].components.pm10} width={100} height={30} top={40}/>
                    <AQIChart pollutantKey={"so2"} rawValue={data.list[0].components.so2} width={100} height={30} top={40}/>
                    <AQIChart pollutantKey={"no2"} rawValue={data.list[0].components.no2} width={100} height={30} top={40}/>
                    <AQIChart pollutantKey={"co"} rawValue={data.list[0].components.co} width={100} height={30} top={40}/>
                    <AQIChart pollutantKey={"o2"} rawValue={data.list[0].components.o3} width={100} height={30} top={40}/>


                </div>


            </Card>
        </>
    );
}

export default PollutionForecast;