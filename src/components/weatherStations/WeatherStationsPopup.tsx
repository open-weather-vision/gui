import useGlobalContext from "../../utils/useGlobalContext";
import Button from "../button/Button";
import Section from "../section/Section";
import WeatherStationUserView from "../weatherStationUserView/WeatherStationUserView";
import styles from "./WeatherStationsPopup.module.css";
import {ReactComponent as EditIcon} from "../../img/icons/tool.svg";
import { ReactComponent as WeatherStationIcon} from "../../img/icons/weather-station.svg";
import { ReactComponent as CloseIcon} from "../../img/icons/close.svg";
import useSmoothNavigation from "../../utils/useSmoothNavigation";
import { useTranslation } from "react-multi-lang";

export type WeatherStationsPopupProps = {
    visible?: boolean
}

export default function WeatherStationsPopup(props: WeatherStationsPopupProps) {
    const globals = useGlobalContext();
    const { setShowSwitchStationPopup } = useSmoothNavigation();
    const t = useTranslation("switch-station");

    return (
        <div className={`${styles.popup} ${props.visible && styles.visible}`}>
            <div className={styles.header}>
                <WeatherStationIcon className={styles.stationIcon} />
                <h1>{t("title")}</h1>
                <CloseIcon className={styles.closeIcon} onClick={() => setShowSwitchStationPopup(false)} />
            </div>
            <div className={styles.content}>
                <WeatherStationUserView 
                    connectionState="connected"
                    stationName="Aachener Station" 
                    location="Aachen" 
                    currentTemperatureOutside={4.2}
                    currentWeatherState={53}
                    isDay
                    selected
                />
                <WeatherStationUserView 
                    connectionState="connecting"
                    stationName="Hüffelsheimer Vantage Pro 2" 
                    location="Hüffelsheim" 
                    currentTemperatureOutside={-1.1}
                    currentWeatherState={57}
                    isDay
                />
                {globals.isAdmin && <Button className={styles.addStationButton} iconSize="large" icon={<EditIcon />} color="color-3" text={t("edit-stations")} />}
            </div>
        </div>
    );
}
