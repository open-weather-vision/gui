import styles from "./page.module.css";
import SensorView from "../../../components/sensorView/SensorView";
import SensorGrid from "../../../components/sensorGrid/SensorGrid";
import { useEffect, useState } from "react";

export default function Page() {
	const [windDir, setWindDir] = useState(90);
	const [temperature, setTemperature] = useState(25.2);

	useEffect(() => {
		const interval = setInterval(() => {
			setWindDir((prev) => (prev + (Math.random() - 0.5) * 100) % 360);
			setTemperature((prev) => prev + (Math.random() - 0.5) * 2);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	return (
		<SensorGrid>
			<SensorView
				label={"Current weather state"}
				value={75}
				elementType="weather-state"
				precision={0}
				forecast={[
					{
						time: "13:00",
						weatherState: 2,
						temperature: 15.3,
						precipation: 0.0,
					},
					{
						time: "14:00",
						weatherState: 1,
						temperature: 15.1,
						precipation: 0.0,
					},
					{
						time: "15:00",
						weatherState: 3,
						temperature: 14.8,
						precipation: 0.0,
					},
					{
						time: "16:00",
						weatherState: 61,
						temperature: 12.5,
						precipation: 0.4,
					},
					{
						time: "17:00",
						weatherState: 63,
						temperature: 10.3,
						precipation: 0.5,
					},
					{
						time: "18:00",
						weatherState: 65,
						temperature: 5.3,
						precipation: 5.3,
					},
					{
						time: "19:00",
						weatherState: 55,
						temperature: 2.1,
						precipation: 0.2,
					},
					{
						time: "20:00",
						weatherState: 71,
						temperature: 0.3,
						precipation: 0.7,
					},
					{
						time: "21:00",
						weatherState: 73,
						temperature: 0.1,
						precipation: 1.4,
					},
					{
						time: "22:00",
						weatherState: 75,
						temperature: -0.1,
						precipation: 2.5,
					},
					{
						time: "23:00",
						weatherState: 77,
						temperature: -0.7,
						precipation: 0.4,
					},
					{
						time: "00:00",
						weatherState: 66,
						temperature: -0.2,
						precipation: 0.3,
					},
					{
						time: "01:00",
						weatherState: 67,
						temperature: -0.2,
						precipation: 1.5,
					},
					{
						time: "02:00",
						weatherState: 45,
						temperature: 0.5,
						precipation: 0.0,
					},
					{
						time: "03:00",
						weatherState: 48,
						temperature: -0.2,
						precipation: 0.0,
					},
					{
						time: "04:00",
						weatherState: 0,
						temperature: 13.2,
						precipation: 0.0,
					},
					{
						time: "05:00",
						weatherState: 0,
						temperature: 13.1,
						precipation: 0.0,
					},
					{
						time: "06:00",
						weatherState: 0,
						temperature: 13.0,
						precipation: 0.0,
					},
					{
						time: "07:00",
						weatherState: 0,
						temperature: 12.9,
						precipation: 0.0,
					},
					{
						time: "08:00",
						weatherState: 0,
						temperature: 12.8,
						precipation: 0.0,
					},
					{
						time: "09:00",
						weatherState: 0,
						temperature: 12.7,
						precipation: 0.0,
					},
				]}
			/>
			<SensorView
				label={"Temperature"}
				description="The currently measured outside temperature."
				value={temperature - 15.48}
				elementType="temperature"
				precision={1}
				name={"tempOut"}
				location="outside"
			/>
			<SensorView
				label={"Temperature"}
				description="The currently measured inside temperature."
				value={temperature}
				elementType="temperature"
				precision={1}
				name={"tempIn"}
				location="inside"
			/>
			<SensorView
				label={"Pressure"}
				description="The currently measured pressure."
				value={1025.9}
				elementType="pressure"
				precision={1}
				name={"press"}
			/>
			<SensorView
				label={"Precipation 15min"}
				description="The measured precipation in the latest 15 minutes."
				value={15}
				elementType="precipation"
				precision={1}
				name={"precip15min"}
			/>

			<SensorView
				label={"Precipation rate"}
				value={1.3}
				elementType="precipation-rate"
				precision={1}
			/>
			<SensorView
				label={"Shower precipation"}
				value={8.4}
				elementType="shower-precipation"
				precision={1}
			/>
			<SensorView
				label={"Precipation probability"}
				value={55}
				elementType="precipation-probability"
				precision={0}
			/>

			<SensorView
				label={"Wind direction"}
				value={windDir}
				elementType="wind-direction"
				precision={0}
			/>
			<SensorView
				label={"Wind"}
				value={15}
				elementType="wind-speed"
				precision={0}
			/>
			<SensorView
				label={"Wind gust"}
				value={30}
				elementType="wind-gust"
				precision={0}
			/>

			<SensorView
				label={"Humidity"}
				value={50}
				elementType="humidity"
				precision={0}
			/>
			<SensorView
				label={"Cloudiness"}
				value={51}
				elementType="cloudiness"
				precision={0}
			/>
			<SensorView
				label={"Visibility"}
				value={5}
				elementType="visibility"
				precision={0}
			/>
			<SensorView
				label={"Snow height"}
				value={0}
				elementType="snow-height"
				precision={0}
			/>
			<SensorView
				label={"Perceived temperature"}
				value={21}
				elementType="perceived-temperature"
				precision={1}
			/>
			<SensorView
				label={"Wind chill"}
				value={21}
				elementType="wind-chill"
				precision={1}
			/>
			<SensorView
				label={"Evaporation"}
				value={5}
				elementType="evaporation"
				precision={1}
			/>

			<SensorView
				label={"Soil pH"}
				value={10}
				elementType="soil-ph"
				precision={0}
			/>
			<SensorView
				label={"Soil moisture"}
				value={123}
				elementType="soil-moisture"
				precision={0}
			/>
			<SensorView
				label={"Soil temperature"}
				value={20.3}
				elementType="soil-temperature"
				precision={1}
			/>
			<SensorView
				label={"Leaf wetness"}
				value={15}
				elementType="leaf-wetness"
				precision={1}
			/>

			<SensorView
				label={"Leaf temperature"}
				value={20}
				elementType="leaf-temperature"
				precision={1}
			/>
			<SensorView
				label={"Solar radiation"}
				value={1023}
				elementType="solar-radiation"
				precision={0}
			/>
			<SensorView
				label={"UV"}
				value={10}
				elementType="uv"
				precision={0}
			/>
			<SensorView
				label={"Sunshine"}
				value={10}
				elementType="sunshine"
				precision={0}
			/>
		</SensorGrid>
	);
}
