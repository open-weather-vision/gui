import styles from "./SensorView.module.css";
import WeatherElementType from "../../types/WeatherElementType";

import utils from "../../utils/utils";
import { ReactComponent as WindDirectionCompassSvg } from "../../img/icons/wind-direction-compass.svg";
import { ReactComponent as WindDirectionArrow } from "../../img/icons/wind-direction-arrow.svg";
import { ReactComponent as ArrowLeft } from "../../img/icons/arrow-left.svg";
import AnimatedTextChange from "../animatedTextChange/AnimatedTextChange";
import { useState, useRef } from "react";
import useSmoothNavigation from "../../utils/useSmoothNavigation";
// @ts-ignore
import useScrollOnDrag from "react-scroll-ondrag";
import useResponsiveBackgroundImage from "../../utils/useResponsiveBackgroundImage";
import { useTranslation } from "react-multi-lang";
import Button from "../button/Button";

import { ReactComponent as ExtremesIcon } from "../../img/icons/extremes.svg";
import { ReactComponent as GraphsIcon } from "../../img/icons/graphs.svg";
import { ReactComponent as NoIcon } from "../../img/icons/no.svg";
import useGlobalContext from "../../utils/useGlobalContext";

type ForecastItem = {
    time: string;
    weatherState: number;
    temperature: number;
    precipation: number;
};

type SensorViewProps =
    | {
          /** The sensor's id */
          sensorId?: string;
          /** The sensor's value */
          value: number | null;
          /** The type of weather element. Configures the coloring and the used icon */
          elementType?: WeatherElementType;
          /** Number of digits after the decimal point */
          precision: number;
          /** Adds a "INSIDE" or "OUTSIDE" tag  */
          location?: "inside" | "outside";

          hasGraph?: boolean;
          hasExtremes?: boolean;
          order: number;
      }
    | {
          /** The sensor's id */
          sensorId?: string;
          /** The sensor's value */
          value: number | null;
          /** The type of weather element. Configures the coloring and the used icon */
          elementType?: "weather-state";
          /** Number of digits after the decimal point */
          precision: number;
          /** Adds a "INSIDE" or "OUTSIDE" tag  */
          location?: "inside" | "outside";
          /** Adds a scrollable forecast to the weather-state sensor view */
          forecast?: ForecastItem[];

          hasGraph?: boolean;
          hasExtremes?: boolean;
          order: number;
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
    weatherState: number | null;
    forecast?: ForecastItem[];
}) {
    const ref = useRef();
    const { events } = useScrollOnDrag(ref);
    const [showForecast, setShowForecast] = useState(false);
    const [scroll, setScroll] = useState(false);
    const globals = useGlobalContext();

    return (
        <div className={styles.sensorData}>
            <div
                className={`${styles.now} ${showForecast && styles.hidden}`}
                onClick={() => {
                    setShowForecast(true);
                    setTimeout(() => setScroll(true), 300);
                }}
            >
                <img
                    src={utils.weatherStateIconUrl(weatherState, true)}
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
                                    backgroundImage: `url(${utils.weatherStateIconUrl(
                                        item.weatherState,
                                        true
                                    )})`,
                                }}
                                className={styles.weatherIcon}
                            />
                            <div
                                className={styles.temperature}
                                style={{
                                    color:
                                        globals.theme === "light"
                                            ? "white"
                                            : "black",
                                    background: utils.valueToColor(
                                        item.temperature,
                                        globals.theme,
                                        "temperature"
                                    ),
                                    borderColor: utils.valueToColor(
                                        item.temperature,
                                        globals.theme,
                                        "temperature"
                                    ),
                                }}
                            >
                                {item.temperature.toFixed(0)}
                                <span className={styles.unit}>
                                    {globals.units["temperature"]}
                                </span>
                            </div>
                            <div
                                className={`${styles.precipation} ${
                                    item.precipation == 0
                                        ? styles.zeroPrecipation
                                        : ""
                                }`}
                            >
                                {item.precipation.toFixed(1)}
                                <span className={styles.unit}>
                                    {globals.units["precipation"]}
                                </span>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default function SensorView(props: SensorViewProps) {
    const { navigate } = useSmoothNavigation();
    const backgroundImage = useResponsiveBackgroundImage(
        `weather-state-${props.value}`
    );
    const t = useTranslation("sensor-view");
    const globals = useGlobalContext();
    const [isDragTarget, setIsDragTarget] = useState(false);
    const [isDragged, setIsDragged] = useState(false);

    function goToGraph(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        navigate(`/user/weather-station/graphs#${props.sensorId}`);
    }

    function goToExtremes(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        event.preventDefault();
        navigate(`/user/weather-station/extremes#${props.sensorId}`);
    }

    function content() {
        switch (props.elementType) {
            case "wind-direction":
                return <WindDirectionCompass direction={props.value ?? 0} />;
            case "weather-state":
                return (
                    <WeatherState
                        weatherState={props.value}
                        forecast={
                            "forecast" in props ? props.forecast : undefined
                        }
                    />
                );
            default:
                return (
                    <div className={`${styles.sensorData}`}>
                        <div
                            className={styles.value}
                            style={{
                                color: utils.valueToColor(
                                    props.value,
                                    globals.theme,
                                    props.elementType
                                ),
                            }}
                        >
                            <AnimatedTextChange
                                text={
                                    props.value !== null
                                        ? props.value.toFixed(props.precision)
                                        : ""
                                }
                                sensorData
                            />
                            {props.value === null && (
                                <div className={styles.disconnectedView}>
                                    <NoIcon
                                        className={styles.disconnectedIcon}
                                    />
                                    {t("no-signal")}
                                </div>
                            )}
                        </div>
                        <div className={styles.unit}>
                            {props.value !== null && props.elementType
                                ? globals.units[props.elementType]
                                : ""}
                        </div>
                    </div>
                );
        }
    }

    return (
        <div
            className={`${styles.sensorView} ${
                props.value === null && styles.disconnected
            } ${props.elementType && styles[props.elementType]} ${
                isDragTarget && styles.dragTarget
            } ${isDragged && styles.dragged}`}
            onClick={(event) => {
                const div = event.target as HTMLDivElement;
                div.focus({ preventScroll: true });
            }}
            draggable={true}
            onDrop={(event) => {
                const droppedSensorId = event.dataTransfer.getData("sensorId");
                const targetSensorId = props.sensorId ?? "";
                // globals.changeSensorViewOrder(droppedSensorId, targetSensorId);
                setIsDragTarget(false);
                if (document.activeElement) {
                    (document.activeElement as any).blur();
                }
            }}
            onDragOver={(event) => {
                event.preventDefault();
                setIsDragTarget(true);
            }}
            onDragStart={(event) => {
                setIsDragged(true);
                event.dataTransfer.setData("sensorId", props.sensorId ?? "");
            }}
            onDrag={() => setIsDragged(true)}
            onDragEnd={() => setIsDragged(false)}
            onDragEnter={() => setIsDragTarget(true)}
            onDragLeave={() => setIsDragTarget(false)}
            tabIndex={0}
            style={{ order: props.order }}
            sensor-id={props.sensorId ?? ""}
        >
            {props.elementType === "weather-state" && (
                <div className={styles.backgroundImage} {...backgroundImage} />
            )}
            {props.elementType !== "weather-state" && (
                <div className={`${styles.details}`}>
                    <div className={styles.description}>
                        {t(`${props.elementType}_description`)}
                    </div>
                    <div className={styles.buttonArea}>
                        <Button
                            disabled={!props.hasGraph}
                            textSize="small"
                            icon={<GraphsIcon />}
                            color="color-1"
                            text={t("graph")}
                            onClick={goToGraph}
                        />
                        <Button
                            disabled={!props.hasExtremes}
                            textSize="small"
                            icon={<ExtremesIcon />}
                            text={t("extremes")}
                            onClick={goToExtremes}
                        />
                    </div>
                </div>
            )}
            {content()}

            <div className={styles.label}>
                {utils.iconComponent(props.elementType)}
                {t(`${props.elementType}_label`)}
                {props.location && (
                    <div className={styles.location}>{t(props.location)}</div>
                )}
            </div>
        </div>
    );
}
