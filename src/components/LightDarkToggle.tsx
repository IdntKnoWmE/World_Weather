import {Switch} from "@/components/ui/switch.tsx";
import Sun from '/src/assets/sun.svg?react';
import Moon from '/src/assets/moon.svg?react';
import {useTheme} from "@/components/contexts/ThemeContext.tsx";
import {useEffect} from "react";


function LightDarkToggle() {

    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const root = document.getElementById("root") as HTMLDivElement;
        if (theme === "dark"){
            root.classList.add("dark");
        }
        else {
            root.classList.remove("dark");
        }
    }, [theme]);

    return (
        <>
            <Sun className="size-6"/>
            <Switch checked={theme === "dark"} onCheckedChange={toggleTheme}/>
            <Moon className="size-6"/>
        </>
    );
}

export default LightDarkToggle;