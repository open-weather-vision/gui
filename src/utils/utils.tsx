import WeatherState0Day, {
    ReactComponent as WeatherState0DayComponent,
} from "../img/weather-state/0-day.svg";
import WeatherState1Day, {
    ReactComponent as WeatherState1DayComponent,
} from "../img/weather-state/1-day.svg";
import WeatherState2Day, {
    ReactComponent as WeatherState2DayComponent,
} from "../img/weather-state/2-day.svg";
import WeatherState3Day, {
    ReactComponent as WeatherState3DayComponent,
} from "../img/weather-state/3-day.svg";
import WeatherState45Day, {
    ReactComponent as WeatherState45DayComponent,
} from "../img/weather-state/45-day.svg";
import WeatherState48Day, {
    ReactComponent as WeatherState48DayComponent,
} from "../img/weather-state/48-day.svg";
import WeatherState51Day, {
    ReactComponent as WeatherState51DayComponent,
} from "../img/weather-state/51-day.svg";
import WeatherState53Day, {
    ReactComponent as WeatherState53DayComponent,
} from "../img/weather-state/53-day.svg";
import WeatherState55Day, {
    ReactComponent as WeatherState55DayComponent,
} from "../img/weather-state/55-day.svg";
import WeatherState56Day, {
    ReactComponent as WeatherState56DayComponent,
} from "../img/weather-state/56-day.svg";
import WeatherState57Day, {
    ReactComponent as WeatherState57DayComponent,
} from "../img/weather-state/57-day.svg";
import WeatherState61Day, {
    ReactComponent as WeatherState61DayComponent,
} from "../img/weather-state/61-day.svg";
import WeatherState63Day, {
    ReactComponent as WeatherState63DayComponent,
} from "../img/weather-state/63-day.svg";
import WeatherState65Day, {
    ReactComponent as WeatherState65DayComponent,
} from "../img/weather-state/65-day.svg";
import WeatherState66Day, {
    ReactComponent as WeatherState66DayComponent,
} from "../img/weather-state/66-day.svg";
import WeatherState67Day, {
    ReactComponent as WeatherState67DayComponent,
} from "../img/weather-state/67-day.svg";
import WeatherState67Night, {
    ReactComponent as WeatherState67NightComponent,
} from "../img/weather-state/67-night.svg";
import WeatherState71Day, {
    ReactComponent as WeatherState71DayComponent,
} from "../img/weather-state/71-day.svg";
import WeatherState73Day, {
    ReactComponent as WeatherState73DayComponent,
} from "../img/weather-state/73-day.svg";
import WeatherState75Day, {
    ReactComponent as WeatherState75DayComponent,
} from "../img/weather-state/75-day.svg";
import WeatherState77Day, {
    ReactComponent as WeatherState77DayComponent,
} from "../img/weather-state/77-day.svg";

import WeatherElementType from "../types/WeatherElementType";

import TemperatureIcon, {
    ReactComponent as TemperatureIconComponent,
} from "../img/icons/temperature.svg";
import WindChillIcon, {
    ReactComponent as WindChillIconComponent,
} from "../img/icons/wind-chill.svg";
import LeafTemperatureIcon, {
    ReactComponent as LeafTemperatureIconComponent,
} from "../img/icons/leaf-temperature.svg";
import SoilTemperatureIcon, {
    ReactComponent as SoilTemperatureIconComponent,
} from "../img/icons/soil-temperature.svg";
import SoilMoistureIcon, {
    ReactComponent as SoilMoistureIconComponent,
} from "../img/icons/soil-moisture.svg";
import SolarRadiationIcon, {
    ReactComponent as SolarRadiationIconComponent,
} from "../img/icons/solar-radiation.svg";
import WindSpeedIcon, {
    ReactComponent as WindSpeedIconComponent,
} from "../img/icons/wind-speed.svg";
import WindGustIcon, {
    ReactComponent as WindGustIconComponent,
} from "../img/icons/wind-gust.svg";
import WindDirectionIcon, {
    ReactComponent as WindDirectionIconComponent,
} from "../img/icons/wind-direction.svg";
import UVIcon, { ReactComponent as UVIconComponent } from "../img/icons/uv.svg";
import EvaporationIcon, {
    ReactComponent as EvaporationIconComponent,
} from "../img/icons/evaporation.svg";
import LeafWetnessIcon, {
    ReactComponent as LeafWetnessIconComponent,
} from "../img/icons/leaf-wetness.svg";
import PressureIcon, {
    ReactComponent as PressureIconComponent,
} from "../img/icons/pressure.svg";
import PrecipationRateIcon, {
    ReactComponent as PrecipationRateIconComponent,
} from "../img/icons/precipation-rate.svg";
import ShowerPrecipationIcon, {
    ReactComponent as ShowerPrecipationIconComponent,
} from "../img/icons/shower-precipation.svg";
import PrecipationIcon, {
    ReactComponent as PrecipationIconComponent,
} from "../img/icons/precipation.svg";
import PrecipationProbabilityIcon, {
    ReactComponent as PrecipationProbabilityIconComponent,
} from "../img/icons/precipation-probability.svg";
import HumidityIcon, {
    ReactComponent as HumidityIconComponent,
} from "../img/icons/humidity.svg";
import CloudinessIcon, {
    ReactComponent as CloudinessIconComponent,
} from "../img/icons/cloudiness.svg";
import SunshineIcon, {
    ReactComponent as SunshineIconComponent,
} from "../img/icons/sunshine.svg";
import VisibilityIcon, {
    ReactComponent as VisibilityIconComponent,
} from "../img/icons/visibility.svg";
import SnowHeightIcon, {
    ReactComponent as SnowHeightIconComponent,
} from "../img/icons/snow-height.svg";
import ConditionIcon, {
    ReactComponent as ConditionIconComponent,
} from "../img/icons/weather-state.svg";
import SoilPhIcon, {
    ReactComponent as SoilPhIconComponent,
} from "../img/icons/soil-ph.svg";
import { ReactComponent as DeComponent } from "../img/languages/de.svg";
import { ReactComponent as EnComponent } from "../img/languages/en.svg";
import NoIcon, { ReactComponent as NoIconComponent } from "../img/icons/no.svg";
import React from "react";
import { SupportedLanguage, SupportedLanguages } from "./useGlobalContext";

const weatherStateComponents = {
    null: NoIconComponent,
    "0-day": WeatherState0DayComponent,
    "1-day": WeatherState1DayComponent,
    "2-day": WeatherState2DayComponent,
    "3-day": WeatherState3DayComponent,
    "45-day": WeatherState45DayComponent,
    "48-day": WeatherState48DayComponent,
    "51-day": WeatherState51DayComponent,
    "53-day": WeatherState53DayComponent,
    "55-day": WeatherState55DayComponent,
    "56-day": WeatherState56DayComponent,
    "57-day": WeatherState57DayComponent,
    "61-day": WeatherState61DayComponent,
    "63-day": WeatherState63DayComponent,
    "65-day": WeatherState65DayComponent,
    "66-day": WeatherState66DayComponent,
    "67-day": WeatherState67DayComponent,
    "67-night": WeatherState67NightComponent,
    "71-day": WeatherState71DayComponent,
    "73-day": WeatherState73DayComponent,
    "75-day": WeatherState75DayComponent,
    "77-day": WeatherState77DayComponent,
};

const weatherStateUrls = {
    null: NoIcon,
    "0-day": WeatherState0Day,
    "1-day": WeatherState1Day,
    "2-day": WeatherState2Day,
    "3-day": WeatherState3Day,
    "45-day": WeatherState45Day,
    "48-day": WeatherState48Day,
    "51-day": WeatherState51Day,
    "53-day": WeatherState53Day,
    "55-day": WeatherState55Day,
    "56-day": WeatherState56Day,
    "57-day": WeatherState57Day,
    "61-day": WeatherState61Day,
    "63-day": WeatherState63Day,
    "65-day": WeatherState65Day,
    "66-day": WeatherState66Day,
    "67-day": WeatherState67Day,
    "67-night": WeatherState67Night,
    "71-day": WeatherState71Day,
    "73-day": WeatherState73Day,
    "75-day": WeatherState75Day,
    "77-day": WeatherState77Day,
};

const iconComponents = {
    temperature: TemperatureIconComponent,
    "perceived-temperature": TemperatureIconComponent,
    "wind-chill": WindChillIconComponent,
    "leaf-temperature": LeafTemperatureIconComponent,
    "soil-temperature": SoilTemperatureIconComponent,
    "soil-moisture": SoilMoistureIconComponent,
    "solar-radiation": SolarRadiationIconComponent,
    "wind-speed": WindSpeedIconComponent,
    "wind-gust": WindGustIconComponent,
    "wind-direction": WindDirectionIconComponent,
    uv: UVIconComponent,
    evaporation: EvaporationIconComponent,
    "leaf-wetness": LeafWetnessIconComponent,
    pressure: PressureIconComponent,
    "precipation-rate": PrecipationRateIconComponent,
    "shower-precipation": ShowerPrecipationIconComponent,
    precipation: PrecipationIconComponent,
    "precipation-probability": PrecipationProbabilityIconComponent,
    humidity: HumidityIconComponent,
    cloudiness: CloudinessIconComponent,
    sunshine: SunshineIconComponent,
    visibility: VisibilityIconComponent,
    "snow-height": SnowHeightIconComponent,
    "weather-state": ConditionIconComponent,
    "soil-ph": SoilPhIconComponent,
};

const iconUrls = {
    temperature: TemperatureIcon,
    "perceived-temperature": TemperatureIcon,
    "wind-chill": WindChillIcon,
    "leaf-temperature": LeafTemperatureIcon,
    "soil-temperature": SoilTemperatureIcon,
    "soil-moisture": SoilMoistureIcon,
    "solar-radiation": SolarRadiationIcon,
    "wind-speed": WindSpeedIcon,
    "wind-gust": WindGustIcon,
    "wind-direction": WindDirectionIcon,
    uv: UVIcon,
    evaporation: EvaporationIcon,
    "leaf-wetness": LeafWetnessIcon,
    pressure: PressureIcon,
    "precipation-rate": PrecipationRateIcon,
    "shower-precipation": ShowerPrecipationIcon,
    precipation: PrecipationIcon,
    "precipation-probability": PrecipationProbabilityIcon,
    humidity: HumidityIcon,
    cloudiness: CloudinessIcon,
    sunshine: SunshineIcon,
    visibility: VisibilityIcon,
    "snow-height": SnowHeightIcon,
    "weather-state": ConditionIcon,
    "soil-ph": SoilPhIcon,
};

const flagComponents = {
    de: DeComponent,
    en: EnComponent,
};

function getRgb(color: string) {
    let [r, g, b] = color
        .replace("rgb(", "")
        .replace(")", "")
        .split(",")
        .map((str) => Number(str));
    return {
        r,
        g,
        b,
    };
}

export type RGBColor = `rgb(${number}, ${number}, ${number})`;

export class Utils {
    colorInterpolate(
        colorA: RGBColor,
        colorB: RGBColor,
        factor: number
    ): RGBColor {
        const rgbA = getRgb(colorA),
            rgbB = getRgb(colorB);
        const colorVal = (prop: "r" | "g" | "b") =>
            Math.round(rgbA[prop] * (1 - factor) + rgbB[prop] * factor);
        return `rgb(${colorVal("r")}, ${colorVal("g")}, ${colorVal("b")})`;
    }

    valueToColor(
        value: number | null | undefined,
        theme: "dark" | "light",
        elementType?: WeatherElementType
    ): RGBColor {
        let nullColor: RGBColor = "rgb(145, 145, 145)";
        let fallbackColor: RGBColor;
        let predefinedColors: {
            value: number;
            color: RGBColor;
        }[] = [];
        if (theme === "dark") {
            fallbackColor = "rgb(150, 199, 255)";
            switch (elementType) {
                case "temperature":
                case "perceived-temperature":
                    predefinedColors = [
                        { value: -40, color: "rgb(239, 127, 255)" },
                        { value: -30, color: "rgb(155, 127, 255)" },
                        { value: -20, color: "rgb(127, 159, 255)" },
                        { value: -10, color: "rgb(127, 189, 255)" },
                        { value: 0, color: "rgb(127, 213, 255)" },
                        { value: 5, color: "rgb(127, 255, 189)" },
                        { value: 10, color: "rgb(131, 255, 127)" },
                        { value: 15, color: "rgb(185, 255, 127)" },
                        { value: 20, color: "rgb(255, 253, 127)" },
                        { value: 25, color: "rgb(255, 187, 127)" },
                        { value: 30, color: "rgb(255, 163, 127)" },
                        { value: 40, color: "rgb(255, 127, 127)" },
                        { value: 60, color: "rgb(255, 105, 175)" },
                    ];
                    break;
                case "pressure":
                    predefinedColors = [
                        { value: 950, color: "rgb(127, 150, 255)" },
                        { value: 995, color: "rgb(127, 213, 255)" },
                        { value: 1010, color: "rgb(234, 234, 234)" },
                        { value: 1030, color: "rgb(255, 145, 127)" },
                        { value: 1060, color: "rgb(255, 119, 148)" },
                    ];
                    break;
                case "precipation":
                case "precipation-probability":
                case "precipation-rate":
                    fallbackColor = "rgb(104, 187, 255)";
                    break;
                case "wind-chill":
                case "wind-direction":
                case "wind-gust":
                case "wind-speed":
                    fallbackColor = "rgb(218, 184, 223)";
                    break;
                case "solar-radiation":
                case "uv":
                case "sunshine":
                    fallbackColor = "rgb(255, 210, 141)";
                    break;
                case "leaf-temperature":
                case "soil-moisture":
                case "soil-temperature":
                case "leaf-wetness":
                case "soil-ph":
                    fallbackColor = "rgb(164, 255, 121)";
                    break;
                default:
            }
        } else {
            fallbackColor = "rgb(0, 102, 185)";
            switch (elementType) {
                case "temperature":
                case "perceived-temperature":
                    predefinedColors = [
                        { value: -40, color: "rgb(225, 0, 255)" },
                        { value: -30, color: "rgb(55, 0, 255)" },
                        { value: -20, color: "rgb(0, 64, 255)" },
                        { value: -10, color: "rgb(0, 123, 255)" },
                        { value: 0, color: "rgb(0, 148, 223)" },
                        { value: 5, color: "rgb(0, 168, 81)" },
                        { value: 10, color: "rgb(7, 204, 0)" },
                        { value: 15, color: "rgb(104, 201, 25)" },
                        { value: 20, color: "rgb(255, 187, 0)" },
                        { value: 25, color: "rgb(255, 119, 0)" },
                        { value: 30, color: "rgb(209, 59, 0)" },
                        { value: 40, color: "rgb(180, 0, 0)" },
                        { value: 60, color: "rgb(180, 0, 84)" },
                    ];
                    break;
                case "pressure":
                    predefinedColors = [
                        { value: 950, color: "rgb(0, 4, 219)" },
                        { value: 995, color: "rgb(0, 95, 219)" },
                        { value: 1010, color: "rgb(146, 146, 146)" },
                        { value: 1030, color: "rgb(212, 28, 0)" },
                        { value: 1060, color: "rgb(255, 73, 164)" },
                    ];
                    break;
                case "precipation":
                case "precipation-probability":
                case "precipation-rate":
                    fallbackColor = "rgb(0, 94, 156)";
                    break;
                case "wind-chill":
                case "wind-direction":
                case "wind-gust":
                case "wind-speed":
                    fallbackColor = "rgb(122, 0, 116)";
                    break;
                case "solar-radiation":
                case "uv":
                case "sunshine":
                    fallbackColor = "rgb(172, 103, 0)";
                    break;
                case "leaf-temperature":
                case "soil-moisture":
                case "soil-temperature":
                case "leaf-wetness":
                case "soil-ph":
                    fallbackColor = "rgb(0, 151, 66)";
                    break;
                default:
            }
        }

        if (value === null) return nullColor;
        if (value === undefined) return fallbackColor;
        for (let i = 0; i < predefinedColors.length - 1; i++) {
            const current = predefinedColors[i];
            const next = predefinedColors[i + 1];

            if (value >= current.value && value <= next.value) {
                const factor =
                    (value - current.value) / (next.value - current.value);
                return this.colorInterpolate(current.color, next.color, factor);
            }
        }
        return fallbackColor;
    }

    weatherStateIconUrl(weatherState: number | null, isDay: boolean): string {
        if (weatherState === null) return weatherStateUrls.null;
        else
            return weatherStateUrls[
                `${weatherState}-${
                    isDay ? "day" : "night"
                }` as keyof typeof weatherStateUrls
            ];
    }

    weatherStateIconComponent(
        weatherState: number | null,
        isDay: boolean
    ): React.ReactElement {
        if (weatherState === null)
            return React.createElement(weatherStateComponents.null);
        return React.createElement(
            weatherStateComponents[
                `${weatherState}-${
                    isDay ? "day" : "night"
                }` as keyof typeof weatherStateComponents
            ]
        );
    }

    iconUrl(element?: WeatherElementType): string {
        return iconUrls[element || "temperature"];
    }

    iconComponent(element?: WeatherElementType): React.ReactElement {
        return React.createElement(iconComponents[element || "temperature"]);
    }

    flagComponent(language: keyof typeof flagComponents): React.ReactElement {
        return React.createElement(flagComponents[language]);
    }

    getDefaultLanguage(): SupportedLanguage {
        const userLanguage = navigator.language;
        if (SupportedLanguages.includes(userLanguage as SupportedLanguage)) {
            return userLanguage as SupportedLanguage;
        } else {
            return "en";
        }
    }

    units(element?: WeatherElementType): string[] {
        switch (element) {
            case "temperature":
            case "perceived-temperature":
            case "wind-chill":
            case "leaf-temperature":
            case "soil-temperature":
                return ["°C", "°F", "K"];
            case "solar-radiation":
                return ["W/m²", "kW/m²"];
            case "wind-speed":
            case "wind-gust":
                return ["m/s", "km/h", "mph", "knots"];
            case "wind-direction":
                return ["°"];
            case "uv":
                return ["UVI"];
            case "evaporation":
                return ["mm", "in"];
            case "leaf-wetness":
                return ["LWI", "%"];
            case "pressure":
                return ["hPa", "kPa", "mmHg", "inHg"];
            case "precipation-rate":
                return ["mm/h", "in/h"];
            case "precipation":
                return ["mm", "in"];
            case "soil-moisture":
                return ["cb", "%"];
            case "precipation-probability":
            case "humidity":
            case "cloudiness":
                return ["%"];
            case "sunshine":
                return ["min", "hours"];
            case "visibility":
                return ["km", "miles"];
            case "snow-height":
                return ["cm", "in"];
            case "weather-state":
                return []; // Kein Wert, daher 'none'
            case "soil-ph":
                return ["pH"];
            default:
                return []; // Standardfall
        }
    }
}

export default new Utils();
