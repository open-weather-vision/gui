import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import UserMain from "../../components/userMain/UserMain";
import styles from "./layout.module.css";
import useSmoothNavigation, { NavigationContextProvider } from "../../utils/useSmoothNavigation";
import useGlobalContext from "../../utils/useGlobalContext";
import { ReactComponent as Logo} from "../../img/icons/logo-admin.svg";
import { ReactComponent as AccountIcon} from "../../img/icons/admin-login.svg";
import { ReactComponent as LogoutIcon} from "../../img/icons/logout.svg";
import { ReactComponent as HomeIcon} from "../../img/icons/home.svg";
import { ReactComponent as WeatherStationIcon} from "../../img/icons/weather-station.svg";
import { ReactComponent as ThemeIcon} from "../../img/icons/theme.svg";
import { useTranslation } from "react-multi-lang";
import AdminLogin from "../../components/adminLogin/AdminLogin";

function WrappedLayout(){
	const globals = useGlobalContext();
	const {hideMain, navigate} = useSmoothNavigation();
	const t = useTranslation("admin-menu");

	return <div className={styles.container}>
		<UserMain hidden={hideMain}>
			<Outlet />
		</UserMain>

		<AdminLogin loggedIn={globals.isAdmin} />
		
		<Navigation logo={<Logo />} title={globals.applicationName + "/admin"} items={[
				{icon: <HomeIcon/>, label: t("overview"), link: "/admin"},
				{icon: <WeatherStationIcon/>, label: t("stations"), link: "/admin/stations"},
				{icon: <ThemeIcon/>, label: t("look"), link: "/admin/theme"},
				{icon: <AccountIcon/>, label: t("account"), link: "/admin/account"}
			]}

			topSection={{
				heading: globals.username!,
				subheading: t("logged-in"),
				icon: <AccountIcon />,
				actionFields: [
					{ icon: <LogoutIcon/>, onClick: () => {
						globals.logout(500);
						globals.navigateOverBlackOverlay("/user/weather-station/live")
					}},
					{ icon: <HomeIcon/>, onClick: () => globals.navigateOverBlackOverlay("/user/weather-station/live")}
				]
			}}
		/>
	</div>;
}

export default function Layout() {
	return (
		<NavigationContextProvider>
			<WrappedLayout />
		</NavigationContextProvider>
	);
}
