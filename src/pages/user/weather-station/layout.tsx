import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { WeatherStationConnectionState } from "../../../types/ConnectionState";
import ConnectionStatusBar from "../../../components/connectionStatusBar/ConnectionStatusBar";

export default function Layout() {
	const location = useLocation() 
	const [connectionState, setConnectionState] = useState<WeatherStationConnectionState>("connected");
	const [latestUpdate, setLastUpdate] = useState<Date>(new Date());

	useEffect(() => {
		setTimeout(() => {
			setConnectionState("disconnected");
		}, 1000);
	}, []);

    useEffect(() => {
        setInterval(() => {
			setLastUpdate(new Date());
        }, 10000 * Math.random());
    }, []);

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

	return <>
		<Outlet />
		<ConnectionStatusBar showPopup showStatusBar={location.pathname === "/user/weather-station/live"} reconnectFunction={reconnect} state={connectionState} latestUpdate={latestUpdate} />
		
	</>
}
