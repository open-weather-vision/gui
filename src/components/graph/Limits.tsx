export const Limits = {
	/** Gets the minimum number in the dataset.  */
	min: (round?: boolean) => (values: number[]) =>
		round ? Math.round(Math.min(...values)) : Math.min(...values),
	/** Gets the maximum number in the dataset.  */
	max: (round?: boolean) => (values: number[]) =>
		round ? Math.round(Math.max(...values)) : Math.max(...values),
	/** Gets the minimum number in the dataset with an additional offset.  */
	minWithOffset: (offset: number, round?: boolean) => (values: number[]) =>
		(round ? Math.round(Math.min(...values)) : Math.min(...values)) -
		offset,
	/** Gets the maximum number in the dataset with an additional offset.  */
	maxWithOffset: (offset: number, round?: boolean) => (values: number[]) =>
		(round ? Math.round(Math.max(...values)) : Math.max(...values)) +
		offset,
	/** Sets the specified number as limit. */
	value: (value: number) => (values: number[]) => value,
};
