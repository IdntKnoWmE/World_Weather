import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {LocationProvider} from "./components/contexts/LocationContext.tsx";
import {MapTypeProvider} from "@/components/contexts/MapTypeContext.tsx";
import ThemeProvider from "@/components/contexts/ThemeContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}> {/* Always keep on Top Level so, everything can read app Query State */}
        <ThemeProvider>
            <LocationProvider>
                <MapTypeProvider>
                    <App/>
                </MapTypeProvider>
            </LocationProvider>
        </ThemeProvider>
    </QueryClientProvider>
)