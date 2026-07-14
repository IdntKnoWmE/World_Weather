
import Wind from "/src/assets/wind.svg?react";
import Humidity from "/src/assets/humidity.svg?react";
import Temperature from "/src/assets/temperature.svg?react";
import Card from "@/components/cards/Card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";


function CurrentSkeleton() {
    return (
        <Card
            title="Current Weather"
            cardClassName="w-full lg:h-185 p-6"
            childrenClassName="w-full py-4 flex justify-center items-center text-center
                                   bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl"
        >
            <div className="w-full flex flex-col gap-6 lg:gap-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full md:items-center gap-6 pb-6">

                    {/*Local Time*/}
                    <div
                        className="w-full flex flex-col gap-1 p-4 rounded-2xl items-center  
                                        sm:justify-self-start lg:justify-self-center sm:pl-20 lg:pl-0">
                            <span className="text-sm uppercase tracking-widest text-slate-500 font-semibold">
                                Local Time
                            </span>
                            <h3 className="mx-auto sm:ml-4 w-full text-lg lg:text-2xl tracking-widest font-medium text-white">
                                <Skeleton className="h-9"/>
                            </h3>
                    </div>

                    {/*Place*/}
                    <div
                        className="w-full flex flex-col gap-1 p-4 rounded-2xl 
                                        items-center sm:justify-self-end lg:justify-self-center sm:pr-20 lg:pr-0">
                            <span className="text-sm uppercase tracking-widest text-slate-500 font-semibold">
                                Place
                            </span>
                            <h3 className="w-full text-lg lg:text-2xl tracking-widest font-medium text-white">
                                <Skeleton className="h-9"/>
                            </h3>
                    </div>

                    {/* Added Date and Week Day */}
                    <div
                        className="flex flex-col gap-1 p-4 sm:col-span-2 lg:col-span-1 rounded-2xl  
                                        sm:-mt-10 lg:mt-0">
                            <span
                                className="text-sm uppercase tracking-widest text-slate-500 font-semibold">Today Date</span>
                            <div className="text-lg lg:text-2xl tracking-widest font-medium text-white">
                                <Skeleton className="h-9"/>
                            </div>
                    </div>

                </div>

                {/* Middle Row: Massive Temperature Display & Condition */}
                <div className="flex lg:flex-row items-center justify-center gap-6 my-10">

                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
                        <div className=" bg-white/10 rounded-2xl backdrop-blur-md shadow-inner">
                            <Skeleton className="size-22"/>
                        </div>
                        <h3 className="capitalize text-base lg:text-2xl font-bold tracking-wide mt-1 text-slate-100">
                            <Skeleton className="w-40 h-8"/>
                        </h3>
                    </div>

                    <h2 className="text-6xl lg:text-8xl pb-2 font-extrabold text-transparent bg-clip-text bg-linear-to-b from-white to-slate-400 select-none">
                        <Skeleton className="w-80 h-34"/>
                    </h2>

                </div>

                {/* Bottom Row: Weather Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full md:items-center gap-6 pt-6">

                    {/* Wind */}
                    <div
                        className="flex gap-2 p-4 sm:col-span-2 lg:col-span-1 rounded-2xl justify-center
                                    "
                    >
                        <Wind className="size-12 lg:size-15 invert"/>
                        <div className="flex flex-col items-center gap-1 text-slate-400">
                            <span className="text-sm lg:text-lg font-semibold">Wind</span>
                            <div className="text-xl lg:text-2xl font-semibold text-white">
                                <Skeleton className="w-20 h-9"/>
                            </div>
                        </div>
                    </div>

                    {/* Feels Like */}
                    <div
                        className="flex gap-2 p-4 rounded-2xl justify-center sm:justify-start lg:justify-center  
                                         sm:pl-20 lg:pl-0">
                        <Temperature className="size-12 lg:size-15 invert"/>

                        <div className="flex flex-col items-center gap-1 text-slate-400">
                            <span className="text-sm lg:text-lg font-semibold">Feels Like</span>
                            <div className="text-xl lg:text-2xl font-semibold text-white"><Skeleton className="w-20 h-9"/></div>
                        </div>

                    </div>

                    {/* Humidity */}
                    <div
                        className="flex gap-2 p-4 rounded-2xl justify-center sm:justify-end lg:justify-center 
                                        sm:pr-20 lg:pr-0">

                    <Humidity className="size-13 lg:size-15 invert"/>
                        <div className="flex flex-col items-center gap-1 text-slate-400">
                            <span className="text-sm lg:text-lg font-semibold">Humidity</span>
                            <div className="text-xl lg:text-2xl font-semibold text-white"><Skeleton className="w-20 h-9"/></div>
                        </div>

                    </div>


                </div>
            </div>
        </Card>
    );
}

export default CurrentSkeleton;