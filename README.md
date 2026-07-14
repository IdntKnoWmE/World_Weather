# React + TypeScript + Vite

# 🌦️ Advanced Weather & Pollution Analytics Dashboard

A modern, high-performance weather forecasting and air quality tracking dashboard built using **React 19**, **TypeScript**, and **Vite**. The application integrates comprehensive multi-source API tracking with interactive, multi-layered geospatial mapping, strict schema validations, and advanced data visualization.

---

## 🎬 Video Demo

Check out the dashboard layouts, dynamic layer switching, and visual analytics in action:

https://github.com

> **Tip**: If you have a GIF version, you can display it using: `![Application Demo](./src/assets/demo.gif)`

---

## 🚀 Key Features

* **Dual-API Synchronization**: Concurrently aggregates atmospheric data across separate pipelines (**WeatherAPI** & **OpenWeatherMap**) to map an 8-day forecast, a 24-hour current timeline, and absolute pollutant components.
* **Geospatial Map Overlays**: Implements **React Leaflet** utilizing a dark/light-adaptive **MapTiler** base. Incorporates overlapping live weather tiles from OpenWeatherMap for `Wind`, `Rain`, `Temperature`, `Clouds`, and `Pressure`.
* **Visual Pollution Analytics**: Renders an adjustable, highly responsive **Chart.js** doughnut chart with color-coded index thresholds mapping individual pollutant intensities on real-time hover states.
* **Type-Safe Schema Validation**: Uses **Zod** to compile strict runtime validation contracts (`currentWeatherApiSchema`, `weatherForecastApiSchema`, etc.) preventing layout cracks due to unannounced API payload shifts.
* **Optimized Orchestration Hook**: Powered by a unified custom `useWeatherQuery` engine that manages network states, structural payload mappings, and modular loading indicators.
* **Asynchronous Skeleton Loading**: Implements fine-grained UI skeleton loaders built from **Shadcn UI** primitives for every modular widget panel while data streams complete.
* **Global Theme & State Providers**: Synchronizes custom React context wrappers (`ThemeContext`, `LocationContext`, `MapTypeContext`) ensuring theme state updates propagate instantly to both DOM components and active map tiles.

---

## 🛠️ Tech Stack & Dependencies

* **Core Framework**: React 19, TypeScript, Vite
* **Styling & UI**: Tailwind CSS, Shadcn UI (Radix Primitives)
* **Maps & GIS**: Leaflet, React Leaflet, MapTiler Base Map, OpenWeatherMap Tile Server
* **Charts & Graphics**: Chart.js, react-chartjs-2, Native SVG Icons
* **Data Validation**: Zod

---

## 📁 Project Structure

The codebase is organized into highly modular, decoupled functional layers:

```text
src/
├── API/                    # API query clients (OpenWeather & WeatherAPI)
├── assets/                 # SVGs for conditions, indexes, and weather maps data
├── components/            
│   ├── cards/              # Dedicated dashboard information widgets
│   ├── charts/             # AQI Chart.js configurations (Doughnut charts)
│   ├── contexts/           # State isolation wrappers (Theme, Location, MapType)
│   ├── dropdowns/          # Functional selector nodes for geographical tracking
│   ├── skeletons/          # Independent layout skeleton components
│   └── ui/                 # Atomic Shadcn base elements
├── hooks/                  # Orchestrated data fetching (`useWeatherQuery.ts`)
├── lib/                    # Configuration utilities (Tailwind merges, classes)
├── schemas/                # Zod structural validation schemas
├── utils/                  # Coordinate lookups and AQI indicator mappings
├── types.ts                # Shared global TypeScript definitions
├── App.tsx                 # Core grid wrapper and layout assembly
└── main.tsx                # App rendering mount node
```

---

## 🔌 API Integrations Architecture

The application pulls data concurrently from two platforms, joining structural records over singular latitude and longitude parameters:

1. **WeatherAPI**: Used for fast-resolving location-search completion lookup schemas, current data baselines, and baseline pollution indexes.
2. **OpenWeatherMap**: Standardized for deep 8-day arrays, chronological 24-hour forecast timelines, and structural raster layer canvas tiles.

---

## ⚙️ Local Development Setup

Follow these commands to deploy a mirroring instance of the workspace locally.

### 1. Clone the Codebase
```bash
git clone https://github.com
cd your-repo-name
```

### 2. Set Up Packages
```bash
npm install
# or yarn install / pnpm install
```

### 3. Inject Environment Keys
Create a `.env.local` configuration document at the root level of your directory structure:
```env
VITE_WEATHER_API_KEY=your_weatherapi_key_here
VITE_OPENWEATHER_API_KEY=your_openweathermap_key_here
VITE_MAPTILER_API_KEY=your_maptiler_key_here
```

### 4. Initialize Local Host Server
```bash
npm run dev
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
