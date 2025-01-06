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

function WrappedLayout(){
	const { navigate, hideMain } = useSmoothNavigation();
	const location = useLocation();

	useEffect(() => {
		console.log(hideMain)
	}, [hideMain]);

	const globals = useGlobalContext();
	const t = useTranslation("menu");

	const [connectionState, setConnectionState] = useState<"connected" | "disconnected" | "connecting">("connected");

	async function reconnect(){
		setConnectionState("connecting");
		// wait for 500ms
		await new Promise((resolve) => setTimeout(resolve, 500));

		const success = Math.random() > 0.5;

		setTimeout(() => {
			if(success){
				setConnectionState("connected");
			} else {
				setConnectionState("disconnected");
			}
		}, 1000);
		return success;
	}


	return <div className={styles.container}>
		<UserMain hidden={hideMain}>
			<Outlet />
			<ConnectionStatusBar showStatusBar={location.pathname === "/weather-station/live"} reconnectFunction={reconnect} state={connectionState} latestUpdate={new Date()} />
		</UserMain>
		
		<Navigation logo={<Logo />} title={globals.applicationName} 
		topSection={{
				icon: <WeatherStationIcon />,
				heading: globals.selectedWeatherStation!.name,
				subheading: globals.selectedWeatherStation!.elevation + "m",
				actionFields: [
					{
						icon: <SwitchIcon />
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
					link: "/weather-station/live",
				},
				{
					icon: <ForecastIcon />,
					label: t("forecast"),
					link: "/weather-station/forecast",
				},
				{
					icon: <GraphsIcon />,
					label: t("graphs"),
					link: "/weather-station/graphs",
				},
				{
					icon: <ExtremesIcon />,
					label: t("extremes"),
					link: "/weather-station/extremes",
				},
				{
					icon: <ClimateIcon />,
					label: t("climate"),
					link: "/weather-station/climate",
				},
				{
					icon: <ClimateIcon />,
					label: "Tests",
					link: "/weather-station/tests",
				},
			]} settingsEntry={{
				icon: <SettingsIcon />,
				label: t("settings"),
				link: "/weather-station/settings",
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
