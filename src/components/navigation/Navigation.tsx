import styles from "./Navigation.module.css";
import { useLocation } from "react-router-dom";
import { ReactComponent as MenuIcon} from "../../img/icons/menu.svg";

import { useState } from "react";
import useSmoothNavigation from "../../utils/useSmoothNavigation";

export type NavigationProps = {
	items: {
		icon: JSX.Element;
		label: string;
		link: string;
	}[],
	logo: JSX.Element;
	title: string;
	settingsEntry?: {
		icon: JSX.Element;
		label: string;
		link: string;
	}
	topSection?: {
		icon: JSX.Element,
		heading: string,
		subheading: string,
		actionFields: {
			icon: JSX.Element,
			onClick?: () => void,
			link?: string
		}[]
	}
};

export default function Navigation(props: NavigationProps) {
	const [sideMenuOpen, setSideMenuOpen] = useState(false);
	const {navigate} = useSmoothNavigation();
	const path = useLocation().pathname;

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
				{props.topSection && 
				<div className={styles.topArea}>
					<div className={styles.icon}>
						{props.topSection.icon}
					</div>
					<div className={styles.infoArea}>
						<div className={styles.heading}>{props.topSection.heading}</div>
						<div className={styles.subheading}>{props.topSection.subheading}</div>
					</div>
					{props.topSection.actionFields.map((action, index) => {
						let onClick = action.onClick;
						if(!onClick && action.link){
							onClick = () => handleClick(action.link!);
						}	
						return <div className={`${styles.action} ${index === 0 ? styles.first : ""}`} onClick={onClick}>
							{action.icon}
						</div>;
					})}
				</div>
				}
				<ul>
					{props.items.map((item) => (
						<li
							onClick={() => handleClick(item.link)}
							className={path === item.link ? styles.active : ""}
						>
							{item.icon}
							<div className={styles.label}>{item.label}</div>
						</li>
					))}
				</ul>
				
				{props.settingsEntry &&
				<div
					className={`${styles.settings} ${
						path === props.settingsEntry.link ? styles.active : ""
					}`}
					onClick={() => handleClick(props.settingsEntry!.link)}
				>
					{props.settingsEntry.icon}
					<div className={styles.label}>{props.settingsEntry.label}</div>
				</div>
				}
			</nav>
			<nav className={styles.nav}>
				<ul>
					<li className={styles.logo}>
						{props.logo}
						<h1>{props.title}</h1>
					</li>
					{props.items.slice(0, 4).map((item) => (
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
