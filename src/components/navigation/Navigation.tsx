import styles from "./Navigation.module.css";
import { useLocation } from "react-router-dom";
import { ReactComponent as MenuIcon } from "../../img/menu.svg";
import { ReactComponent as LiveIcon } from "../../img/live.svg";
import { ReactComponent as ForecastIcon } from "../../img/forecast.svg";
import { ReactComponent as ExtremesIcon } from "../../img/extremes.svg";
import { ReactComponent as GraphsIcon } from "../../img/graphs.svg";
import { ReactComponent as SettingsIcon } from "../../img/settings.svg";
import { ReactComponent as WeatherStationIcon } from "../../img/weather-station.svg";
import { ReactComponent as SwitchIcon } from "../../img/switch.svg";
import { ReactComponent as ClimateIcon } from "../../img/climate.svg";
import { useState } from "react";
import useSmoothNavigation from "../../utils/useSmoothNavigation";

export default function Navigation() {
    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const navigate = useSmoothNavigation();
    const path = useLocation().pathname;
    const items = [
        {
            icon: <LiveIcon />,
            label: "Live",
            link: "/user/live",
        },
        {
            icon: <ForecastIcon />,
            label: "Forecast",
            link: "/user/forecast",
        },
        {
            icon: <GraphsIcon />,
            label: "Graphs",
            link: "/user/graphs",
        },
        {
            icon: <ExtremesIcon />,
            label: "Extremes",
            link: "/user/extremes",
        },
        {
            icon: <ClimateIcon />,
            label: "Climate",
            link: "/user/climate",
        },
    ];

    async function handleClick(link: string) {
        setSideMenuOpen(false);
        if (link === path) return;
        navigate(link);
    }

    function openMenu() {
        setSideMenuOpen(true);
    }

    return (
        <>
            <div
                className={`${styles.overlay} ${
                    !sideMenuOpen ? styles.closed : ""
                }`}
                onClick={() => setSideMenuOpen(false)}
            />
            <nav
                className={`${styles.sideNav} ${
                    !sideMenuOpen ? styles.closed : ""
                }`}
            >
                <ul>
                    <li className={styles.weatherStation}>
                        <WeatherStationIcon
                            className={styles.weatherStationIcon}
                        />
                        <div className={styles.infoArea}>
                            <div className={styles.name}>Hüffelsheim</div>
                            <div className={styles.elevation}>230m</div>
                        </div>
                        <SwitchIcon />
                    </li>
                    {items.map((item) => (
                        <li
                            onClick={() => handleClick(item.link)}
                            className={path === item.link ? styles.active : ""}
                        >
                            {item.icon}
                            <div className={styles.label}>{item.label}</div>
                        </li>
                    ))}
                    <li
                        className={`${styles.settings} ${
                            path === "/user/settings" ? styles.active : ""
                        }`}
                        onClick={() => handleClick("/user/settings")}
                    >
                        <SettingsIcon />
                        <div className={styles.label}>Settings</div>
                    </li>
                </ul>
            </nav>
            <nav className={styles.nav}>
                <ul>
                    {items.slice(0, 4).map((item) => (
                        <li
                            onClick={() => handleClick(item.link)}
                            className={path === item.link ? styles.active : ""}
                        >
                            {item.icon}
                            <div className={styles.label}>{item.label}</div>
                        </li>
                    ))}
                    <li className={styles.menuButton} onClick={openMenu}>
                        <MenuIcon />
                    </li>
                </ul>
            </nav>
        </>
    );
}
