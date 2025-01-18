import { Link } from "react-router-dom";
import styles from "./Graph.module.css";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useWindowSize } from "@uidotdev/usehooks";
import { IntervalType } from "../intervalSelector/IntervalSelector";
import useGlobalContext from "../../utils/useGlobalContext";
import WeatherElementType from "../../types/WeatherElementType";
import { useTranslation } from "react-multi-lang";
import utils from "../../utils/utils";

export type GraphData = {
    time: Date;
    value: number;
};

export type SensorDescription = {
    sensorId?: string;
    elementType: WeatherElementType;
    location?: "inside" | "outside";
};

export type GraphProps = {
    interval: {
        type: IntervalType;
        date: Date;
    };
    sensor: SensorDescription;
};

function beginOfInterval(date: Date, interval: IntervalType) {
    const result = new Date(date);
    switch (interval) {
        case "day":
            break;
        case "week":
            const weekDay = result.getDay();
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
    console.log(result);
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

function daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate() - 1;
}

async function loadPoints(
    sensorId: string,
    begin: Date,
    interval: IntervalType
): Promise<GraphData[]> {
    let pointCount: number;
    let secondsPerPoint: number;
    switch (interval) {
        case "day":
            pointCount = 10;
            secondsPerPoint = 86400 / pointCount;
            break;
        case "week":
            pointCount = 100;
            secondsPerPoint = (7 * 60 * 60 * 24) / pointCount;
            break;
        case "month":
            pointCount = 100;
            secondsPerPoint =
                (daysInMonth(begin.getMonth() + 1, begin.getFullYear()) *
                    60 *
                    60 *
                    24) /
                pointCount;
            break;
        case "year":
            pointCount = 100;
            secondsPerPoint = (365 * 60 * 60 * 24) / pointCount;
            break;
    }
    const result: GraphData[] = [];
    let time = new Date(begin);
    let valueBefore = 0;
    for (let i = 0; i <= pointCount; i++) {
        result[i] = {
            time,
            value: -2.5 + Math.random() * 5 + valueBefore,
        };
        valueBefore = result[i].value;

        time = new Date(time);
        time.setSeconds(time.getSeconds() + secondsPerPoint);
    }
    return result;
}

export default function Graph({ sensor, interval }: GraphProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const size = useWindowSize();
    const globals = useGlobalContext();
    const [data, setData] = useState<GraphData[]>([]);
    const t = useTranslation("sensor-view");

    async function load() {
        const begin = beginOfInterval(interval.date, interval.type);
        setData(await loadPoints(sensor.sensorId!, begin, interval.type));
    }

    useEffect(() => {
        load();
    }, [interval]);

    useEffect(() => {
        // Declare the chart dimensions and margins.
        const width = chartContainerRef.current!.offsetWidth;
        const height = Math.min(width, Math.min(500, window.innerHeight * 0.6));
        const marginTop = 20;
        const marginRight = 40;
        const marginBottom = 30;
        const marginLeft = 40;

        // Declare the x (horizontal position) scale.
        const begin = beginOfInterval(interval.date, interval.type);
        const end = endOfInterval(begin, interval.type);
        const x = d3
            .scaleTime()
            .domain([begin, end])
            .range([marginLeft, width - marginRight]);

        // Declare the y (vertical position) scale.
        const values = data.map((data) => data.value);
        const extent = d3.extent(values) as [number, number];
        extent[0] -= (extent[1] - extent[0]) * 0.1;
        extent[1] += (extent[1] - extent[0]) * 0.1;
        const y = d3
            .scaleLinear()
            .domain(extent)
            .range([height - marginBottom, marginTop]);

        // Append to svg
        d3.select(svgRef.current).selectAll("*").remove();
        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

        // Add the x-axis.
        let xAxis;
        let formatter: Intl.DateTimeFormat;
        switch (interval.type) {
            case "year":
                formatter = new Intl.DateTimeFormat(globals.language, {
                    month: width > 900 ? "long" : "short",
                });
                xAxis = d3.axisBottom(x).ticks(12);
                break;
            case "month":
                formatter = new Intl.DateTimeFormat(globals.language, {
                    day: "numeric",
                    month: "numeric",
                });
                xAxis = d3.axisBottom(x).ticks(30);
                break;
            case "week":
                formatter = new Intl.DateTimeFormat(globals.language, {
                    day: "numeric",
                    weekday: "short",
                });
                xAxis = d3.axisBottom(x).ticks(7);
                break;
            case "day":
            default:
                formatter = new Intl.DateTimeFormat(globals.language, {
                    hour: "2-digit",
                });
                xAxis = d3
                    .axisBottom(x)
                    .ticks(width > 1400 ? 24 : width > 800 ? 9 : 6);
        }
        xAxis.tickFormat((d) => formatter.format(d as any));
        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(xAxis);

        // Add the y-axis.
        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y));

        // Add the curve.
        const line = d3
            .line(
                (d: GraphData) => x(d.time),
                (d: GraphData) => y(d.value)
            )
            .curve(d3.curveNatural);

        const area = d3
            .area(
                (d: GraphData) => x(d.time),
                (d: GraphData) => y(d.value),
                (d: GraphData) => y(extent[0])
            )
            .curve(d3.curveNatural);

        svg.append("path")
            .datum(data)
            .attr("fill", "var(--accentColor)")
            .attr("stroke", "var(--color2)")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", area);
    }, [data, size]);

    return (
        <div className={styles.chart}>
            <div className={styles.header}>
                {utils.iconComponent(sensor.elementType)}
                {t(`${sensor.elementType}_label`)}
            </div>
            <div className={styles.chartContainer} ref={chartContainerRef}>
                <svg ref={svgRef}></svg>
            </div>
        </div>
    );
}
