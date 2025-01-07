import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import WeatherElementType from "../types/WeatherElementType";

export type UnitConfiguration = { [Property in WeatherElementType]: string };

export const defaultUnitConfiguration: UnitConfiguration = {
    "temperature": "°C",
    "perceived-temperature": "°C",
    "wind-chill": "°C",
    "leaf-temperature": "°C",
    "soil-temperature": "°C",
    "soil-moisture": "%",
    "solar-radiation": "W/m²",
    "wind-speed": "m/s",
    "wind-gust": "m/s",
    "wind-direction": "°",
    "uv": "UVI",
    "evaporation": "mm",
    "leaf-wetness": "%",
    "pressure": "hPa",
    "precipation-rate": "mm/h",
    "precipation": "mm",
    "precipation-probability": "%",
    "humidity": "%",
    "cloudiness": "%",
    "sunshine": "min",
    "visibility": "km",
    "snow-height": "cm",
    "weather-state": "",
    "soil-ph": "pH"
};

export type GlobalContext = {
    blackOverlay: boolean,
    isAdmin: boolean,
    apiSessionToken?: string,
    selectedWeatherStation?: {
        slug: string,
        name: string,
        elevation: number,
    },
    username?: string,
    applicationName: string,
    applicationState: "not-configured" | "configured",
    theme: "dark"|"light",
    setTheme: (theme: "dark"|"light") => void,
    login: (username: string, password: string, delay?: number) => Promise<boolean>,
    logout: (delay?: number) => void,
    navigateOverBlackOverlay: (path: string) => void,
    units: UnitConfiguration
    setUnitType: (type: WeatherElementType, unit: string) => void
}

const globalContext = createContext<GlobalContext | undefined>(undefined);

export function GlobalContextProvider(props: {children: React.ReactNode}) {
    const [cookies, setCookie, removeCookie] = useCookies(["api-session-token", "username", "theme"]);

    //const [isAdmin, setIsAdmin] = useState(cookies["api-session-token"] && cookies.username);
    //const [apiSessionToken, setApiSessionToken] = useState<string | undefined>(cookies["api-session-token"]);
    const [selectedWeatherStation, setSelectedWeatherStation] = useState<{slug: string, name: string, elevation: number} | undefined>({
        slug: "harrys-weather-station",
        name: "Hüffelsheim",
        elevation: 230,
    });
    
    const [applicationState, setApplicationState] = useState<"not-configured" | "configured">("not-configured");
    const [applicationName, setApplicationName] = useState("harrystation");
    //const [username, setUsername] = useState<string | undefined>(cookies.username);
    const [blackOverlay, setBlackOverlay] = useState(false);
    //const [theme, setTheme] = useState<"dark"|"light">(cookies.theme ?? "dark");
    const [units, setUnits] = useState<UnitConfiguration>(defaultUnitConfiguration);
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", cookies.theme);
        //setCookie("theme", theme);
      }, [cookies.theme]);

      useEffect(() => {
        if(cookies.theme === undefined){
            const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            setCookie("theme", prefersDarkMode ? "dark" : "light");
        }
      }, [cookies]);
    
    return <globalContext.Provider value={
            {
                units,
                setUnitType: (type, unit) => {
                    setUnits({
                        ...units,
                        [type]: unit
                    });
                },
                isAdmin: cookies["api-session-token"] !== "undefined" && cookies["api-session-token"],
                apiSessionToken: cookies["api-session-token"],
                selectedWeatherStation,
                applicationState,
                applicationName,
                username: cookies.username,
                blackOverlay,
                theme: cookies.theme,
                setTheme: (theme) => setCookie("theme", theme),
                navigateOverBlackOverlay: async (path: string) => {
                    setBlackOverlay(true);
                    await new Promise((resolve) => {
                        setTimeout(resolve, 250);
                    });
                    navigate(path);
                    await new Promise((resolve) => {
                        setTimeout(resolve, 150);
                    });
                    setBlackOverlay(false);
                },
                login: async (username: string, password: string, delay: number = 0) => {
                    const success = username == "admin" && password == "admin";
                    setTimeout(() => {
                        if(success){
                            //setIsAdmin(true);

                            //setApiSessionToken("dummy-token");
                            setCookie("api-session-token", "dummy-token");

                            //setUsername(username);
                            setCookie("username", username);
                        }
                    }, delay);
                    return success;
                },
                logout: async(delay: number = 0) => {
                    setTimeout(() => {
                        //setIsAdmin(false);
                        //setApiSessionToken(undefined);
                        setCookie("api-session-token", undefined)
                        //setUsername(undefined);
                        setCookie("username", undefined)
                    }, delay);
                } 
            }
        }>
        {props.children}
    </globalContext.Provider>
}

export default function useGlobalContext() {
    const context = useContext(globalContext);

    return context as GlobalContext;
}
