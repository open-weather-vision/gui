import { useTranslation } from "react-multi-lang";
import WeatherElementType from "../../types/WeatherElementType";
import useGlobalContext from "../../utils/useGlobalContext";
import utils from "../../utils/utils";
import styles from "./ExtremeView.module.css";
import { ReactComponent as ExtremeIcon } from "../../img/icons/extremes.svg";

export type ExtremeType = "max" | "min";

export type ExtremeViewProps = {
    elementType: WeatherElementType;
    extremeType: ExtremeType;
    value: number | null;
    time: Date;
    sensorId?: string;
    alltimeRank?: number;
};

export default function ExtremeView(props: ExtremeViewProps) {
    const globals = useGlobalContext();
    const t = useTranslation();
    return (
        <div
            className={`${styles.extremeView} ${styles[props.elementType]} ${
                styles[props.extremeType]
            }`}
        >
            <div className={styles.left}>
                <div className={styles.data}>
                    <span className={styles.value}>{props.value}</span>
                    <span className={styles.unit}>
                        {globals.units[props.elementType]}
                    </span>
                </div>
                <div className={styles.label}>
                    {utils.iconComponent(props.elementType)}
                    <span className={styles.element}>
                        {t(`extremes.${props.extremeType}`)}
                        {` `}
                        {t(`sensor-view.${props.elementType}_label`)}
                    </span>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.top}>
                    <span className={styles.time}>
                        {new Intl.DateTimeFormat(globals.language, {
                            day: "2-digit",
                            month: "2-digit",
                        }).format(props.time)}
                    </span>
                    <span>{t("extremes.at")}</span>
                    <span className={styles.time}>
                        {new Intl.DateTimeFormat(globals.language, {
                            hour: "2-digit",
                            minute: "2-digit",
                        }).format(props.time)}
                    </span>
                </div>
                <div
                    className={`${styles.bottom} ${
                        props.alltimeRank && styles.hidden
                    }`}
                >
                    {<ExtremeIcon className={styles.rankIcon} />}
                    {t("extremes.alltime-rank")}
                    <span className={styles.rank}>{props.alltimeRank}</span>
                </div>
            </div>
        </div>
    );
}
