import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import UserMain from "../../components/userMain/UserMain";
import { useEffect, useState } from "react";
import styles from "./layout.module.css";
import useSmoothNavigation, { NavigationContextProvider } from "../../utils/useSmoothNavigation";
import ConnectionStatusBar from "../../components/connectionStatusBar/ConnectionStatusBar";

import { ReactComponent as ClimateIcon} from "../../img/icons/climate.svg";
import { ReactComponent as LiveIcon} from "../../img/icons/live.svg";
import { ReactComponent as ForecastIcon} from "../../img/icons/forecast.svg";
import { ReactComponent as ExtremesIcon} from "../../img/icons/extremes.svg";
import { ReactComponent as GraphsIcon} from "../../img/icons/graphs.svg";
import { ReactComponent as SettingsIcon} from "../../img/icons/settings.svg";
import { ReactComponent as Logo} from "../../img/icons/logo.svg";
import { ReactComponent as WeatherStationIcon} from "../../img/icons/weather-station.svg";
import { ReactComponent as SwitchIcon} from "../../img/icons/switch.svg";
import { ReactComponent as AdminIcon} from "../../img/icons/admin-login.svg";

import useGlobalContext from "../../utils/useGlobalContext";
import { useTranslation } from "react-multi-lang";
import WeatherStationsPopup from "../../components/weatherStations/WeatherStationsPopup";

function WrappedLayout(){
	const { navigate, hideMain, showSwitchStationPopup, setShowSwitchStationPopup } = useSmoothNavigation();
	const location = useLocation();

	const globals = useGlobalContext();
	const t = useTranslation("menu");


	return <div className={styles.container}>
		<UserMain hidden={hideMain}>
			<Outlet />
		</UserMain>
		<WeatherStationsPopup visible={showSwitchStationPopup} />
		
		<Navigation logo={<Logo />} title={globals.applicationName} 
		topSection={{
				icon: <WeatherStationIcon />,
				heading: globals.selectedWeatherStation!.name,
				subheading: globals.selectedWeatherStation!.elevation + "m",
				actionFields: [
					{
						icon: <SwitchIcon />,
						onClick: () => setShowSwitchStationPopup(true)
					},
					{
						icon: <AdminIcon />,
						onClick: () => globals.navigateOverBlackOverlay("/admin")
					}
				]
			}}
		items={[
				{
					icon: <LiveIcon/>,	
					label: t("live"),
					link: "/user/weather-station/live",
				},
				{
					icon: <ForecastIcon />,
					label: t("forecast"),
					link: "/user/weather-station/forecast",
				},
				{
					icon: <GraphsIcon />,
					label: t("graphs"),
					link: "/user/weather-station/graphs",
				},
				{
					icon: <ExtremesIcon />,
					label: t("extremes"),
					link: "/user/weather-station/extremes",
				},
				{
					icon: <ClimateIcon />,
					label: t("climate"),
					link: "/user/weather-station/climate",
				},
				{
					icon: <ClimateIcon />,
					label: "Tests",
					link: "/user/weather-station/tests",
				},
			]} settingsEntry={{
				icon: <SettingsIcon />,
				label: t("settings"),
				link: "/user/settings",
			}}
		/>
	</div>
}

export default function Layout() {
	return (
		<NavigationContextProvider>
			<WrappedLayout />
		</NavigationContextProvider>
	);
}
