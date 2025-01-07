import { useRef, useState } from "react";
import { WeatherStationConnectionState } from "../../types/ConnectionState";
import useGlobalContext from "../../utils/useGlobalContext";
import utils from "../../utils/utils";
import styles from "./WeatherStationUserView.module.css";
import { ReactComponent as DownArrow } from "../../img/icons/down-arrow.svg"
import { useTranslation } from "react-multi-lang";

export type WeatherStationUserViewProps = {
    stationName?: string,
    currentWeatherState?: number,
    currentTemperatureOutside?: number,
    location?: string,
    connectionState: WeatherStationConnectionState,
    latestUpdate?: Date,
    isDay?: boolean,
    selected?: boolean
}

export default function WeatherStationUserView(props: WeatherStationUserViewProps) {
    const globals = useGlobalContext();
    const t = useTranslation("connection-state");

    return (
        <div className={`${styles.container} ${props.selected && styles.selected}`}>
            <div className={styles.leftSection}>
                <h1>{props.stationName}</h1>
                <div className={styles.bottomArea}>
                    <div className={styles.connectionState}>
                        <div className={`${styles.icon} ${styles[props.connectionState]}`} />
                        <h3>{t(props.connectionState)}</h3>
                    </div>
                </div>
            </div>
            <div className={styles.rightSection}>
                <h1>{props.currentTemperatureOutside}<span className={styles.unit}>{globals.units.temperature}</span></h1>
                <img src={utils.weatherStateIconUrl(props.currentWeatherState ?? null, props.isDay ?? false)} />
            </div>
        </div>
    );
}
