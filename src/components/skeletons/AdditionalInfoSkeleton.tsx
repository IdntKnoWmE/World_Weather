import Card from "@/components/cards/Card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {WeatherAdditionalInfoMappings} from "@/utils/AppMappings.tsx";

function AdditionalInfoSkeleton() {
    return (
        <Card title="Additional Weather Info"
              cardClassName="w-full lg:w-1/2 h-150 mb-10 p-6"
              childrenClassName="flex flex-col gap-5">

            {
                WeatherAdditionalInfoMappings.map(({label, valueKey, Icon, className}) => (
                    <div className="flex justify-between" key={valueKey}>
                        <div className="flex gap-2">
                            <span className="text-lg font-semibold text-gray-500">{label}</span>
                            <Icon className={className}/>
                        </div>
                        <span className="text-lg">
                            <Skeleton className="w-10 h-6" />
                        </span>
                    </div>
                ))
            }

        </Card>
    );
}

export default AdditionalInfoSkeleton;