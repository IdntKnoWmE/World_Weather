import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useMapType} from "@/components/contexts/MapTypeContext.tsx";

function MapTypeDropdown() {

    const {mapType, setWeatherMap } = useMapType();

    function handleMapTypeChange(newValue: string|null) {
        if (!newValue) return;
        setWeatherMap(newValue);

    }

    const mapTypes = [
        "simple", "clouds_new", "precipitation_new", "pressure_new", "wind_new", "temp_new"
        ]

    const capitalize = (word: string): string => {
        const actual_word: string = word.split("_")[0];
        return actual_word[0].toUpperCase() + actual_word.slice(1);

    }

    return (
        <Select value={capitalize(mapType)} onValueChange={handleMapTypeChange}>
            <SelectTrigger className="w-45 text-base font-semibold">
                <SelectValue placeholder="Select Location"/>
            </SelectTrigger>
            {/* FIX: Use correct Tailwind bracket syntax for custom z-index numbers */}
            <SelectContent className="z-50 max-h-60 overflow-y-auto w-(--radix-select-trigger-width)">
                <SelectGroup>
                    {mapTypes.map((item) => (
                        <SelectItem key={item} value={item} className="capitalize text-base">
                            {item.split("_")[0]}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default MapTypeDropdown;
