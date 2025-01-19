import { Link, useSearchParams } from "react-router-dom";
import styles from "./page.module.css";
import IntervalSelector, {
    date,
    Interval,
    IntervalFromDate,
    IntervalType,
} from "../../../../components/intervalSelector/IntervalSelector";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Graph from "../../../../components/graph-new/Graph";
// @ts-ignore
import ScrollToHashElement from "@cascadia-code/scroll-to-hash-element";

export default function Page() {
    const [searchParams, setSearchParams] = useSearchParams();

    const day =
        (searchParams.has("day") &&
            Number.parseInt(searchParams.get("day")!)) ||
        undefined;
    const month =
        (searchParams.has("month") &&
            Number.parseInt(searchParams.get("month")!) - 1) ||
        undefined;
    const year =
        (searchParams.has("year") &&
            Number.parseInt(searchParams.get("year")!)) ||
        undefined;
    const type = searchParams.get("type") ?? "day";
    const [interval, setInterval] = useState<Interval>(
        IntervalFromDate(date(year, month, day), type as IntervalType)
    );

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set("type", interval.type);
        params.set("day", interval.date.getDate().toString());
        params.set("month", (interval.date.getMonth() + 1).toString());
        params.set("year", interval.date.getFullYear().toString());
        setSearchParams(params);
    }, [interval]);

    return (
        <>
            <ScrollToHashElement
                behavior="instant"
                inline="center"
                block="center"
            />
            <IntervalSelector interval={interval} setInterval={setInterval} />
            <Graph
                sensor={{
                    elementType: "temperature",
                    sensorId: "tempOut",
                }}
                interval={interval}
            />
            <Graph
                sensor={{
                    elementType: "humidity",
                    sensorId: "humOut",
                }}
                interval={interval}
            />
            <Graph
                sensor={{
                    elementType: "precipation",
                    sensorId: "precipation",
                }}
                interval={interval}
            />
        </>
    );
}
