import {createContext, type ReactNode, useContext, useState} from "react";

type Theme = 'light' | 'dark';

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
}

type ThemeProviderType = {
    children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined> (undefined);



export default function ThemeProvider({children}: ThemeProviderType) {

    const [theme, setTheme] = useState<Theme>("dark");

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
        </ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("Must use useLocation inside MapTypeContext");
    return context;
}
