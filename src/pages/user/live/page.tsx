import styles from "./page.module.css";
import SensorView from "../../../components/sensorView/SensorView";
import SensorGrid from "../../../components/sensorGrid/SensorGrid";
import { useEffect, useState } from "react";

export default function Page() {
    const [windDir, setWindDir] = useState(0);

    return (
        <SensorGrid>
            <SensorView
                label={"Temperature"}
                value={23.9}
                elementType="temperature"
            />
            <SensorView
                label={"Pressure"}
                value={1025.9}
                elementType="pressure"
            />
            <SensorView
                label={"Precipation"}
                value={15}
                elementType="precipation"
            />

            <SensorView
                label={"Precipation rate"}
                value={1.3}
                elementType="precipation-rate"
            />
            <SensorView
                label={"Shower precipation"}
                value={8.4}
                elementType="shower-precipation"
            />
            <SensorView
                label={"Precipation probability"}
                value={55}
                elementType="precipation-probability"
            />
            <SensorView label={"Wind"} value={15} elementType="wind-speed" />
            <SensorView
                label={"Wind gust"}
                value={30}
                elementType="wind-gust"
            />
            <SensorView
                label={"Wind direction"}
                value={windDir}
                elementType="wind-direction"
            />
            <SensorView label={"Humidity"} value={50} elementType="humidity" />
            <SensorView
                label={"Cloudiness"}
                value={51}
                elementType="cloudiness"
            />
            <SensorView
                label={"Visibility"}
                value={5}
                elementType="visibility"
            />
            <SensorView
                label={"Snow height"}
                value={0}
                elementType="snow-height"
            />
            <SensorView
                label={"Condition"}
                value={10}
                elementType="condition"
            />
            <SensorView
                label={"Perceived temperature"}
                value={21}
                elementType="perceived-temperature"
            />
            <SensorView
                label={"Wind chill"}
                value={21}
                elementType="wind-chill"
            />
            <SensorView
                label={"Evaporation"}
                value={5}
                elementType="evaporation"
            />

            <SensorView label={"Soil pH"} value={10} elementType="soil-ph" />
            <SensorView
                label={"Soil moisture"}
                value={123}
                elementType="soil-moisture"
            />
            <SensorView
                label={"Soil temperature"}
                value={20.3}
                elementType="soil-temperature"
            />
            <SensorView
                label={"Leaf wetness"}
                value={15}
                elementType="leaf-wetness"
            />

            <SensorView
                label={"Leaf temperature"}
                value={20}
                elementType="leaf-temperature"
            />
            <SensorView
                label={"Solar radiation"}
                value={1023}
                elementType="solar-radiation"
            />
            <SensorView label={"UV"} value={10} elementType="uv" />
            <SensorView label={"Sunshine"} value={10} elementType="sunshine" />
        </SensorGrid>
    );
}
