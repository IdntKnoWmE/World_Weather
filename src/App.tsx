import DailyForecast from "./components/cards/DailyForecast.tsx";
import CurrentWeather from "./components/cards/CurrentWeather.tsx";
import HourlyForecast from "./components/cards/HourlyForecast.tsx";
import AdditionalInfo from "./components/cards/AdditionalInfo.tsx";
import Map from "./components/Map.tsx";
import LocationDropdown from "@/components/dropdowns/LocationDropdown.tsx";
import MapTypeDropdown from "@/components/dropdowns/MapTypeDropdown.tsx";
import MapLegend from "@/components/MapLegend.tsx";
import PollutionForecast from "@/components/cards/PollutionForecast.tsx";
import LightDarkToggle from "@/components/LightDarkToggle.tsx";

function App() {

    return (
        <div className="w-full dark:bg-card bg-amber-100 text-black dark:text-white flex flex-col gap-6">


            <div className={`w-full dark:bg-white/5 bg-black/10 backdrop-blur-xl border dark:border-white/10 border-black/20  px-4 sm:px-6 py-4 transition-all duration-300`}>
                <div className="flex justify-between flex-col md:flex-row gap-4">

                    {/* 1. Left Section: Optional Brand/Title (Hidden on small mobile if not needed) */}
                    <div className="flex items-center justify-center font-bold text-center md:text-start
                                    text-xl xl:text-3xl "
                    >
                        World Weather Radar
                    </div>

                    {/* 2. Center Section: Main Controls (Perfectly centered on desktop, clean rows on mobile) */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-lg
                                    font-medium dark:text-slate-300">

                        {/* Location Selector */}
                        <div className="flex grid-cols-2 gap-2 w-full sm:w-auto justify-center">
                            <span className=" dark:text-slate-400 font-semibold whitespace-nowrap">Location:</span>
                            <div className="">
                                <LocationDropdown />
                            </div>
                        </div>

                        {/* Separator Line (Only visible on tablet/desktop) */}
                        <div className="hidden sm:block h-4 w-px bg-white/10" />

                        {/* Map Type Selector */}
                        <div className="flex pr-5 grid-cols-2 gap-2 w-full sm:w-auto justify-center">
                            <span className="dark:text-slate-400 font-semibold whitespace-nowrap">Map Types:</span>
                            <div className="">
                                <MapTypeDropdown />
                            </div>
                        </div>
                    </div>

                    {/* 3. Right Section: Theme Toggle (Snapped to the extreme right edge) */}
                    <div className="flex items-center justify-center md:justify-end">
                        <div className="flex items-center gap-3 px-4 py-1 rounded-lg bg-black/50 dark:bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200">
                            <LightDarkToggle />
                        </div>
                    </div>

                </div>
            </div>

            <div className="relative">
                <Map/>
                <MapLegend/>
            </div>
            <div className="w-full grid grid-cols-1 2xl:grid-cols-2 2xl:gap-3 gap-6">
                <CurrentWeather/>
                <PollutionForecast/>
            </div>
            <HourlyForecast/>
            <div className="w-full flex flex-col lg:flex-row lg:gap-3 gap-6">
                <DailyForecast/>
                <AdditionalInfo/>
            </div>





        </div>
    )
}

export default App
