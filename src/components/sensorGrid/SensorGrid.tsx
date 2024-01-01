import { PropsWithChildren } from "react";
import styles from "./SensorGrid.module.css";

export default function SensorGrid({ children }: PropsWithChildren<{}>) {
    return <div className={styles.sensorGrid}>{children}</div>;
}
