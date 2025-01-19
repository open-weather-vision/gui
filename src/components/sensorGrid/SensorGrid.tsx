import { PropsWithChildren } from "react";
import styles from "./SensorGrid.module.css";

export type SensorGridProps = {
    style?: React.CSSProperties;
};

export default function SensorGrid({
    children,
    style,
}: PropsWithChildren<SensorGridProps>) {
    return (
        <div style={style} className={styles.sensorGrid}>
            {children}
        </div>
    );
}
