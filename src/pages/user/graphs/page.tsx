import { Link } from "react-router-dom";
import styles from "./page.module.css";
import { useState } from "react";
import IntervalSelector, {
	Interval,
	date,
} from "../../../components/intervalSelector/IntervalSelector";
import utils from "../../../utils/utils";
import { ReactComponent as Icon } from "../../../img/temperature.svg";
import Graph from "../../../components/graph/Graph";
import { Limits } from "../../../components/graph/Limits";

function intervalToTimeSteps(interval: Interval) {
	switch (interval.type) {
		case "day":
			return 1000 * 60 * 60 * 4; // 4h
		case "week":
			return 1000 * 60 * 60 * 24; // 1d
		case "month":
			return 1000 * 60 * 60 * 24 * 5; // 5d
		case "year":
			return 1000 * 60 * 60 * 24 * 30; // 30d
	}
}

function dateTimeToLabelX(dateTime: number, interval: Interval) {
	switch (interval.type) {
		case "day":
			return new Date().toLocaleTimeString(undefined, {
				timeStyle: "short",
			});
		case "week":
			return new Date().toLocaleDateString(undefined, {
				dateStyle: "short",
			});
		case "month":
			return new Date().toLocaleDateString(undefined, {
				dateStyle: "short",
			});
		case "year":
			return new Date().toLocaleDateString(undefined, {
				dateStyle: "short",
			});
	}
}

function sampleData(interval: Interval) {
	switch (interval.type) {
		case "day":

		case "week":
			return new Date().toLocaleDateString(undefined, {
				dateStyle: "short",
			});
		case "month":
			return new Date().toLocaleDateString(undefined, {
				dateStyle: "short",
			});
		case "year":
			return new Date().toLocaleDateString(undefined, {
				dateStyle: "short",
			});
	}
}

export default function Page() {
	const [interval, setInterval] = useState<Interval>({
		type: "day",
		date: date(),
	});

	const dataTemp = [
		{ time: new Date("2002-04-12 00:00"), value: -0.5 + Math.random() * 2 },
		{ time: new Date("2002-04-12 03:00"), value: 0.1 + Math.random() * 2 },
		{ time: new Date("2002-04-12 06:00"), value: 1.3 + Math.random() * 2 },
		{ time: new Date("2002-04-12 09:00"), value: 2.4 + Math.random() * 2 },
		{ time: new Date("2002-04-12 12:00"), value: 4.1 + Math.random() * 2 },
		{ time: new Date("2002-04-12 15:00"), value: 3.9 + Math.random() * 2 },
		{ time: new Date("2002-04-12 17:00"), value: 4.2 + Math.random() * 2 },
		{ time: new Date("2002-04-12 19:00"), value: 3.7 + Math.random() * 2 },
		{ time: new Date("2002-04-12 21:00"), value: 0.7 + Math.random() * 2 },
		{ time: new Date("2002-04-12 24:00"), value: -0.2 + Math.random() * 2 },
	];

	const dataWind = [
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
		20, 21, 22, 23,
	].map((val) => {
		return {
			time: new Date(`2002-04-12 ${val}:30`),
			value: Math.random() * 100,
		};
	});
	return (
		<>
			<IntervalSelector interval={interval} setInterval={setInterval} />
			<Graph
				title={<>Titleee</>}
				leftAxis={{
					title: <>{utils.icon("temperature")} Temperature</>,
					points: dataTemp.map((item) => ({
						x: item.time.getTime(),
						y: item.value,
					})),
					gridYDistance: 1,
					limitsY: {
						max: Limits.maxWithOffset(2, true),
						min: Limits.minWithOffset(2, true),
					},
					labelY: (y) => y.toFixed(1),
				}}
				rightAxis={{
					title: <>Wind {utils.icon("wind-speed")}</>,
					type: "bar",
					barWidth: 15,
					points: dataWind.map((item) => ({
						x: item.time.getTime(),
						y: item.value + Math.random(),
					})),
					gridYDistance: 20,
					limitsY: {
						max: Limits.maxWithOffset(2, true),
						min: Limits.value(0),
					},
					labelY: (y) => y.toFixed(0),
				}}
				gridXDistance={1000 * 60 * 60 * 4}
				limitsX={{
					max: Limits.maxWithOffset(1000 * 60 * 60),
					min: Limits.minWithOffset(1000 * 60 * 60),
				}}
				labelX={(x) =>
					new Date(x).toLocaleTimeString(undefined, {
						timeStyle: "short",
					})
				}
			/>
			<Graph
				title={<></>}
				leftAxis={{
					title: (
						<>{utils.icon("leaf-temperature")} Leaf temperature</>
					),
					points: dataTemp.map((item) => ({
						x: item.time.getTime(),
						y: item.value,
					})),
					gridYDistance: 1,
					limitsY: {
						max: Limits.maxWithOffset(2, true),
						min: Limits.minWithOffset(2, true),
					},
					labelY: (y) => y.toFixed(1),
				}}
				rightAxis={{
					title: <>Precipation {utils.icon("precipation")}</>,
					type: "line",
					barWidth: 15,
					points: dataWind.map((item) => ({
						x: item.time.getTime(),
						y: item.value + Math.random(),
					})),
					gridYDistance: 20,
					limitsY: {
						max: Limits.maxWithOffset(2, true),
						min: Limits.value(0),
					},
					labelY: (y) => y.toFixed(1),
				}}
				gridXDistance={intervalToTimeSteps(interval)}
				limitsX={{
					max: Limits.maxWithOffset(1000 * 60 * 60),
					min: Limits.minWithOffset(1000 * 60 * 60),
				}}
				labelX={(x) =>
					new Date(x).toLocaleTimeString(undefined, {
						timeStyle: "short",
					})
				}
			/>
		</>
	);
}
