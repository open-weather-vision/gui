import { SetStateAction } from "react";
import { useTranslation } from "react-multi-lang";
import styles from "./IntervalSelector.module.css";
import { ReactComponent as LeftArrow } from "../../img/arrow-left-2.svg";
import { ReactComponent as RightArrow } from "../../img/arrow-right-2.svg";

function weekNumber(date: Date) {
	// Copy date so don't modify original
	date = new Date(
		Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
	);
	// Set to nearest Thursday: current date + 4 - current day number
	// Make Sunday's day number 7
	date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
	// Get first day of year
	var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
	// Calculate full weeks to nearest Thursday
	var weekNo = Math.ceil(
		((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
	);
	// Return array of year and week number
	return weekNo;
}

function month(t: (path: string) => string, date: Date) {
	return [
		t("jan"),
		t("feb"),
		t("mar"),
		t("apr"),
		t("may"),
		t("jun"),
		t("jul"),
		t("aug"),
		t("sep"),
		t("oct"),
		t("nov"),
		t("dec"),
	][date.getMonth()];
}

export function date(year?: number, month?: number, day?: number) {
	const date = new Date();
	date.setHours(0, 0, 0, 0);
	if (year) {
		date.setFullYear(year);
	}

	if (month) {
		date.setMonth(month + 1);
	}

	if (day) {
		date.setDate(day);
	}

	return date;
}

export type Interval = {
	type: "day" | "week" | "month" | "year";
	date: Date;
};

export default function IntervalSelector(props: {
	interval: Interval;
	setInterval: React.Dispatch<SetStateAction<Interval>>;
}) {
	const t = useTranslation("interval");

	function dateToString() {
		const currentDate = props.interval.date;
		let result = "";
		switch (props.interval.type) {
			case "day":
				if (currentDate.getTime() === date().getTime()) {
					result = t("today");
				} else {
					result = currentDate.toLocaleDateString(undefined, {
						dateStyle: "short",
					});
				}
				break;
			case "week":
				result = `${t("weekPrefix")} ${weekNumber(
					currentDate
				)} (${currentDate.getFullYear()})`;
				break;
			case "month":
				result = `${month(
					t,
					currentDate
				)} ${currentDate.getFullYear()}`;
				break;
			case "year":
				result = `${currentDate.getFullYear()}`;
		}
		return result;
	}

	function toggle() {
		const currentDate = props.interval.date;
		switch (props.interval.type) {
			case "day":
				props.setInterval({ date: currentDate, type: "week" });
				break;
			case "week":
				props.setInterval({ date: currentDate, type: "month" });
				break;
			case "month":
				props.setInterval({ date: currentDate, type: "year" });
				break;
			case "year":
				props.setInterval({ date: currentDate, type: "day" });
				break;
		}
	}

	function previous() {
		const currentDate = props.interval.date;
		switch (props.interval.type) {
			case "day":
				currentDate.setDate(currentDate.getDate() - 1);
				break;
			case "week":
				currentDate.setDate(currentDate.getDate() - 7);
				break;
			case "month":
				currentDate.setMonth(currentDate.getMonth() - 1);
				break;
			case "year":
				currentDate.setFullYear(currentDate.getFullYear() - 1);
				break;
		}
		props.setInterval({ ...props.interval, date: currentDate });
	}

	function next() {
		const currentDate = props.interval.date;
		switch (props.interval.type) {
			case "day":
				currentDate.setDate(currentDate.getDate() + 1);
				break;
			case "week":
				currentDate.setDate(currentDate.getDate() + 7);
				break;
			case "month":
				currentDate.setMonth(currentDate.getMonth() + 1);
				break;
			case "year":
				currentDate.setFullYear(currentDate.getFullYear() + 1);
				break;
		}
		props.setInterval({ ...props.interval, date: currentDate });
	}

	function nextPossible() {
		const currentDate = props.interval.date;
		const nextDate = new Date(currentDate);
		switch (props.interval.type) {
			case "day":
				nextDate.setDate(currentDate.getDate() + 1);
				break;
			case "week":
				nextDate.setDate(currentDate.getDate() + 7);
				break;
			case "month":
				nextDate.setMonth(currentDate.getMonth() + 1);
				break;
			case "year":
				nextDate.setFullYear(currentDate.getFullYear() + 1);
				break;
		}
		return nextDate.getTime() <= date().getTime();
	}

	return (
		<div className={styles.intervalSelector}>
			<div className={styles.leftArrowContainer} onClick={previous}>
				<LeftArrow />
			</div>
			<div className={styles.type} onClick={toggle}>
				{t(props.interval.type)}
			</div>
			<div className={styles.date}>{dateToString()}</div>
			<div
				className={`${styles.rightArrowContainer} ${
					nextPossible() ? "" : styles.disabled
				}`}
				onClick={next}
			>
				<RightArrow />
			</div>
		</div>
	);
}
