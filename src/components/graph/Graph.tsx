import { useEffect, useRef, useState } from "react";
import styles from "./Graph.module.css";
import { Limits } from "./Limits";
import WeatherElementType from "../../types/WeatherElementType";
import utils from "../../utils/utils";

/** The x grid of the graph. */
function XGrid({
	gridSize,
	width,
	height,
}: {
	gridSize: number;
	width: number;
	height: number;
}) {
	if (gridSize === 0) return <></>;

	const xPos = [];
	for (let x = 0; x <= width + 3; x += gridSize) {
		xPos.push(x);
	}

	return (
		<g className={styles.gridX}>
			{xPos.map((x) => (
				<line
					x1={x}
					y1={0}
					x2={x}
					y2={height}
					stroke="white"
					strokeWidth={1}
					className={styles.line}
				/>
			))}
		</g>
	);
}

/** The y grid of the graph. */
function YGrid({
	gridSize,
	width,
	height,
}: {
	gridSize: number;
	width: number;
	height: number;
}) {
	if (gridSize === 0) return <></>;

	const lines = [];
	for (let y = 0; y <= height + 3; y += gridSize) {
		lines.push(y);
	}

	return (
		<g className={styles.gridY}>
			{lines.map((y, index) => (
				<line
					className={styles.line}
					x1={0}
					y1={y}
					x2={width}
					y2={y}
					stroke="white"
					strokeWidth={1}
				/>
			))}
		</g>
	);
}

/** The x axis of the graph. */
function AxisX({
	gridSize,
	width,
	height,
	limitsX,
	gridXUnits,
	labelX,
}: {
	gridSize: number;
	width: number;
	height: number;
	limitsX: { min: number; max: number };
	gridXUnits: number;
	labelX: (x: number) => string;
}) {
	if (gridSize === 0) return <></>;

	const steps = [];
	for (
		let x = gridSize, u = limitsX.min + gridXUnits;
		x <= width + 3;
		x += gridSize, u += gridXUnits
	) {
		steps.push({
			x,
			u,
		});
	}

	return (
		<g>
			{steps.map((step, index) => {
				if (index === steps.length - 1) {
					return <></>;
				}
				return (
					<text
						key={index}
						x={step.x}
						y={height / 2 + 5}
						fill="white"
						textAnchor="middle"
					>
						{labelX(step.u)}
					</text>
				);
			})}
		</g>
	);
}

/** The y axis(es) of the graph. */
function AxisY({
	gridSize,
	width,
	height,
	leftAxis,
	rightAxis,
	leftAxisLimitsY,
	rightAxisLimitsY,
}: {
	gridSize: number;
	width: number;
	height: number;
	leftAxis: AxisProps;
	rightAxis: AxisProps;
	leftAxisLimitsY: { min: number; max: number };
	rightAxisLimitsY: { min: number; max: number };
}) {
	if (gridSize === 0) return <></>;

	const lines = [];
	for (
		let y = 0, ul = leftAxisLimitsY.max, ur = rightAxisLimitsY.max;
		y <= height + 3;
		y += gridSize,
			ul -= leftAxis.gridYDistance!,
			ur -= rightAxis.gridYDistance!
	) {
		lines.push({
			y,
			ul,
			ur,
		});
	}
	return (
		<g className={styles.axisY}>
			{lines.map((line, index) => (
				<g key={index}>
					<text
						x={5}
						y={line.y - 5}
						fill="white"
						className={`${styles.label} ${styles.left}`}
					>
						{leftAxis.labelY(line.ul)}
					</text>
					<text
						x={width - 5}
						y={line.y - 5}
						textAnchor="end"
						fill="white"
						className={`${styles.label} ${styles.right}`}
					>
						{rightAxis.labelY(line.ur)}
					</text>
				</g>
			))}
		</g>
	);
}

/** The data point's including the tooltips. */
function Points({
	type,
	processedPoints,
	height,
	width,
	barWidth,
}: {
	type: "bar" | "line";
	processedPoints: {
		x: number;
		y: number;
		xPos: number;
		yPos: number;
		labelY: string;
		last: boolean;
		first: boolean;
	}[];
	height: number;
	width: number;
	barWidth?: number;
}) {
	const [tooltipActiveIndex, setTooltipActiveIndex] = useState<number | null>(
		null
	);

	if (type === "line" || !type) {
		return (
			<g>
				<g className={styles.lineCurve}>
					{processedPoints.map((point, index) => {
						let nextPoint = point.last
							? null
							: processedPoints[index + 1];

						return (
							<g
								key={index}
								onMouseLeave={() =>
									index === tooltipActiveIndex &&
									setTooltipActiveIndex(null)
								}
							>
								<circle
									cx={point.xPos}
									cy={point.yPos}
									r={Math.min(
										40,
										((nextPoint?.xPos || Infinity) -
											point.xPos) *
											0.5
									)}
									fill={"transparent"}
									className={styles.interactiveCircle}
									onMouseEnter={() => {
										setTooltipActiveIndex(index);
									}}
									onClick={() => {
										setTooltipActiveIndex(index);
									}}
								/>
								<foreignObject
									x={point.xPos - 25}
									y={point.yPos - 35}
									width={50}
									height={25}
								>
									<div
										className={`${styles.tooltip} ${
											tooltipActiveIndex === index
												? styles.active
												: ""
										}`}
									>
										{point.labelY}
									</div>
								</foreignObject>
							</g>
						);
					})}
				</g>
			</g>
		);
	} else {
		return (
			<g className={styles.barCurve}>
				{processedPoints.map((point, index) => {
					let nextPoint = point.last
						? null
						: processedPoints[index + 1];
					let previousPoint = point.first
						? null
						: processedPoints[index - 1];

					const distanceXToLeft = previousPoint
						? point.xPos - previousPoint?.xPos
						: Infinity;
					const distanceXToRight = nextPoint
						? nextPoint?.xPos - point.xPos
						: Infinity;
					return (
						<g
							key={index}
							onMouseLeave={() =>
								index === tooltipActiveIndex &&
								setTooltipActiveIndex(null)
							}
						>
							<rect
								x={point.xPos - distanceXToLeft / 2}
								y={point.yPos}
								width={
									distanceXToRight / 2 + distanceXToLeft / 2
								}
								height={height - point.yPos}
								fill="white"
								style={{ opacity: 0 }}
								className={styles.interactiveBar}
								onMouseEnter={() =>
									setTooltipActiveIndex(index)
								}
								onClick={() => setTooltipActiveIndex(index)}
							/>
							<foreignObject
								x={point.xPos - 25}
								y={point.yPos - 35}
								width={50}
								height={25}
							>
								<div
									className={`${styles.tooltip} ${
										tooltipActiveIndex === index
											? styles.active
											: ""
									}`}
								>
									{point.labelY}
								</div>
							</foreignObject>
						</g>
					);
				})}
			</g>
		);
	}
}

function Line({
	type,
	processedPoints,
	height,
	width,
	barWidth,
}: {
	type: "bar" | "line";
	processedPoints: {
		x: number;
		y: number;
		xPos: number;
		yPos: number;
		labelY: string;
		last: boolean;
		first: boolean;
	}[];
	height: number;
	width: number;
	barWidth?: number;
}) {
	if (type === "line" || !type) {
		return (
			<g>
				<g className={styles.lineCurve}>
					{processedPoints.map((point, index) => {
						let nextPoint = point.last
							? null
							: processedPoints[index + 1];
						let previousPoint = point.first
							? null
							: processedPoints[index - 1];

						return (
							<g key={index}>
								{!point.last && (
									<line
										stroke="white"
										strokeWidth={2}
										x1={point.xPos}
										y1={point.yPos}
										x2={nextPoint?.xPos}
										y2={nextPoint?.yPos}
										className={styles.line}
									/>
								)}
								<circle
									cx={point.xPos}
									cy={point.yPos}
									r={5}
									fill="white"
									className={styles.circle}
								/>
							</g>
						);
					})}
				</g>
			</g>
		);
	} else {
		return (
			<g className={styles.barCurve}>
				{processedPoints.map((point, index) => {
					let nextPoint = point.last
						? null
						: processedPoints[index + 1];
					let previousPoint = point.first
						? null
						: processedPoints[index - 1];

					const distanceXToLeft = previousPoint
						? point.xPos - previousPoint?.xPos
						: Infinity;
					const distanceXToRight = nextPoint
						? nextPoint?.xPos - point.xPos
						: Infinity;

					const computedBarWidth = Math.min(
						Math.log(((barWidth || 1) / 100) * width) * 3,
						distanceXToLeft / 2,
						distanceXToRight / 2
					);
					return (
						<g key={index}>
							<rect
								x={point.xPos - computedBarWidth / 2}
								y={point.yPos}
								width={computedBarWidth}
								height={height - point.yPos}
								fill="white"
								className={styles.bar}
							/>
						</g>
					);
				})}
			</g>
		);
	}
}

export type AxisProps = {
	/** The corresponding sensor's id */
	sensorId?: string;

	/** The corresponding sensor's element type */
	elementType?: WeatherElementType;

	/** Short description of the sensor */
	label?: string;

	/** The datapoints. */
	points: { x: number; y: number }[];

	/** Configures the textual presentation of the axis data. */
	labelY: (y: number) => string;

	/** Configures the distance (using the unit of the data) between a grid line on the y axis. */
	gridYDistance?: number;

	/** @hidden Used internally to calculate the y pos of a point in the graph. */
	yPos?: (y: number) => number;

	/**  @hidden Used internally to calculate the x pos of a point in the graph. */
	xPos?: (y: number) => number;

	/** Configures the graph type. */
	type?: "bar" | "line";

	/** If the graph is of type `"bar"` you can confiugre the bar width here. It changes automatically based on the device width. */
	barWidth?: number;

	/** Configures the y axis range. */
	limitsY?: {
		max?: (values: number[]) => number;
		min?: (values: number[]) => number;
	};
};

export type GraphProps = {
	/** The properties of the left axis. */
	leftAxis: AxisProps;

	/** The properties of the right axis. */
	rightAxis: AxisProps;

	/** Configures the distance (using the unit of the data) between a grid line on the x axis. */
	gridXDistance?: number;

	/** Configures the x axis range. */
	limitsX?: {
		max?: (values: number[]) => number;
		min?: (values: number[]) => number;
	};

	/** Configures the distance (using the unit of the data) between a grid line on the y axis. */
	gridYDistance?: number;

	/** Configures the y axis range for the left and right axis. Don't use this property if their unit or range differs. Instead configure the range for each axis seperately. */
	limitsY?: {
		max?: (values: number[]) => number;
		min?: (values: number[]) => number;
	};

	/** Configures the presentation of the x-axis data.  */
	labelX: (y: number) => string;

	fullscreen?: boolean;
};

export default function (props: GraphProps) {
	const graphBoundary = useRef(null);
	const axisXBoundary = useRef(null);
	const [graphWidth, setGraphWidth] = useState(0);
	const [graphHeight, setGraphHeight] = useState(0);
	const [axisXHeight, setAxisXHeight] = useState(0);
	const [axisX, setAxisX] = useState(0);
	const [axisY, setAxisY] = useState(0);

	const leftAxisLimitsY = {
		min: 0,
		max: 0,
	};
	const rightAxisLimitsY = {
		min: 0,
		max: 0,
	};
	const limitsX = {
		min: 0,
		max: 0,
	};

	computeLimits(props, limitsX, leftAxisLimitsY, rightAxisLimitsY);
	const relativeGridSizeY = computeRelativeGridYSize(
		props,
		leftAxisLimitsY,
		rightAxisLimitsY
	);

	// Configures resize observers to make the graph responsive
	useEffect(() => {
		if (graphBoundary?.current) {
			new ResizeObserver((entries) => {
				const rect = entries[0];
				setGraphWidth(rect.contentRect.width);
				setGraphHeight(rect.contentRect.height);
			}).observe(graphBoundary.current);
		}
	}, [graphBoundary]);

	useEffect(() => {
		if (axisXBoundary?.current) {
			new ResizeObserver((entries) => {
				const rect = entries[0];
				setAxisXHeight(rect.contentRect.height);
				setAxisX(rect.contentRect.x);
				setAxisY(rect.contentRect.y);
			}).observe(axisXBoundary.current);
		}
	}, [axisXBoundary]);

	// Sets the functions to calculate a point's position in the svg
	props.leftAxis.yPos = (y: number) => {
		const relativePos =
			(y - leftAxisLimitsY.min) /
			(leftAxisLimitsY.max - leftAxisLimitsY.min);
		return graphHeight - relativePos * graphHeight;
	};

	props.rightAxis.yPos = (y: number) => {
		const relativePos =
			(y - rightAxisLimitsY.min) /
			(rightAxisLimitsY.max - rightAxisLimitsY.min);
		return graphHeight - relativePos * graphHeight;
	};

	props.leftAxis.xPos = (x: number) => {
		const relativePos = (x - limitsX.min) / (limitsX.max - limitsX.min);
		return relativePos * graphWidth;
	};

	props.rightAxis.xPos = (x: number) => {
		const relativePos = (x - limitsX.min) / (limitsX.max - limitsX.min);
		return relativePos * graphWidth;
	};

	/** Adds additional meta data to the graph points that is utilized at multiple spots. */
	const processedPointsLeft = props.leftAxis.points.map((point, index) => ({
		xPos: props.leftAxis.xPos!(point.x),
		yPos: props.leftAxis.yPos!(point.y),
		x: point.x,
		y: point.y,
		labelY: props.leftAxis.labelY(point.y),
		first: index === 0,
		last: index + 1 === props.leftAxis.points.length,
	}));
	const processedPointsRight = props.rightAxis.points.map((point, index) => ({
		xPos: props.rightAxis.xPos!(point.x),
		yPos: props.rightAxis.yPos!(point.y),
		x: point.x,
		y: point.y,
		labelY: props.rightAxis.labelY(point.y),
		first: index === 0,
		last: index + 1 === props.rightAxis.points.length,
	}));

	return (
		<div
			className={`${styles.graph} ${
				props.fullscreen ? styles.fullscreen : ""
			}`}
		>
			<div className={styles.heading}>
				<div className={styles.leftAxisTitle}>
					{utils.iconComponent(props.leftAxis.elementType)}{" "}
					{props.leftAxis.label}
				</div>
				<div className={styles.title}></div>
				<div className={styles.rightAxisTitle}>
					{props.rightAxis.label}{" "}
					{utils.iconComponent(props.rightAxis.elementType)}
				</div>
			</div>
			<div id={props.leftAxis.sensorId}></div>
			<div id={props.rightAxis.sensorId}></div>
			<div className={styles.boundary} ref={graphBoundary}>
				<svg width={graphWidth} height={graphHeight}>
					<XGrid
						gridSize={
							((props.gridXDistance || 1) /
								(limitsX.max - limitsX.min)) *
							graphWidth
						}
						width={graphWidth}
						height={graphHeight}
					/>
					<YGrid
						gridSize={relativeGridSizeY * graphHeight}
						width={graphWidth}
						height={graphHeight}
					/>
					{props.rightAxis.type === "bar" ? (
						<>
							<Line
								processedPoints={processedPointsRight}
								height={graphHeight}
								width={graphWidth}
								type={props.rightAxis.type || "line"}
								barWidth={props.rightAxis.barWidth}
							/>
							<Line
								processedPoints={processedPointsLeft}
								height={graphHeight}
								width={graphWidth}
								type={props.leftAxis.type || "line"}
								barWidth={props.leftAxis.barWidth}
							/>
						</>
					) : (
						<>
							<Line
								processedPoints={processedPointsLeft}
								height={graphHeight}
								width={graphWidth}
								type={props.leftAxis.type || "line"}
								barWidth={props.leftAxis.barWidth}
							/>
							<Line
								processedPoints={processedPointsRight}
								height={graphHeight}
								width={graphWidth}
								type={props.rightAxis.type || "line"}
								barWidth={props.rightAxis.barWidth}
							/>
						</>
					)}

					<Points
						processedPoints={processedPointsRight}
						height={graphHeight}
						width={graphWidth}
						type={props.rightAxis.type || "line"}
						barWidth={props.rightAxis.barWidth}
					/>

					<Points
						processedPoints={processedPointsLeft}
						height={graphHeight}
						width={graphWidth}
						type={props.leftAxis.type || "line"}
						barWidth={props.leftAxis.barWidth}
					/>

					<AxisY
						gridSize={relativeGridSizeY * graphHeight}
						width={graphWidth}
						height={graphHeight}
						leftAxis={props.leftAxis}
						rightAxis={props.rightAxis}
						leftAxisLimitsY={leftAxisLimitsY}
						rightAxisLimitsY={rightAxisLimitsY}
					/>
				</svg>
			</div>
			<div
				className={styles.axisXBoundary}
				style={{ width: graphWidth, height: "3rem" }}
				ref={axisXBoundary}
			>
				<svg
					width={graphWidth}
					height={axisXHeight}
					x={axisX}
					y={axisY}
				>
					<AxisX
						gridSize={
							((props.gridXDistance || 1) /
								(limitsX.max - limitsX.min)) *
							graphWidth
						}
						width={graphWidth}
						height={axisXHeight}
						limitsX={limitsX}
						gridXUnits={props.gridXDistance!}
						labelX={props.labelX}
					/>
				</svg>
			</div>
		</div>
	);
}

/**
 * Computes the left and right axis limits.
 * @param props
 * @param limitsX
 * @param leftAxisLimitsY
 * @param rightAxisLimitsY
 */
function computeLimits(
	props: GraphProps,
	limitsX: any,
	leftAxisLimitsY: any,
	rightAxisLimitsY: any
) {
	const leftAxisX = props.leftAxis.points.map((point) => point.x);
	const leftAxisY = props.leftAxis.points.map((point) => point.y);
	const rightAxisX = props.rightAxis.points.map((point) => point.x);
	const rightAxisY = props.rightAxis.points.map((point) => point.y);

	const x = leftAxisX.concat(...rightAxisX);
	const maxValue = (props.limitsX?.max || Limits.max())(x);
	const minValue = (props.limitsX?.min || Limits.min())(x);
	limitsX.min = minValue;
	limitsX.max = maxValue;

	if (props.limitsY) {
		const x = leftAxisY.concat(...rightAxisY);
		const maxValue = (props.limitsY.max || Limits.max())(x);
		const minValue = (props.limitsY.min || Limits.min())(x);

		leftAxisLimitsY.min = minValue;
		leftAxisLimitsY.max = maxValue;

		rightAxisLimitsY.min = minValue;
		rightAxisLimitsY.max = maxValue;
	} else {
		leftAxisLimitsY.min = (props.leftAxis?.limitsY?.min || Limits.min())(
			leftAxisY
		);
		leftAxisLimitsY.max = (props.leftAxis?.limitsY?.max || Limits.max())(
			leftAxisY
		);

		rightAxisLimitsY.min = (props.rightAxis?.limitsY?.min || Limits.min())(
			rightAxisY
		);
		rightAxisLimitsY.max = (props.rightAxis?.limitsY?.max || Limits.max())(
			rightAxisY
		);
	}
}

/**
 * Computes the grid y size to fit both distances specified in the left and right axis properties. This may overwrite the left and right axis y range.
 * @param props
 * @param leftAxisLimitsY
 * @param rightAxisLimitsY
 * @returns The computed relative grid size
 */
function computeRelativeGridYSize(
	props: GraphProps,
	leftAxisLimitsY: any,
	rightAxisLimitsY: any
) {
	if (props.gridYDistance) {
		props.leftAxis.gridYDistance = props.gridYDistance;
		props.rightAxis.gridYDistance = props.gridYDistance;
	}

	const leftAxisCellGridSize =
		(props.leftAxis.gridYDistance || 1) /
		(leftAxisLimitsY.max - leftAxisLimitsY.min);

	const rightAxisCellGridSize =
		(props.rightAxis.gridYDistance || 1) /
		(rightAxisLimitsY.max - rightAxisLimitsY.min);

	if (leftAxisCellGridSize > rightAxisCellGridSize) {
		leftAxisLimitsY.max =
			(props.leftAxis.gridYDistance || 1) / rightAxisCellGridSize +
			leftAxisLimitsY.min;

		return rightAxisCellGridSize;
	} else if (leftAxisCellGridSize < rightAxisCellGridSize) {
		rightAxisLimitsY.max =
			(props.rightAxis.gridYDistance || 1) / leftAxisCellGridSize +
			rightAxisLimitsY.min;
		return leftAxisCellGridSize;
	} else {
		return leftAxisCellGridSize;
	}
}
