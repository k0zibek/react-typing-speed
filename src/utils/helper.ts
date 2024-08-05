export const formatPercentage = (percentage: number) => {
	return percentage.toFixed(0) + '%';
};

export const countErrors = (typed: string, wordsReached: string): number => {
	let errors = 0;
	for (let i = 0; i < typed.length; i++) {
		if (typed[i] !== wordsReached[i]) {
			errors++;
		}
	}
	return errors;
};

export const calculateAccuracyPercentage = (errors: number, totalTyped: number): number => {
	return ((totalTyped - errors) / totalTyped) * 100;
};
