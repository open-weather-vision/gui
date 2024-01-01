import styles from "./page.module.css";
import SensorView from "../../../components/sensorView/SensorView";
import SensorGrid from "../../../components/sensorGrid/SensorGrid";

export default function Page() {
    return (
        <SensorGrid>
            <SensorView value={23.9} />
            <SensorView value={1025} unit={"hPa"} />
            <SensorView value={15} unit={"mm"} />
            <SensorView value={23.9} />
            <SensorView value={23.9} />
            <SensorView value={23.9} />
        </SensorGrid>
    );
}
