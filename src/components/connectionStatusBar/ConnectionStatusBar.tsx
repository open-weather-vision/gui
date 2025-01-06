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

export type ConnectionStatusBarProps = {
    state: "connected" | "disconnected" | "connecting";
    latestUpdate: Date;
    reconnectFunction: () => Promise<boolean>;
};

export default function ConnectionStatusBar(props: ConnectionStatusBarProps) {
    const [retryState, setRetryState] = useState<"idle" | "retrying" | "failed" | "success">("idle");
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
            <div className={styles.container} >
                <div className={`${styles.status} ${styles[props.state]}`}>
                    <StateIcon className={styles.icon} />
                    {props.state === "connected" ? "Connected" : props.state === "disconnected" ? "Disconnected" : "Connecting"}
                </div>
                <div className={styles.lastUpdate}>
                    <LatestUpdate className={styles.icon} />
                    <AnimatedTextChange text={props.latestUpdate.toLocaleTimeString()} />
                </div>
            </div>
            <div className={`${styles.disconnectedPopup} ${props.state === "connected" ? styles.hidden : ""}`}>
                <div className={styles.popupContent}>
                    <div className={styles.popupHeader}>
                        <DisconnectedIcon className={styles.disconnectedIcon} />
                        <h1>Disconnected</h1>
                    </div>
                    <div className={styles.popupBody}>
                        <p>
                            The weather station is currently not reachable. Please check the connection and try again.
                        </p>
                        <Button className={`${styles[retryState]} ${styles.reconnectButton}`} color={
                            retryState === "retrying" ? "yellow" : 
                            retryState === "failed" ? "red" :
                            retryState === "success" ? "green" : "yellow"
                        } icon={<RetryIcon />} text={retryState === "retrying" ? "Retrying..." : 
                            retryState === "failed" ? "Failed!" :
                            retryState === "success" ? "Success!" : "Reconnect"} hideIcon={retryState !== "idle"} onClick={reconnect}
                            notClickable={retryState !== "idle"} />
                        <Button color="color-3" iconSize="medium" className={`${styles.switchStationButton}`} text="Switch station" icon={<SwitchStationIcon/>} />
                        <hr />
                        <Button color="color-3" iconSize="medium" className={`${styles.switchStationButton}`} text="Trouble shoot" icon={<Troubleshoot/>} />
                    </div>
                </div>
            </div>
        </>
    );
}
