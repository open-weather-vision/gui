import styles from "./SensorView.module.css";
import WeatherElementType from "../../types/WeatherElementType";

import utils from "../../utils/utils";
import { ReactComponent as WindDirectionCompassSvg } from "../../img/icons/wind-direction-compass.svg";
import { ReactComponent as WindDirectionArrow } from "../../img/icons/wind-direction-arrow.svg";
import { ReactComponent as ArrowLeft } from "../../img/icons/arrow-left.svg";
import AnimatedTextChange from "../animatedTextChange/AnimatedTextChange";
import { useState, useRef } from "react";
import useSmoothNavigation from "../../utils/useSmoothNavigation";
// @ts-ignore
import useScrollOnDrag from "react-scroll-ondrag";
import useResponsiveBackgroundImage from "../../utils/useResponsiveBackgroundImage";

type ForecastItem = {
	time: string;
	weatherState: number;
	temperature: number;
	precipation: number;
};

type SensorViewProps =
	| {
			/** The sensor's id */
			sensorId?: string;
			/** The sensor's value */
			value: number;
			/** The type of weather element. Configures the coloring and the used icon */
			elementType?: WeatherElementType;
			/** Short description of the sensor */
			label?: string;
			/** Detailed description of the sensor */
			description?: string;
			/** Number of digits after the decimal point */
			precision: number;
			/** Adds a "INSIDE" or "OUTSIDE" tag  */
			location?: "inside" | "outside";
	  }
	| {
			/** The sensor's id */
			sensorId?: string;
			/** The sensor's value */
			value: number;
			/** The type of weather element. Configures the coloring and the used icon */
			elementType?: "weather-state";
			/** Short description of the sensor */
			label?: string;
			/** Detailed description of the sensor */
			description?: string;
			/** Number of digits after the decimal point */
			precision: number;
			/** Adds a "INSIDE" or "OUTSIDE" tag  */
			location?: "inside" | "outside";
			/** Adds a scrollable forecast to the weather-state sensor view */
			forecast?: ForecastItem[];
	  };

function WindDirectionCompass({ direction }: { direction: number }) {
	return (
		<div className={styles.windDirectionContainer}>
			<WindDirectionCompassSvg className={styles.compass} />
			<WindDirectionArrow
				style={{ transform: `rotate(${direction}deg)` }}
				className={styles.arrow}
			/>
		</div>
	);
}

function WeatherState({
	weatherState,
	forecast,
}: {
	weatherState: number;
	forecast?: ForecastItem[];
}) {
	const ref = useRef();
	const { events } = useScrollOnDrag(ref);
	const [showForecast, setShowForecast] = useState(false);
	const [scroll, setScroll] = useState(false);

	return (
		<div className={styles.sensorData}>
			<div
				className={`${styles.now} ${showForecast && styles.hidden}`}
				onClick={() => {
					setShowForecast(true);
					setTimeout(() => setScroll(true), 300);
				}}
			>
				{utils.weatherStateIconComponent(
							weatherState,
							true
						)}
			</div>
			<div
				className={`${styles.scrollableForecast} ${
					showForecast && styles.open
				}`}
				ref={ref}
				{...events}
				style={{ overflowX: scroll ? "scroll" : "hidden" }}
			>
				<div
					className={styles.forecastArrow}
					onClick={() => {
						setScroll(false);
						setShowForecast(false);
					}}
				>
					<ArrowLeft className={styles.forecastArrowIcon} />
				</div>
				{forecast &&
					forecast.map((item, index) => (
						<div className={styles.forecastItem} key={index}>
							<div className={styles.time}>{item.time}</div>
							<div
								style={{
									backgroundImage: `url(${utils.weatherStateIconUrl(
										item.weatherState,
										true
									)})`,
								}}
								className={styles.weatherIcon}
							/>
							<div
								className={styles.temperature}
								style={{
									color: utils.valueToColor(
										item.temperature,
										"temperature"
									),
								}}
							>
								{item.temperature.toFixed(0)}
								<span className={styles.unit}>
									{utils.unit("temperature")}
								</span>
							</div>
							<div className={styles.precipation}>
								{item.precipation.toFixed(1)}
								<span className={styles.unit}>
									{utils.unit("precipation")}
								</span>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}

export default function SensorView(props: SensorViewProps) {
	const [showDetails, setShowDetails] = useState(false);
	const navigate = useSmoothNavigation();
	const backgroundImage = useResponsiveBackgroundImage("rain");

	function goToGraph() {
		navigate(`/user/graphs#${props.sensorId}`);
	}

	function goToExtremes() {
		navigate(`/user/extremes#${props.sensorId}`);
	}

	function content() {
		switch (props.elementType) {
			case "wind-direction":
				return <WindDirectionCompass direction={props.value} />;
			case "weather-state":
				return (
					<WeatherState
						weatherState={props.value}
						forecast={
							"forecast" in props ? props.forecast : undefined
						}
					/>
				);
			default:
				return (
					<div className={styles.sensorData}>
						<div
							className={styles.value}
							style={{
								color: utils.valueToColor(
									props.value,
									props.elementType
								),
							}}
						>
							<AnimatedTextChange
								text={props.value.toFixed(props.precision)}
								sensorData
							/>
						</div>
						<div className={styles.unit}>
							{utils.unit(props.elementType)}
						</div>
					</div>
				);
		}
	}

	return (
		<div
			className={`${styles.sensorView} ${
				props.elementType && styles[props.elementType]
			}`}
			onClick={() => setShowDetails(!showDetails)}
		>
			{props.elementType === "weather-state" && (
				<div className={styles.backgroundImage} {...backgroundImage} />
			)}
			{props.description && (
				<div
					className={`${styles.details} ${
						!showDetails && styles.hidden
					}`}
				>
					{props.description}
					{props.sensorId && (
						<div className={styles.buttonArea}>
							<button onClick={goToGraph}>View graph</button>
							<button onClick={goToExtremes}>
								View extremes
							</button>
						</div>
					)}
				</div>
			)}
			{content()}

			<div className={styles.label}>
				{utils.iconComponent(props.elementType)}
				{props.label}
				{props.location && (
					<div className={styles.location}>{props.location}</div>
				)}
			</div>
		</div>
	);
}
