import { SetStateAction, useState } from "react";
import { useTranslation } from "react-multi-lang";
import styles from "./IntervalSelector.module.css";
import { ReactComponent as LeftArrow } from "../../img/icons/arrow-left-2.svg";
import { ReactComponent as RightArrow } from "../../img/icons/arrow-right-2.svg";
import Select from "../select/Select";
import { useSearchParams } from "react-router-dom";

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

export type IntervalType = "day" | "week" | "month" | "year";
export const IntervalTypes: IntervalType[] = ["day", "week", "month", "year"];

export type Interval = {
    type: IntervalType;
    date: Date;
    begin: Date;
    end: Date;
};

function beginOfInterval(date: Date, interval: IntervalType) {
    const result = new Date(date);
    switch (interval) {
        case "day":
            break;
        case "week":
            const weekDay = (result.getDay() + 6) % 7;
            result.setDate(result.getDate() - weekDay + 1);
            break;
        case "month":
            result.setDate(1);
            result.setMonth(result.getMonth());
            break;
        case "year":
            result.setDate(1);
            result.setMonth(0);
            break;
    }
    return result;
}

function endOfInterval(date: Date, interval: IntervalType): Date {
    const result = new Date(date);
    switch (interval) {
        case "day":
            result.setDate(result.getDate() + 1);
            break;
        case "week":
            result.setDate(result.getDate() + 7);
            break;
        case "month":
            result.setMonth(result.getMonth() + 1);
            result.setDate(result.getDate() - 1);
            break;
        case "year":
            result.setFullYear(result.getFullYear() + 1);
            break;
    }
    return result;
}

export function IntervalFromDate(date: Date, type: IntervalType): Interval {
    const begin = beginOfInterval(date, type);
    const end = endOfInterval(begin, type);
    return {
        begin,
        end,
        date,
        type,
    };
}

export default function IntervalSelector(props: {
    interval: Interval;
    setInterval: React.Dispatch<SetStateAction<Interval>>;
}) {
    const t = useTranslation("interval");
    const [isIntervalTypeOpen, setIntervalTypeOpen] = useState(false);

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

    function selectInterval(type: IntervalType) {
        setIntervalTypeOpen(false);
        switchToInterval(type);
    }

    function switchToInterval(type: IntervalType) {
        let currentDate = props.interval.date;
        let begin, end;
        switch (type) {
            case "day":
                begin = beginOfInterval(currentDate, "day");
                if (begin > date()) {
                    currentDate = date();
                    begin = beginOfInterval(date(), "day");
                }
                end = endOfInterval(begin, "day");
                props.setInterval({
                    date: currentDate,
                    type: "day",
                    begin,
                    end,
                });
                break;
            case "week":
                begin = beginOfInterval(currentDate, "week");
                if (begin > date()) {
                    currentDate = date();
                    begin = beginOfInterval(date(), "week");
                }
                end = endOfInterval(begin, "week");
                props.setInterval({
                    date: currentDate,
                    type: "week",
                    begin,
                    end,
                });
                break;
            case "month":
                begin = beginOfInterval(currentDate, "month");
                if (begin > date()) {
                    currentDate = date();
                    begin = beginOfInterval(date(), "month");
                }
                end = endOfInterval(begin, "month");
                props.setInterval({
                    date: currentDate,
                    type: "month",
                    begin,
                    end,
                });
                break;
            case "year":
                begin = beginOfInterval(currentDate, "year");
                if (begin > date()) {
                    currentDate = date();
                    begin = beginOfInterval(date(), "year");
                }
                end = endOfInterval(begin, "year");
                props.setInterval({
                    date: currentDate,
                    type: "year",
                    begin,
                    end,
                });
                break;
        }
    }

    function previous() {
        const currentDate = props.interval.date;
        let begin, end;
        switch (props.interval.type) {
            case "day":
                currentDate.setDate(currentDate.getDate() - 1);
                begin = beginOfInterval(currentDate, "day");
                end = endOfInterval(begin, "day");
                break;
            case "week":
                currentDate.setDate(currentDate.getDate() - 7);
                begin = beginOfInterval(currentDate, "week");
                end = endOfInterval(begin, "week");
                break;
            case "month":
                currentDate.setMonth(currentDate.getMonth() - 1);
                begin = beginOfInterval(currentDate, "month");
                end = endOfInterval(begin, "month");
                break;
            case "year":
                currentDate.setFullYear(currentDate.getFullYear() - 1);
                begin = beginOfInterval(currentDate, "year");
                end = endOfInterval(begin, "year");
                break;
        }
        props.setInterval({ ...props.interval, begin, end, date: currentDate });
    }

    function next() {
        const currentDate = props.interval.date;
        let begin, end;
        switch (props.interval.type) {
            case "day":
                currentDate.setDate(currentDate.getDate() + 1);
                begin = beginOfInterval(currentDate, "day");
                end = endOfInterval(begin, "day");
                break;
            case "week":
                currentDate.setDate(currentDate.getDate() + 7);
                begin = beginOfInterval(currentDate, "week");
                end = endOfInterval(begin, "week");
                break;
            case "month":
                currentDate.setMonth(currentDate.getMonth() + 1);
                begin = beginOfInterval(currentDate, "month");
                end = endOfInterval(begin, "month");
                break;
            case "year":
                currentDate.setFullYear(currentDate.getFullYear() + 1);
                begin = beginOfInterval(currentDate, "year");
                end = endOfInterval(begin, "year");
                break;
        }
        props.setInterval({ ...props.interval, begin, end, date: currentDate });
    }

    // TODO: Fix bug!!!!
    function nextPossible() {
        const nextBegin = new Date(props.interval.begin);
        switch (props.interval.type) {
            case "day":
                nextBegin.setDate(props.interval.begin.getDate() + 1);
                break;
            case "week":
                nextBegin.setDate(props.interval.begin.getDate() + 7);
                break;
            case "month":
                nextBegin.setMonth(props.interval.begin.getMonth() + 1);
                break;
            case "year":
                nextBegin.setFullYear(props.interval.begin.getFullYear() + 1);
                break;
        }
        return nextBegin <= date();
    }

    return (
        <div className={styles.intervalSelector}>
            <div className={styles.leftArrowContainer} onClick={previous}>
                <LeftArrow />
            </div>
            <div
                className={styles.type}
                onClick={() => setIntervalTypeOpen(!isIntervalTypeOpen)}
            >
                {t(props.interval.type)}
                <div
                    className={`${styles.typeSelection} ${
                        isIntervalTypeOpen && styles.open
                    }`}
                >
                    {IntervalTypes.filter(
                        (type) => type != props.interval.type
                    ).map((interval) => {
                        return (
                            <div
                                key={interval}
                                className={styles.item}
                                onClick={() => selectInterval(interval)}
                            >
                                {t(interval)}
                            </div>
                        );
                    })}
                </div>
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
