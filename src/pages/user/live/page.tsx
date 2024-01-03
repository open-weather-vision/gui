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
                label={"Current conditions"}
                value={10}
                elementType="condition"
                precision={0}
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
