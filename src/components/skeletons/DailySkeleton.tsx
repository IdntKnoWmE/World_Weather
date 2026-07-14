
import Card from "@/components/cards/Card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

function DailySkeleton() {


    return (
        <Card title="Daily Forecast"
              cardClassName="w-full lg:w-1/2 h-150 lg:mb-10 p-6"
              childrenClassName="flex flex-col gap-3">

            <div className="flex justify-between items-center text-lg font-semibold text-gray-500">
                <p>Day</p>
                <p>Weather</p>
                <p>Avg Temp</p>
                <p>Min Temp</p>
                <p>Max Temp</p>
            </div>

            <div className="flex flex-col gap-2.5">
                {
                    Array.from({length: 9}).map((_, i) => (
                        <div key={i}
                            className="flex justify-between items-center text-center text-lg py-1"
                        >
                            <div className="font-semibold w-8">
                                <Skeleton className="w-8 h-7"></Skeleton>
                            </div>
                            <div className="flex justify-center">
                                <Skeleton className="size-9 rounded-full"></Skeleton>
                            </div>
                            <div className="font-medium"><Skeleton className="w-10 h-7"></Skeleton></div>
                            <div className=" font-normal"><Skeleton className="w-10 h-7"></Skeleton></div>
                            <div className=" font-medium"><Skeleton className="w-10 h-7"></Skeleton></div>
                        </div>
                    ))}
            </div>
        </Card>
    );
}

export default DailySkeleton;