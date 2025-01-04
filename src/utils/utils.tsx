import { ReactComponent as TemperatureIcon } from "../img/temperature.svg";
import { ReactComponent as WindChillIcon } from "../img/wind-chill.svg";
import { ReactComponent as LeafTemperatureIcon } from "../img/leaf-temperature.svg";
import { ReactComponent as SoilTemperatureIcon } from "../img/soil-temperature.svg";
import { ReactComponent as SoilMoistureIcon } from "../img/soil-moisture.svg";
import { ReactComponent as SolarRadiationIcon } from "../img/solar-radiation.svg";
import { ReactComponent as WindSpeedIcon } from "../img/wind-speed.svg";
import { ReactComponent as WindGustIcon } from "../img/wind-gust.svg";
import { ReactComponent as WindDirectionIcon } from "../img/wind-direction.svg";
import { ReactComponent as UVIcon } from "../img/uv.svg";
import { ReactComponent as EvaporationIcon } from "../img/evaporation.svg";
import { ReactComponent as LeafWetnessIcon } from "../img/leaf-wetness.svg";
import { ReactComponent as PressureIcon } from "../img/pressure.svg";
import { ReactComponent as PrecipationRateIcon } from "../img/precipation-rate.svg";
import { ReactComponent as ShowerPrecipationIcon } from "../img/shower-precipation.svg";
import { ReactComponent as PrecipationIcon } from "../img/precipation.svg";
import { ReactComponent as PrecipationProbabilityIcon } from "../img/precipation-probability.svg";
import { ReactComponent as HumidityIcon } from "../img/humidity.svg";
import { ReactComponent as CloudinessIcon } from "../img/cloudiness.svg";
import { ReactComponent as SunshineIcon } from "../img/sunshine.svg";
import { ReactComponent as VisibilityIcon } from "../img/visibility.svg";
import { ReactComponent as SnowHeightIcon } from "../img/snow-height.svg";
import { ReactComponent as ConditionIcon } from "../img/weather-state.svg";
import { ReactComponent as SoilPhIcon } from "../img/soil-ph.svg";

import { ReactComponent as WeatherState0Day } from "../img/weather-state/0-day.svg";
import { ReactComponent as WeatherState1Day } from "../img/weather-state/1-day.svg";
import { ReactComponent as WeatherState2Day } from "../img/weather-state/2-day.svg";
import { ReactComponent as WeatherState3Day } from "../img/weather-state/3-day.svg";
import { ReactComponent as WeatherState45Day } from "../img/weather-state/45-day.svg";
import { ReactComponent as WeatherState48Day } from "../img/weather-state/48-day.svg";
import { ReactComponent as WeatherState51Day } from "../img/weather-state/51-day.svg";
import { ReactComponent as WeatherState53Day } from "../img/weather-state/53-day.svg";
import { ReactComponent as WeatherState55Day } from "../img/weather-state/55-day.svg";
import { ReactComponent as WeatherState56Day } from "../img/weather-state/56-day.svg";
import { ReactComponent as WeatherState57Day } from "../img/weather-state/57-day.svg";
import { ReactComponent as WeatherState61Day } from "../img/weather-state/61-day.svg";
import { ReactComponent as WeatherState63Day } from "../img/weather-state/63-day.svg";
import { ReactComponent as WeatherState65Day } from "../img/weather-state/65-day.svg";
import { ReactComponent as WeatherState66Day } from "../img/weather-state/66-day.svg";
import { ReactComponent as WeatherState67Day } from "../img/weather-state/67-day.svg";
import { ReactComponent as WeatherState67Night } from "../img/weather-state/67-night.svg";
import { ReactComponent as WeatherState71Day } from "../img/weather-state/71-day.svg";
import { ReactComponent as WeatherState73Day } from "../img/weather-state/73-day.svg";
import { ReactComponent as WeatherState75Day } from "../img/weather-state/75-day.svg";
import { ReactComponent as WeatherState77Day } from "../img/weather-state/77-day.svg";

const weatherStates: {[T in string] : React.FunctionComponent<React.SVGProps<SVGSVGElement>> } = {
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

import WeatherElementType from "../types/WeatherElementType";
import React from "react";

export class Utils {
	valueToColor(value: number, elementType?: WeatherElementType) {
		if (
			elementType === "temperature" ||
			elementType === "perceived-temperature"
		) {
			if (value < -40) return "rgb(239, 127, 255)";
			if (value < -30) return "rgb(155, 127, 255)";
			if (value < -20) return "rgb(127, 159, 255)";
			if (value < -10) return "rgb(127, 189, 255)";
			if (value < 0) return "rgb(127, 213, 255)";
			if (value < 5) return "rgb(127, 255, 189)";
			if (value < 10) return "rgb(131, 255, 127)";
			if (value < 15) return "rgb(185, 255, 127)";
			if (value < 20) return "rgb(255, 253, 127)";
			if (value < 25) return "rgb(255, 187, 127)";
			if (value < 30) return "rgb(255, 163, 127)";
			if (value < 40) return "rgb(255, 127, 127)";
			return "rgb(255, 127, 145)";
		}
		if (elementType === "pressure") {
			if (value < 995) return "rgb(127, 213, 255)";
			if (value < 1010) return "rgb(234, 234, 234)";
			return "rgb(255, 145, 127)";
		}
		return undefined;
	}
	weatherStateIcon(weatherState: number, isDay: boolean): React.ReactElement {
		return React.createElement(weatherStates[`${weatherState}-${isDay ? "day" : "night"}`]);
	}

	icon(element?: WeatherElementType): React.ReactElement {
		switch (element) {
			case "temperature":
			case "perceived-temperature":
				return <TemperatureIcon />;
			case "wind-chill":
				return <WindChillIcon />;
			case "leaf-temperature":
				return <LeafTemperatureIcon />;
			case "soil-temperature":
				return <SoilTemperatureIcon />;
			case "soil-moisture":
				return <SoilMoistureIcon />;
			case "solar-radiation":
				return <SolarRadiationIcon />;
			case "wind-speed":
				return <WindSpeedIcon />;
			case "wind-gust":
				return <WindGustIcon />;
			case "wind-direction":
				return <WindDirectionIcon />;
			case "uv":
				return <UVIcon />;
			case "evaporation":
				return <EvaporationIcon />;
			case "leaf-wetness":
				return <LeafWetnessIcon />;
			case "pressure":
				return <PressureIcon />;
			case "precipation-rate":
				return <PrecipationRateIcon />;
			case "shower-precipation":
				return <ShowerPrecipationIcon />;
			case "precipation":
				return <PrecipationIcon />;
			case "precipation-probability":
				return <PrecipationProbabilityIcon />;
			case "humidity":
				return <HumidityIcon />;
			case "cloudiness":
				return <CloudinessIcon />;
			case "sunshine":
				return <SunshineIcon />;
			case "visibility":
				return <VisibilityIcon />;
			case "snow-height":
				return <SnowHeightIcon />;
			case "weather-state":
				return <ConditionIcon />;
			case "soil-ph":
				return <SoilPhIcon />;
			default:
				return <></>;
		}
	}
	unit(element?: WeatherElementType): string {
		switch (element) {
			case "temperature":
			case "perceived-temperature":
			case "wind-chill":
			case "leaf-temperature":
			case "soil-temperature":
				return "°C";
			case "solar-radiation":
				return "W/m²";
			case "wind-speed":
			case "wind-gust":
				return "m/s";
			case "wind-direction":
				return "°";
			case "uv":
				return "UVI";
			case "evaporation":
				return "mm";
			case "leaf-wetness":
				return "LWI";
			case "pressure":
				return "hPa";
			case "precipation-rate":
				return "mm/h";
			case "shower-precipation":
			case "precipation":
				return "mm";
			case "soil-moisture":
				return "cb";
			case "precipation-probability":
			case "humidity":
			case "cloudiness":
				return "%";
			case "sunshine":
				return "min/h";
			case "visibility":
				return "km";
			case "snow-height":
				return "cm";
			case "weather-state":
				return "";
			case "soil-ph":
				return "pH";
			default:
				return "";
		}
	}
}

export default new Utils();
