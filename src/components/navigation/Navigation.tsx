import styles from "./Navigation.module.css";
import { useLocation } from "react-router-dom";
import { ReactComponent as MenuIcon} from "../../img/icons/menu.svg";
import { ReactComponent as LiveIcon} from "../../img/icons/live.svg";
import { ReactComponent as ForecastIcon} from "../../img/icons/forecast.svg";
import { ReactComponent as ExtremesIcon} from "../../img/icons/extremes.svg";
import { ReactComponent as GraphsIcon} from "../../img/icons/graphs.svg";
import { ReactComponent as SettingsIcon} from "../../img/icons/settings.svg";
import { ReactComponent as WeatherStationIcon} from "../../img/icons/weather-station.svg";
import { ReactComponent as SwitchIcon} from "../../img/icons/switch.svg";
import { ReactComponent as ClimateIcon} from "../../img/icons/climate.svg";
import { useState } from "react";
import useSmoothNavigation from "../../utils/useSmoothNavigation";
import { useTranslation } from "react-multi-lang";

export default function Navigation() {
	const [sideMenuOpen, setSideMenuOpen] = useState(false);
	const t = useTranslation("menu");
	const navigate = useSmoothNavigation();
	const path = useLocation().pathname;
	const items = [
		{
			icon: <LiveIcon/>,	
			label: t("live"),
			link: "/user/live",
		},
		{
			icon: <ForecastIcon />,
			label: t("forecast"),
			link: "/user/forecast",
		},
		{
			icon: <GraphsIcon />,
			label: t("graphs"),
			link: "/user/graphs",
		},
		{
			icon: <ExtremesIcon />,
			label: t("extremes"),
			link: "/user/extremes",
		},
		{
			icon: <ClimateIcon />,
			label: t("climate"),
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
						<WeatherStationIcon className={styles.weatherStationIcon} />
						<div className={styles.infoArea}>
							<div className={styles.name}>Hüffelsheim</div>
							<div className={styles.elevation}>230m</div>
						</div>
						<SwitchIcon className={styles.switchIcon} />
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
						<div className={styles.label}>{t("settings")}</div>
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
