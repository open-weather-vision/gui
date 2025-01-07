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
import Select, { fromOptionsArray } from "../../../components/select/Select";

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
        <div className={styles.container}>
            <div className={styles.settings}>
                <SettingsSection title={t("general")}>
                    <SettingsItem icon={<LanguageIcon />} title={t("language")}>
                        <Select value={getLanguage()} options={{
                            "de": t("de"),
                            "en": t("en")
                        }} onSelect={(value) => setLanguage(value)}/>
                    </SettingsItem>

                    <SettingsItem icon={<ThemeIcon />} title={t("theme")}>
                        <Select value={globals.theme} options={{
                                "dark": t("dark"),
                                "light": t("light")
                            }} onSelect={(value) => globals.setTheme(value)}/>
                    </SettingsItem>
                </SettingsSection>
                <SettingsSection title={t("units")}>
                    {WeatherElementTypes.filter(element => utils.units(element).length > 0).map((element, index) => (
                        <SettingsItem key={index} icon={utils.iconComponent(element)} title={tWeatherElements(element + "_label")}>
                            <Select value={globals.units[element]} options={fromOptionsArray(utils.units(element).map(unit => ({label: unit, value: unit})))} onSelect={(value) => globals.setUnitType(element, value)}/>
                        </SettingsItem>
                    ))}
                </SettingsSection>
                <SettingsSection title={t("notifications")}>
                    
                </SettingsSection>
            </div>
        </div>
    );
}
