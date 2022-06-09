export default function debounce<F extends (...args: any) => any>(
	func: F,
	waitFor = 20
) {
	const timeout: number = waitFor;
	const debounced = (...args: any) => {
		clearTimeout(timeout);
		setTimeout(() => func(...args), waitFor);
	};

	return debounced as (...args: Parameters<F>) => ReturnType<F>;
}
