import { Link } from "react-router-dom";
import styles from "./Graph.module.css";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useWindowSize } from "@uidotdev/usehooks";
import { Interval, IntervalType } from "../intervalSelector/IntervalSelector";
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
    interval: Interval;
    sensor: SensorDescription;
};

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
            pointCount = 24 * 2;
            secondsPerPoint = 86400 / pointCount;
            break;
        case "week":
            pointCount = 7 * 24;
            secondsPerPoint = (7 * 60 * 60 * 24) / pointCount;
            break;
        case "month":
            pointCount =
                daysInMonth(begin.getMonth() + 1, begin.getFullYear()) * 6;
            secondsPerPoint =
                (daysInMonth(begin.getMonth() + 1, begin.getFullYear()) *
                    60 *
                    60 *
                    24) /
                pointCount;
            break;
        case "year":
            pointCount = 365;
            secondsPerPoint = (365 * 60 * 60 * 24) / pointCount;
            break;
    }
    const result: GraphData[] = [];
    let time = new Date(begin);
    let valueBefore = 0;
    for (let i = 0; i <= pointCount; i++) {
        result[i] = {
            time,
            value: Math.max(
                -20,
                Math.min(40, -2.5 + Math.random() * 5 + valueBefore)
            ),
        };
        valueBefore = result[i].value;

        time = new Date(time);
        time.setSeconds(time.getSeconds() + secondsPerPoint);
        if (time > new Date()) break;
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
        setData(
            await loadPoints(sensor.sensorId!, interval.begin, interval.type)
        );
    }

    useEffect(() => {
        load();
    }, [interval]);

    useEffect(() => {
        // Declare the chart dimensions and margins.
        const width = chartContainerRef.current!.offsetWidth;
        const height = Math.min(width, Math.min(500, window.innerHeight * 0.6));
        const marginTop = width > 500 ? 20 : 10;
        const marginRight = width > 500 ? 50 : 20;
        const marginBottom = width > 500 ? 30 : 30;
        const marginLeft = width > 500 ? 40 : 40;

        // Declare the x (horizontal position) scale.
        const x = d3
            .scaleTime()
            .domain([interval.begin, interval.end])
            .range([marginLeft, width - marginRight]);

        // Declare the y (vertical position) scale.
        const values = data.map((data) => data.value);
        const extent = d3.extent(values) as [number, number];
        extent[0] = Math.floor(extent[0] - (extent[1] - extent[0]) * 0.1);
        extent[1] = Math.ceil(extent[1] + (extent[1] - extent[0]) * 0.1);
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

        // Append graphs
        const defs = svg.append("defs");

        const gradient = defs
            .append("linearGradient")
            .attr("id", `colorGradient-${sensor.sensorId}`)
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");

        for (
            let i = 0;
            i < data.length;
            i += Math.max(1, Math.round(data.length / 10))
        ) {
            gradient
                .append("stop")
                .attr("offset", `${(i * 100) / (data.length - 1)}%`)
                .attr(
                    "stop-color",
                    utils.valueToColor(
                        data[i].value,
                        globals.theme,
                        sensor.elementType
                    )
                )
                .attr("stop-opacity", 1);
        }

        // Add the x-axis.
        let xAxis = d3.axisBottom(x);
        let formatter: Intl.DateTimeFormat;
        switch (interval.type) {
            case "year":
                formatter = new Intl.DateTimeFormat(globals.language, {
                    month: width > 900 ? "long" : "short",
                });
                xAxis.ticks(
                    width > 700 ? 12 : width > 500 ? 9 : width > 300 ? 6 : 3
                );
                break;
            case "month":
                formatter = new Intl.DateTimeFormat(globals.language, {
                    day: "numeric",
                    month: "numeric",
                });
                const days = daysInMonth(
                    interval.date.getMonth() + 1,
                    interval.date.getFullYear()
                );
                xAxis.ticks(
                    width > 1400
                        ? days
                        : width > 1000
                        ? Math.round(days / 2)
                        : width > 700
                        ? Math.round(days / 3)
                        : Math.round(days / 4)
                );
                break;
            case "week":
                formatter = new Intl.DateTimeFormat(globals.language, {
                    day: "numeric",
                    weekday: "short",
                });
                xAxis.ticks(width > 450 ? 7 : 3);
                break;
            case "day":
            default:
                formatter = new Intl.DateTimeFormat(globals.language, {
                    hour: "2-digit",
                });
                xAxis.ticks(
                    width > 1400 ? 24 : width > 800 ? 9 : width > 300 ? 3 : 2
                );
        }
        xAxis.tickFormat((d) => formatter.format(d as any));
        xAxis.tickSize(12);
        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .attr("class", styles.xAxis)
            .call(xAxis);

        // Add the y-axis.
        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .attr("class", styles.yAxis)
            .call(
                d3
                    .axisLeft(y)
                    .tickSize(12)
                    .tickValues(
                        y.ticks().filter((tick) => Number.isInteger(tick))
                    )
                    .tickFormat(d3.format("d"))
            );

        // Add the curve

        if (sensor.elementType === "precipation") {
            if (data.length === 0) return;
            const lengthFactor =
                (data[data.length - 1].time.getTime() -
                    interval.begin.getTime()) /
                (interval.end.getTime() - interval.begin.getTime());
            const barWidth = (0.5 * width) / (data.length / lengthFactor);
            svg.selectAll("mybar")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", function (d: GraphData) {
                    return x(d.time);
                })
                .attr("y", function (d: GraphData) {
                    return y(d.value);
                })
                .attr("width", function (d, index) {
                    if (
                        index === 0 ||
                        (lengthFactor === 1 && index === data.length - 1)
                    ) {
                        return 0.5 * barWidth;
                    }
                    return barWidth;
                })
                .attr("height", function (d) {
                    return height - y(d.value);
                })
                .attr("transform", function (d, index) {
                    if (index === 0) {
                        return `translate(${0},${-marginBottom})`;
                    }
                    return `translate(${-0.5 * barWidth},${-marginBottom})`;
                })
                .attr(
                    "fill",
                    utils.valueToColor(
                        undefined,
                        globals.theme,
                        sensor.elementType
                    )
                );
        } else {
            svg.append("path")
                .datum(data)
                .attr("fill", `url(#colorGradient-${sensor.sensorId})`)
                .attr("stroke", "var(--color2)")
                .attr("stroke-width", 1.5)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("class", styles.line)
                .attr(
                    "d",
                    d3
                        .area(
                            (d: GraphData) => x(d.time),
                            (d: GraphData) => y(d.value),
                            (d: GraphData) => y(extent[0])
                        )
                        .curve(d3.curveNatural)
                );
        }
    }, [data, size]);

    return (
        <div className={styles.chart} id={sensor.sensorId}>
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
