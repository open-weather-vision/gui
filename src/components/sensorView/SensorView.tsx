import styles from "./SensorView.module.css";
import WeatherElementType from "../../types/WeatherElementType";

import utils from "../../utils/utils";
import { ReactComponent as WindDirectionCompassSvg } from "../../img/wind-direction-compass.svg";
import { ReactComponent as WindDirectionArrow } from "../../img/wind-direction-arrow.svg";
import { ReactComponent as ArrowLeft } from "../../img/arrow-left.svg";
import AnimatedTextChange from "../animatedTextChange/AnimatedTextChange";
import { useState, useRef } from "react";
import useSmoothNavigation from "../../utils/useSmoothNavigation";
// @ts-ignore
import useScrollOnDrag from "react-scroll-ondrag";
import useResponsiveBackgroundImage from "../../utils/useResponsiveBackgroundImage";

type ForecastItem = {
    time: string;
    weatherState: number;
    temperature: number;
    precipation: number;
};

type SensorViewProps = {
    name?: string;
    value: number;
    elementType?: WeatherElementType;
    label?: string;
    description?: string;
    precision: number;
    location?: "inside" | "outside";
    forecast?: ForecastItem[];
};

function WindDirectionCompass({ direction }: { direction: number }) {
    return (
        <div className={styles.windDirectionContainer}>
            <WindDirectionCompassSvg className={styles.compass} />
            <WindDirectionArrow
                style={{ transform: `rotate(${direction}deg)` }}
                className={styles.arrow}
            />
        </div>
    );
}

function WeatherState({
    weatherState,
    forecast,
}: {
    weatherState: number;
    forecast?: ForecastItem[];
}) {
    const ref = useRef();
    const { events } = useScrollOnDrag(ref);
    const [showForecast, setShowForecast] = useState(false);
    const [scroll, setScroll] = useState(false);

    return (
        <div className={styles.sensorData}>
            <div
                className={`${styles.now} ${showForecast && styles.hidden}`}
                onClick={() => {
                    setShowForecast(true);
                    setTimeout(() => setScroll(true), 300);
                }}
            >
                <div
                    style={{
                        backgroundImage: `url(${utils.weatherStateIcon(
                            weatherState,
                            true
                        )})`,
                    }}
                    className={styles.weatherIcon}
                />
            </div>
            <div
                className={`${styles.scrollableForecast} ${
                    showForecast && styles.open
                }`}
                ref={ref}
                {...events}
                style={{ overflowX: scroll ? "scroll" : "hidden" }}
            >
                <div
                    className={styles.forecastArrow}
                    onClick={() => {
                        setScroll(false);
                        setShowForecast(false);
                    }}
                >
                    <ArrowLeft className={styles.forecastArrowIcon} />
                </div>
                {forecast &&
                    forecast.map((item, index) => (
                        <div className={styles.forecastItem} key={index}>
                            <div className={styles.time}>{item.time}</div>
                            <div
                                style={{
                                    backgroundImage: `url(${utils.weatherStateIcon(
                                        item.weatherState,
                                        true
                                    )})`,
                                }}
                                className={styles.weatherIcon}
                            />
                            <div
                                className={styles.temperature}
                                style={{
                                    color: utils.valueToColor(
                                        item.temperature,
                                        "temperature"
                                    ),
                                }}
                            >
                                {item.temperature.toFixed(0)}
                                <span className={styles.unit}>
                                    {utils.unit("temperature")}
                                </span>
                            </div>
                            <div className={styles.precipation}>
                                {item.precipation.toFixed(1)}
                                <span className={styles.unit}>
                                    {utils.unit("precipation")}
                                </span>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default function SensorView({
    name,
    value,
    elementType,
    label,
    description,
    precision,
    location,
    forecast,
}: SensorViewProps) {
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useSmoothNavigation();
    const backgroundImage = useResponsiveBackgroundImage("rain");

    function goToGraph() {
        navigate(`/user/graphs?element=${name}`);
    }

    function goToExtremes() {
        navigate(`/user/extremes?element=${name}`);
    }

    function content() {
        switch (elementType) {
            case "wind-direction":
                return <WindDirectionCompass direction={value} />;
            case "weather-state":
                return (
                    <WeatherState weatherState={value} forecast={forecast} />
                );
            default:
                return (
                    <div className={styles.sensorData}>
                        <div
                            className={styles.value}
                            style={{
                                color: utils.valueToColor(value, elementType),
                            }}
                        >
                            <AnimatedTextChange
                                text={value.toFixed(precision)}
                                sensorData
                            />
                        </div>
                        <div className={styles.unit}>
                            {utils.unit(elementType)}
                        </div>
                    </div>
                );
        }
    }

    return (
        <div
            className={`${styles.sensorView} ${
                elementType && styles[elementType]
            }`}
            onClick={() => setShowDetails(!showDetails)}
        >
            {elementType === "weather-state" && (
                <div className={styles.backgroundImage} {...backgroundImage} />
            )}
            {description && (
                <div
                    className={`${styles.details} ${
                        !showDetails && styles.hidden
                    }`}
                >
                    {description}
                    {name && (
                        <div className={styles.buttonArea}>
                            <button onClick={goToGraph}>View graph</button>
                            <button onClick={goToExtremes}>
                                View extremes
                            </button>
                        </div>
                    )}
                </div>
            )}
            {content()}

            <div className={styles.label}>
                {utils.icon(elementType)}
                {label}
                {location && <div className={styles.location}>{location}</div>}
            </div>
        </div>
    );
}
