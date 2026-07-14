import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useLocation} from "@/components/contexts/LocationContext.tsx";
import {useMutation} from "@tanstack/react-query";
import {searchLocation} from "@/API/WeatherAPI.ts";

function LocationDropdown() {

    const {setLocation, setIsChangingLocation, city, setCity} = useLocation();

    // Let's use useMutation here as we need to trigger the searchLocation API manually
    const mutation = useMutation({
        mutationKey: ["searchLocation", city],
        mutationFn: async (targetCity: string) => {
            return searchLocation({city: targetCity});
        }
    });

    const handleLocationChange = async (newValue: string | null): Promise<void> => {
        if(!newValue || newValue === city) {
            setIsChangingLocation(false);
            return;
        }
        setCity(newValue);
        setIsChangingLocation(true); // Instantly trigger global skeletons app-wide!
        try {
            // Manually trigger API
            const resultData = await mutation.mutateAsync(newValue);

            // Validate the data
            if (resultData && resultData.length > 0) {
                const primaryLocation = resultData[0];

                // Update our coordinates using setLocation
                setLocation({
                    lat: primaryLocation.lat,
                    lng: primaryLocation.lon,
                });
            }
        } catch (error) {
            console.error("The manual location search request failed:", error);
        }
    };


    const locations = [
        "Bangkok", "Tokyo", "Seoul", "Dubai", "Manila", "London",
        "New York", "Paris", "Berlin", "Madrid", "Rome", "Lisbon",
        "Delhi", "Ghaziabad"
    ]

    return (
        <Select value={city} onValueChange={handleLocationChange}>
            <SelectTrigger className="w-45 text-base font-semibold">
                <SelectValue placeholder="Select Location"/>
            </SelectTrigger>
            {/* FIX: Use correct Tailwind bracket syntax for custom z-index numbers */}
            <SelectContent className="z-50 max-h-60 overflow-y-auto w-(--radix-select-trigger-width)">
                <SelectGroup>
                    {locations.map((item) => (
                        <SelectItem key={item} value={item} className="text-base">
                            {item}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default LocationDropdown;
