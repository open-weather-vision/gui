import styles from "./SensorView.module.css";
import { ReactComponent as TemperatureIcon } from "../../img/temperature.svg";

type SensorViewProps = {
    value?: number;
    unit?: string;
    label?: string;
    icon?: JSX.Element;
    hideUnit?: boolean;
};

export default function SensorView({
    value,
    unit,
    label,
    icon,
    hideUnit,
}: SensorViewProps) {
    return (
        <div className={styles.sensorView}>
            <div className={styles.sensorData}>
                <div className={styles.value}>{value || 23.4}</div>
                <div className={styles.unit}>
                    {!hideUnit ? unit || "°C" : ""}
                </div>
            </div>
            <div className={styles.label}>
                {icon || <TemperatureIcon />}
                {label || "Temperature"}
            </div>
        </div>
    );
}
