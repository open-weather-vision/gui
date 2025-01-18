import { Link } from "react-router-dom";
import styles from "./page.module.css";
import IntervalSelector, {
    date,
    Interval,
} from "../../../../components/intervalSelector/IntervalSelector";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Graph from "../../../../components/graph-new/Graph";

export default function Page() {
    const [interval, setInterval] = useState<Interval>({
        type: "day",
        date: date(),
    });

    return (
        <>
            <IntervalSelector interval={interval} setInterval={setInterval} />
            <Graph
                sensor={{
                    elementType: "temperature",
                }}
                interval={interval}
            />
            <Graph
                sensor={{
                    elementType: "humidity",
                }}
                interval={interval}
            />
            <Graph
                sensor={{
                    elementType: "precipation",
                }}
                interval={interval}
            />
        </>
    );
}
