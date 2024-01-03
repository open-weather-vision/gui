import styles from "./SensorView.module.css";
import WeatherElementType from "../../types/WeatherElementType";

import useUtils, { Utils } from "../../utils/useUtils";
import { ReactComponent as WindDirectionCompassSvg } from "../../img/wind-direction-compass.svg";
import { ReactComponent as WindDirectionArrow } from "../../img/wind-direction-arrow.svg";
import AnimatedTextChange from "../animatedTextChange/AnimatedTextChange";
import { useState } from "react";
import useSmoothNavigation from "../../utils/useSmoothNavigation";

type SensorViewProps = {
    name?: string;
    value: number;
    elementType?: WeatherElementType;
    label?: string;
    description?: string;
    precision: number;
    location?: "inside" | "outside";
};

function valueToColor(value: number, elementType?: WeatherElementType) {
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

export default function SensorView({
    name,
    value,
    elementType,
    label,
    description,
    precision,
    location,
}: SensorViewProps) {
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useSmoothNavigation();

    const utils: Utils = useUtils();

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
            case "condition":
                return (
                    <div className={styles.sensorData}>
                        {utils.conditionIcon(value)}
                    </div>
                );
            default:
                return (
                    <div className={styles.sensorData}>
                        <div
                            className={styles.value}
                            style={{ color: valueToColor(value, elementType) }}
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
            {elementType === "condition" && (
                <div
                    className={styles.backgroundImage}
                    style={{
                        backgroundImage: `url(${utils.conditionBackground(
                            value
                        )})`,
                    }}
                />
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
