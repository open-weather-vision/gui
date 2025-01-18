import { Link } from "react-router-dom";
import styles from "./page.module.css";
import IntervalSelector, {
    date,
    Interval,
} from "../../../../components/intervalSelector/IntervalSelector";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Graph from "../../../../components/graph-new/Graph";
// @ts-ignore
import ScrollToHashElement from "@cascadia-code/scroll-to-hash-element";

export default function Page() {
    const [interval, setInterval] = useState<Interval>({
        type: "day",
        date: date(),
    });

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
