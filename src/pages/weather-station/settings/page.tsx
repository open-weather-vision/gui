import { Link } from "react-router-dom";
import styles from "./page.module.css";
import Button from "../../../components/button/Button";
import { getLanguage, setLanguage, useTranslation } from "react-multi-lang";
import { PropsWithChildren, useEffect } from "react";
import { ReactComponent as LanguageIcon } from "../../../img/icons/language.svg";
import { ReactComponent as ThemeIcon } from "../../../img/icons/theme.svg";
import { ReactComponent as UnitsIcon } from "../../../img/icons/units.svg";
import useGlobalContext from "../../../utils/useGlobalContext";
import WeatherElementType, { WeatherElementTypes } from "../../../types/WeatherElementType";
import utils from "../../../utils/utils";

function SettingsItem(
    props: PropsWithChildren<{
        title: string;
        icon?: React.ReactNode;
    }>
) {
    return (
        <div className={styles.item}>
            {props.icon}
            <h2>{props.title}</h2>
            <div className={styles.content}>{props.children}</div>
        </div>
    );
}

function SettingsSection(
    props: PropsWithChildren<{
        title: string;
        icon?: React.ReactNode;
    }>
) {
    return (
        <div className={styles.section}>
            <div className={styles.heading}>
                {props.icon}
                <h1>{props.title}</h1>
            </div>
            <div className={styles.content}>{props.children}</div>
        </div>
    );
}

export default function Page() {
    const t = useTranslation("settings");
    const tWeatherElements = useTranslation("sensor-view");
    const globals = useGlobalContext();

    useEffect(() => {
        console.log(globals.units)
    }, [globals.units])

    return (
        <>
            <SettingsSection title={t("general")}>
                <SettingsItem icon={<LanguageIcon />} title={t("language")}>
                    <select value={getLanguage()} onChange={(event) => setLanguage(event.target.value)}>
                        <option value="de">{t("de")}</option>
                        <option value="en">{t("en")}</option>
                    </select>
                </SettingsItem>

                <SettingsItem icon={<ThemeIcon />} title={t("theme")}>
                    <select
                        value={globals.theme}
                        onChange={(event) => globals.setTheme(event.target.value as "dark" | "light")}
                    >
                        <option value="dark">{t("dark")}</option>
                        <option value="light">{t("light")}</option>
                    </select>
                </SettingsItem>
            </SettingsSection>
            <SettingsSection title={t("units")}>
                {WeatherElementTypes.map((element) => (
                    <SettingsItem icon={utils.iconComponent(element)} title={tWeatherElements(element + "_label")}>
                        <select value={globals.units[element]} onChange={(event) => {
                            console.log("here")
                            globals.setUnitType(element, event.target.value)
                        }}>
                            {utils.units(element).map(unit => <option value={unit}>{unit}</option>)}
                        </select>
                    </SettingsItem>
                ))}
            </SettingsSection>
        </>
    );
}
