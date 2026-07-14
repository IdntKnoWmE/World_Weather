
import Card from "@/components/cards/Card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

function HourlySkeleton() {

    return (
        <Card title="Hourly Forecast (Today)"
              childrenClassName="flex gap-6 p-4 overflow-x-scroll scrollbar-thin scrollbar-thumb-cyan-900/30">

            {Array.from({ length: 24 }).map((_, i) => (
                <div
                    key={i}
                    className="flex flex-col h-40 w-30 shrink-0 gap-3 items-center p-4 rounded-2xl bg-cyan-900/30"
                >
                    <div className="whitespace-nowrap text-lg font-medium">
                        <Skeleton className="w-16 h-6" />
                    </div>
                    <Skeleton className="size-15 rounded-full" />
                    <div>
                        <Skeleton className="w-10 h-6" />
                    </div>
                </div>
            ))}

        </Card>
    );
}

export default HourlySkeleton;