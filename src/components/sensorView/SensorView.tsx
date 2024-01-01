import styles from "./SensorView.module.css";
import WeatherElementType from "../../types/WeatherElementType";

import useUtils, { Utils } from "../../utils/useUtils";
import { ReactComponent as WindDirectionCompassSvg } from "../../img/wind-direction-compass.svg";
import { ReactComponent as WindDirectionArrow } from "../../img/wind-direction-arrow.svg";

type SensorViewProps = {
    value: number;
    elementType?: WeatherElementType;
    label?: string;
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

export default function SensorView({
    value,
    elementType,
    label,
}: SensorViewProps) {
    const utils: Utils = useUtils();
    return (
        <div
            className={`${styles.sensorView} ${
                elementType && styles[elementType]
            }`}
        >
            {elementType === "wind-direction" ? (
                <WindDirectionCompass direction={value} />
            ) : (
                <div className={styles.sensorData}>
                    <div className={styles.value}>{value}</div>
                    <div className={styles.unit}>{utils.unit(elementType)}</div>
                </div>
            )}

            <div className={styles.label}>
                {utils.icon(elementType)}
                {label}
            </div>
        </div>
    );
}
