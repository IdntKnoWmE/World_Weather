import {MapContainer, Marker, TileLayer, useMap, useMapEvents} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import {useLocation} from "./contexts/LocationContext.tsx";
import {useEffect} from "react";
import {MaptilerLayer} from "@maptiler/leaflet-maptilersdk";
import {useMapType} from "@/components/contexts/MapTypeContext.tsx";
import {useTheme} from "@/components/contexts/ThemeContext.tsx";

const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY
const MAPTILER_CLOUD_KEY = import.meta.env.VITE_MAPTILER_CLOUD_KEY


function Map() {

    const {coordinates} = useLocation();

    return (
        <MapContainer center={[coordinates.lat, coordinates.lng]}
                      zoom={13}
                      className="w-full, h-125 mt-2 z-0">
            <MapTileLayer/>
            <MapTypeTileLayer/>
            <MapController/>
            <Marker position={[coordinates.lat, coordinates.lng]}/>

        </MapContainer>
    );
}


// Component to synchronize state changes WITH the Leaflet engine instances
function MapController() {
    const map = useMap();
    const {coordinates, setLocation, setIsChangingLocation, setCity} = useLocation();

    // Track primitives explicitly to prevent the object reference loop
    const lat = coordinates.lat;
    const lng = coordinates.lng;

    // React to coordinate adjustments automatically if they got anywhere on the App
    useEffect(() => {
        if (lat && lng) {

            // Get current center to verify if we actually need to fly
            const center = map.getCenter();

            // .flyTo gives a smooth animated glide or use .panTo if you prefer an instant slide
            // Only trigger it if the map isn't already centered close to the new coordinates as due to some
            // movements map coords can slightly change and this can trigger out API call.

            if(Math.abs(center.lat - lat) > 0.001 || Math.abs(center.lng - lng) > 0.001 ) {
                map.flyTo([lat, lng], map.getZoom(), {
                    animate: true,
                    duration: 1.5 // 1.5 seconds smooth transition glide
                });
            }
        }
    }, [lat, lng, map]);

    // Use useMapEvents for standard click bindings instead of map.on manually
    useMapEvents({
        click(e) {

            // Instantly trigger global skeletons app-wide by telling the app we are switching locations instantly
            setIsChangingLocation(true); // Instantly trigger global skeletons app-wide!

            setCity("Custom"); // Assigning city dropdown to custom as we are selecting custom loc on map

            // Yield thread control back to the browser layout engine.
            // requestAnimationFrame forces React to safely paint the Skeleton UI
            // to our monitor pixels on the very next screen refresh cycle.
            // This below line creates a window for our React app to load the skeleton screen as loading
            // map is a complex task due to which other react functions are kept on hold in Micro-Task Background Queue.

            requestAnimationFrame(() => {
                setTimeout(() => {
                    setLocation({
                        lat: e.latlng.lat,
                        lng: e.latlng.lng
                    });
                }, 0); // Drops the context update to the back of the queue
            });
        }
    });
    return null;
}


function MapTileLayer() {
    const map = useMap();
    const {theme} = useTheme();

    useEffect(() => {
        const tileLayer = new MaptilerLayer({style: theme === "dark" ?'basic-dark': "base", apiKey: MAPTILER_CLOUD_KEY})
        tileLayer.addTo(map)
        return () => {map.removeLayer(tileLayer)}
    }, [map, theme])

    return null
}

function MapTypeTileLayer(){
    const {mapType} = useMapType();
    if (mapType === 'simple') return null;
    return (
        <TileLayer
            opacity={0.8}
            url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${OPEN_WEATHER_API_KEY}`}
        />
    );
}



export default Map;