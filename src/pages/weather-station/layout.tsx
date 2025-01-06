import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import UserMain from "../../components/userMain/UserMain";
import { useState } from "react";
import styles from "./layout.module.css";
import { NavigationContext } from "../../utils/useSmoothNavigation";
import {
	setTranslations,
	setDefaultLanguage,
	useTranslation,
} from "react-multi-lang";

import de from "../../languages/de.json";
import en from "../../languages/en.json";
import ConnectionStatusBar from "../../components/connectionStatusBar/ConnectionStatusBar";

setTranslations({ de, en });
setDefaultLanguage("de");

export default function Layout() {
	const [hideMain, setHideMain] = useState<boolean>(false);
	const navigate = useNavigate();

	const [connectionState, setConnectionState] = useState<"connected" | "disconnected" | "connecting">("disconnected");

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

	async function beforeNavigate() {
		setHideMain(true);
		await new Promise((resolve) => {
			setTimeout(resolve, 150);
		});
	}

	async function afterNavigate() {
		setTimeout(() => {
			setHideMain(false);
		}, 150);
	}

	return (
		<NavigationContext.Provider
			value={{
				navigate: async (path: string) => {
					await beforeNavigate();
					navigate(path);
					await afterNavigate();
				},
			}}
		>
			<div className={styles.container}>
				<UserMain hidden={hideMain}>
					<Outlet />
					<ConnectionStatusBar reconnectFunction={reconnect} state={connectionState} latestUpdate={new Date()} />
				</UserMain>
				
				<Navigation />
			</div>
		</NavigationContext.Provider>
	);
}
