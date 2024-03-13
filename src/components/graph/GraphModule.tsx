import {
	CSSProperties,
	LegacyRef,
	MutableRefObject,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import styles from "./GraphModule.module.css";
import merge from "deepmerge";

export const Limits = {
	min: (round?: boolean) => (values: number[]) =>
		round ? Math.round(Math.min(...values)) : Math.min(...values),
	max: (round?: boolean) => (values: number[]) =>
		round ? Math.round(Math.max(...values)) : Math.max(...values),
	minWithOffset: (offset: number, round?: boolean) => (values: number[]) =>
		(round ? Math.round(Math.min(...values)) : Math.min(...values)) -
		offset,
	maxWithOffset: (offset: number, round?: boolean) => (values: number[]) =>
		(round ? Math.round(Math.max(...values)) : Math.max(...values)) +
		offset,
};

export type LimitsConfig = (values: number[]) => number;

export type Data = {
	points: { x: number; y: number }[];
	yLabel: (y: number) => string;
	type: "bar" | "line";
	limitsY: [LimitsConfig, LimitsConfig];
};

export type GraphConfig = {
	title: string;
	icon: any;
	data: {
		left: Data;
		right: Data;
	};
};

export type GraphProps = {
	width?: CSSProperties["width"];
	height?: CSSProperties["height"];
	padding?: CSSProperties["padding"];
	margin?: CSSProperties["margin"];
	boxSizing?: CSSProperties["boxSizing"];
	background?: CSSProperties["background"];
	ratio?: number;

	graphs: GraphConfig[];

	x: number[];
	xLabel: string[] | ((x: number) => string);
	limitsX: [LimitsConfig, LimitsConfig];
};

type GraphObject = GraphConfig & {
	width: number;
	height: number;
	x: number;
	y: number;
	data: {
		left: {
			yLimit: {
				min: number;
				max: number;
			};
		};
		right: {
			yLimit: {
				min: number;
				max: number;
			};
		};
	};
};

export default function Graph(props: GraphProps) {
	const reference = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const xLimit = {
		min: props.limitsX[0](props.x),
		max: props.limitsX[1](props.x),
	};
	const graphMargin = 50;

	function graphHeight() {
		return (
			(height - graphMargin * props.graphs.length) / props.graphs.length
		);
	}

	const graphs: GraphObject[] = props.graphs.map((config, index) => {
		const height = graphHeight();
		return merge(
			{
				height,
				width: width,
				x: 0,
				y: index * height - 1 + (index + 1) * graphMargin,
				data: {
					left: {
						yLimit: {
							min: config.data.left.limitsY[0](
								config.data.left.points.map((point) => point.y)
							),
							max: config.data.left.limitsY[1](
								config.data.left.points.map((point) => point.y)
							),
						},
					},
					right: {
						yLimit: {
							min: config.data.right.limitsY[0](
								config.data.right.points.map((point) => point.y)
							),
							max: config.data.right.limitsY[1](
								config.data.right.points.map((point) => point.y)
							),
						},
					},
				},
			},
			config
		);
	});

	useEffect(() => {
		if (reference?.current) {
			new ResizeObserver((entries) => {
				if (reference?.current) {
					const rect = entries[0];
					setWidth(rect.contentRect.width);
					if (props.ratio) {
						const targetHeight = `${
							rect.contentRect.width * props.ratio
						}px`;
						if (reference.current!.style.height !== targetHeight) {
							setTimeout(() => {
								reference.current!.style.height = targetHeight;
							});
							setHeight(rect.contentRect.width * props.ratio);
						}
					} else {
						setHeight(rect.contentRect.height);
					}
				}
			}).observe(reference.current);
		}
	}, [reference]);

	function yGrid(graph: GraphObject, graphIndex: number) {
		const height = graph.data.left.yLimit.max - graph.data.left.yLimit.min;
		const cellHeight = Math.max(Math.round(height / 7), 1);
		const cellsY = [];
		for (let i = 0; i <= height; i += cellHeight) {
			cellsY.push(i + graph.data.left.yLimit.min);
		}
		return (
			<g>
				{cellsY.map((y, index) => {
					let yPos = yPosInGraph(graph, graph.data.left.yLimit, y);
					return (
						<g>
							{index + 1 != cellsY.length && (
								<text
									x={4}
									y={yPos - 6}
									style={{
										fontFamily: `monospace`,
									}}
									fill="white"
									fontSize={"0.75em"}
								>
									{graph.data.left.yLabel(y)}
								</text>
							)}
							<line
								x1={0}
								y1={yPos}
								x2={graph.width}
								y2={yPos}
								strokeWidth={1}
								opacity={0.075}
								stroke="white"
							/>
						</g>
					);
				})}
				<line
					x1="0"
					y1={graph.height}
					x2={graph.width}
					y2={graph.height}
					strokeWidth={1}
					stroke="rgba(255, 255, 255, 0.5"
				/>
				<line
					x1="0"
					y1={0}
					x2={graph.width}
					y2={0}
					strokeWidth={1}
					stroke="rgba(255, 255, 255, 0.5"
				/>
			</g>
		);
	}

	function xGrid(graph: GraphObject, graphIndex: number) {
		const width = xLimit.max - xLimit.min;
		const cellWidth = Math.floor(width / 8);
		const cellsX = [];
		for (let i = cellWidth; i < width; i += cellWidth) {
			cellsX.push(i + xLimit.min);
		}
		return (
			<g>
				{cellsX.map((x, index) => {
					let xPos = xPosInGraph(graph, x);
					return (
						<line
							x1={xPos}
							y1={0}
							x2={xPos}
							y2={graph.height}
							strokeWidth={1}
							opacity={0.075}
							stroke="white"
						/>
					);
				})}
				{props.x.map((x, index) => {
					let xPos = xPosInGraph(graph, x);

					const first = index === 0;
					const last = index === props.x.length - 1;
					if (first) xPos += 1;
					else if (last) xPos -= 1;

					return (
						<line
							x1={xPos}
							y1={0}
							x2={xPos}
							y2={graph.height}
							strokeWidth={1}
							stroke="white"
							opacity={first || last ? 0 : 0.5}
							strokeDasharray={"5, 5"}
						/>
					);
				})}
			</g>
		);
	}

	function xPosInGraph(graph: GraphObject, x: number) {
		return ((x - xLimit.min) / (xLimit.max - xLimit.min)) * graph.width;
	}

	function yPosInGraph(
		graph: GraphObject,
		yLimit: { min: number; max: number },
		y: number
	) {
		return (
			graph.height -
			((y - yLimit.min) / (yLimit.max - yLimit.min)) * graph.height
		);
	}

	function line(graph: GraphObject, graphIndex: number) {
		return (
			<g>
				{graph.data.left.points.map((point, index) => {
					const xPos1 = xPosInGraph(graph, point.x);
					const yPos1 = yPosInGraph(
						graph,
						graph.data.left.yLimit,
						point.y
					);

					if (index + 1 === graph.data.left.points.length)
						return (
							<circle cx={xPos1} cy={yPos1} fill="white" r={5} />
						);

					const nextPoint = graph.data.left.points[index + 1];

					const xPos2 = xPosInGraph(graph, nextPoint.x);
					const yPos2 = yPosInGraph(
						graph,
						graph.data.left.yLimit,
						nextPoint.y
					);
					return (
						<g>
							<circle cx={xPos1} cy={yPos1} fill="white" r={5} />
							<line
								x1={xPos1}
								y1={yPos1}
								x2={xPos2}
								y2={yPos2}
								strokeWidth={1}
								stroke="white"
								opacity={0.8}
							/>
						</g>
					);
				})}
			</g>
		);
	}

	function graph(graph: GraphObject, graphIndex: number) {
		const headingWidth = graph.title.length * 9.5 + 60;
		const headingHeight = 40;
		return (
			<g
				transform={`translate(${graph.x}, ${graph.y})`}
				className={styles.test}
			>
				<rect
					width={graph.width}
					height={graph.height}
					x={0}
					y={0}
					fill={"rgba(255,255,255, 0.02)"}
					className={styles.graphBox}
				/>
				{xGrid(graph, graphIndex)}
				{yGrid(graph, graphIndex)}
				{line(graph, graphIndex)}

				<g
					transform={`translate(${
						graph.width / 2 - headingWidth / 2
					} ${-headingHeight / 2})`}
				>
					<rect
						fill="#28324B"
						width={headingWidth}
						height={headingHeight}
						strokeWidth={2}
						stroke={"#28324B"}
						rx={5}
						className={styles.title}
					/>
					<text
						fill="white"
						fontSize={"1rem"}
						x={headingWidth / 2 + 13}
						y={headingHeight / 2 + 5.5}
						textAnchor="middle"
					>
						{graph.title}
					</text>

					<g
						transform={`translate(${15} ${
							headingHeight / 2 - 7.5
						})`}
					>
						{graph.icon}
					</g>
				</g>
			</g>
		);
	}

	return (
		<div
			ref={reference}
			style={{
				width: props.width || "100px",
				height: props.height || "100px",
				margin: props.margin || undefined,
				padding: props.padding || undefined,
				boxSizing: props.boxSizing || undefined,
				background: props.background || undefined,
			}}
			className={styles.graph}
		>
			<svg
				width={width}
				height={height}
				preserveAspectRatio="yes"
				overflow={"visible"}
			>
				<title id="title">A line chart showing some information</title>
				{graphs.map((graphObj, index) => graph(graphObj, index))}
			</svg>
		</div>
	);
}
