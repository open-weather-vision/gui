import { Link, useSearchParams } from "react-router-dom";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
// @ts-ignore
import ScrollToHashElement from "@cascadia-code/scroll-to-hash-element";
import Section, {
    SectionContainer,
} from "../../../../components/section/Section";
import WeatherElementType from "../../../../types/WeatherElementType";
import { useTranslation } from "react-multi-lang";
import useGlobalContext from "../../../../utils/useGlobalContext";
import { ReactComponent as LeftArrow } from "../../../../img/icons/arrow-left-2.svg";
import { ReactComponent as RightArrow } from "../../../../img/icons/arrow-right-2.svg";
import { ReactComponent as DownArrow } from "../../../../img/icons/down-arrow.svg";

import utils from "../../../../utils/utils";

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

export type ExtremesInterval =
    | {
          type: "month";
          month: number;
          year: number;
      }
    | {
          type: "year";
          year: number;
      }
    | { type: "alltime" };

export type Value = {
    value: number;
    time: Date;
    rank: number;
};

function generateRandomValues(): Value[] {
    const count = 10;
    const result: Value[] = [];
    let value = 30 + Math.random() * 12 - 6;
    let date = new Date();
    for (let i = 0; i < count; i++) {
        result[i] = {
            rank: i + 1,
            time: date,
            value,
        };
        date = new Date(date);
        date.setDate(date.getDate() - Math.ceil(Math.random() * 100));
        value -= Math.random() * 2;
    }
    return result;
}

export default function Page() {
    const t = useTranslation();
    const globals = useGlobalContext();
    const [searchParams, setSearchParams] = useSearchParams();

    const [interval, setInterval] = useState<ExtremesInterval>({
        type: searchParams.get("type") ?? "alltime",
        month:
            (searchParams.has("month") &&
                Number.parseInt(searchParams.get("month")!)) ||
            undefined,
        year:
            (searchParams.has("year") &&
                Number.parseInt(searchParams.get("year")!)) ||
            undefined,
    } as ExtremesInterval);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set("type", interval.type);
        if ("month" in interval && interval.month !== undefined)
            params.set("month", interval.month.toString());
        if ("year" in interval && interval.year !== undefined)
            params.set("year", interval.year.toString());
        setSearchParams(params);
    }, [interval]);

    const [values, setValues] = useState<Value[]>(generateRandomValues());
    const [element, setElement] = useState<WeatherElementType>("temperature");
    const [sensorId, setSensorId] = useState<string>("");

    return (
        <>
            <ScrollToHashElement
                behavior="instant"
                inline="center"
                block="center"
            />
            <SectionContainer>
                <div className={styles.extremes}>
                    <div className={styles.header}>
                        <div className={styles.label}>
                            {utils.iconComponent(element)}
                            {t(`sensor-view.${element}_label`)}
                            <DownArrow className={styles.icon} />
                        </div>
                        <div className={styles.intervalSelector}>
                            <div className={styles.previous}>
                                <LeftArrow />
                            </div>
                            <div className={styles.type}></div>
                            <div className={styles.date}></div>
                            <div className={styles.next}>
                                <RightArrow />
                            </div>
                        </div>
                    </div>
                    <div className={styles.body}>
                        {values.map((value) => {
                            return (
                                <div key={value.rank} className={styles.item}>
                                    <div className={styles.left}>
                                        <div className={styles.rank}>
                                            {value.rank}
                                        </div>
                                        <div className={styles.value}>
                                            <span>
                                                {value.value.toFixed(1)}
                                            </span>
                                            <span className={styles.unit}>
                                                {globals.units[element]}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.time}>
                                        <span>
                                            {value.time.toLocaleDateString(
                                                globals.language,
                                                { dateStyle: "short" }
                                            )}
                                        </span>
                                        {` `}
                                        {t("extremes.at")}
                                        {` `}
                                        <span>
                                            {value.time.toLocaleTimeString(
                                                globals.language,
                                                { timeStyle: "short" }
                                            )}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </SectionContainer>
        </>
    );
}
