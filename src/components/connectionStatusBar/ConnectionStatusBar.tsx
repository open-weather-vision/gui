import { useEffect, useState } from "react";
import styles from "./ConnectionStatusBar.module.css";
import globalStyles from "../../styles/global.module.css";
import { ReactComponent as StateIcon } from "../../img/icons/connection-state.svg";
import { ReactComponent as LatestUpdate } from "../../img/icons/latest-update.svg";
import { ReactComponent as DisconnectedIcon } from "../../img/icons/disconnected.svg";
import AnimatedTextChange from "../animatedTextChange/AnimatedTextChange";
import { ReactComponent as RetryIcon } from "../../img/icons/retry.svg";
import { ReactComponent as SwitchStationIcon } from "../../img/icons/switch.svg";
import { ReactComponent as Troubleshoot } from "../../img/icons/tool.svg";
import Button from "../button/Button";
import useGlobalContext from "../../utils/useGlobalContext";
import { useTranslation } from "react-multi-lang";
import { WeatherStationConnectionState } from "../../types/ConnectionState";
import useSmoothNavigation from "../../utils/useSmoothNavigation";

export type ConnectionStatusBarProps = {
    state: WeatherStationConnectionState;
    latestUpdate: Date;
    reconnectFunction: () => Promise<boolean>;
    showStatusBar?: boolean;
    showPopup?: boolean;
};

export default function ConnectionStatusBar(props: ConnectionStatusBarProps) {
    const [retryState, setRetryState] = useState<"idle" | "retrying" | "failed" | "success">("idle");
    const globals = useGlobalContext();
    const t = useTranslation("connection-state");
    const { navigate, setShowSwitchStationPopup } = useSmoothNavigation(); 
    useEffect(() => {
        console.log("Weather station connection status updated to: ", props.state);
    }, [props.state]);

    async function reconnect() {
        setRetryState("retrying");
        const success = await props.reconnectFunction();
        if(success) {
            setRetryState("success");
        } else {
            setRetryState("failed");

            setTimeout(() => {
                setRetryState("idle");
            }, 1000);
        }
    }

    return (
        <>
            <div className={`${styles.container} ${!props.showStatusBar && styles.hidden}`} >
                <div className={`${styles.status} ${styles[props.state]}`}>
                    <div className={styles.icon} />
                    {t(props.state)}
                </div>
                <div className={styles.lastUpdate}>
                    <LatestUpdate className={styles.icon} />
                    <AnimatedTextChange text={props.latestUpdate.toLocaleTimeString()} />
                </div>
            </div>
            <div className={`${styles.disconnectedPopup} ${props.state === "connected" || !props.showPopup ? styles.hidden : ""}`}>
                <div className={styles.popupContent}>
                    <div className={styles.popupHeader}>
                        <DisconnectedIcon className={styles.disconnectedIcon} />
                        <h1>{t("disconnected")}</h1>
                    </div>
                    <div className={styles.popupBody}>
                        <p>
                            {t("disconnected-message")}
                        </p>
                        <Button className={styles.reconnectButton}
                        wiggleOnce={retryState === "failed"}
                        fadeInOutInfinitely={retryState === "retrying"}
                        scaleUpOnce={retryState === "success"}
                        color={
                            retryState === "retrying" ? "yellow" : 
                            retryState === "failed" ? "red" :
                            retryState === "success" ? "green" : "yellow"
                        } icon={<RetryIcon />} text={t(retryState)} hideIcon={retryState !== "idle"} onClick={reconnect}
                            notClickable={retryState !== "idle"} />
                        <Button color="color-3" iconSize="medium" className={`${styles.switchStationButton}`} text={t("switch-station")} icon={<SwitchStationIcon/>} onClick={() => setShowSwitchStationPopup(true)} />
                        {
                            globals.isAdmin && <Button color="color-3" iconSize="medium" className={`${styles.switchStationButton}`} text={t("trouble-shoot")} icon={<Troubleshoot/>} />
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
