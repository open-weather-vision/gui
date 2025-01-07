import styles from "./AdminLogin.module.css";
import { ReactComponent as LoginIcon } from "../../img/icons/login.svg";
import Button from "../button/Button";
import useGlobalContext from "../../utils/useGlobalContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-multi-lang";

import { ReactComponent as BackIcon } from "../../img/icons/back.svg";

export type AdminLoginProps = {
    loggedIn: boolean;
};

export default function AdminLogin(props: AdminLoginProps) {
    const globals = useGlobalContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginState, setLoginState] = useState<"idle" | "logging-in" | "failed" | "success">("idle");
    const t = useTranslation("login");

    useEffect(() => {
        if(!globals.isAdmin){
            setLoginState("idle");
            setUsername("");
            setPassword("");
        }
    }, [globals.isAdmin]);

    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>){
        setUsername(event.target.value);
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value);
    }

    async function login(){
        setLoginState("logging-in");

        await new Promise(resolve => setTimeout(resolve, 500));

        const success = await globals.login(username, password, 1000);
        if(success){
            setLoginState("success");
            await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
            setLoginState("failed");
            await new Promise(resolve => setTimeout(resolve, 2000));
            setLoginState("idle");
        }
    }

    return (
        <>
            <div className={`${styles.loginPopup} ${props.loggedIn ? styles.hidden : ""}`}>
                <div className={styles.popupContent}>
                    <div className={styles.popupHeader}>
                        <LoginIcon className={styles.loginIcon} />
                        <h1>{t("login")}</h1>
                    </div>
                    <div className={styles.popupBody}>
                        <p>
                            {t("login-message")}
                        </p>
                        <input type="text" placeholder={t("username")} value={username} onChange={handleUsernameChange} />
                        <input type="password" placeholder={t("password")} value={password} onChange={handlePasswordChange}/>
                        <Button
                        scaleUpOnce={loginState === "success"}
                        wiggleOnce={loginState === "failed"}
                        fadeInOutInfinitely={loginState === "logging-in"}
                        notClickable={loginState !== "idle"} onClick={login} color={
                            loginState === "idle" ? "green" :
                            loginState === "logging-in" ? "yellow" :
                            loginState === "failed" ? "red" :
                            "green"
                        } iconSize="medium" className={`${styles.switchStationButton}`} text={
                            loginState === "idle" ? t("idle"):
                            loginState === "logging-in" ? t("logging-in") :
                            loginState === "failed" ? t("failed") :
                            t("success")
                        } />
                        <Button icon={<BackIcon/>} text={t("return")} onClick={() => globals.navigateOverBlackOverlay("/weather-station/live")} />
                    </div>
                </div>
            </div>
        </>
    );
}
