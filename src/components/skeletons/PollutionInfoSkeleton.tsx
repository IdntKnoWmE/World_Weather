
import Card from "@/components/cards/Card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

function PollutionInfoSkeleton() {
    return (
        <>
            <Card title="Pollution Info"
                  cardClassName="w-full lg:h-185 p-6"
                  childrenClassName="w-full h-full flex flex-col gap-4 justify-center items-center text-center
                                  bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl py-7 px-6"
            >

                {/* Top Layout Block: Text Card & Main AQI Chart */}
                <div className="w-full flex flex-col sm:flex-row gap-3 sm:h-50 justify-center items-center">

                    {/* Text Block Placeholder Container */}
                    <div className="w-full sm:w-100 flex flex-col gap-4 px-4 py-8 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl items-center border border-white/10">
                        {/* AQI Level Title */}
                        <Skeleton className="h-6 w-3/4 bg-white/20" />
                        {/* Health Statement */}
                        <Skeleton className="h-4 w-5/6 bg-white/10" />
                        {/* Action Advice */}
                        <Skeleton className="h-4 w-2/3 bg-white/10" />
                    </div>

                    {/* Main AQI Chart Space (Matches width 140) */}
                    <div>
                        <Skeleton className="w-60 h-40 bg-white/10 rounded-2xl" />
                    </div>

                </div>

                {/* Bottom Grid Layout Block: 6 Small Pollutant Charts */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 bg-white/5 backdrop-blur-xl rounded-lg shadow-2xl py-6 justify-items-center">

                   <Skeleton className="w-60 h-30 bg-white/10 rounded-2xl" />
                    <Skeleton className="w-60 h-30 bg-white/10 rounded-2xl" />
                    <Skeleton className="w-60 h-30 bg-white/10 rounded-2xl" />
                    <Skeleton className="w-60 h-30 bg-white/10 rounded-2xl" />
                    <Skeleton className="w-60 h-30 bg-white/10 rounded-2xl" />
                    <Skeleton className="w-60 h-30 bg-white/10 rounded-2xl" />

                </div>


            </Card>
        </>
    );
}

export default PollutionInfoSkeleton;