import { useCallback, useEffect, useRef, useState } from 'react';

const useCountdownTimer = (seconds: number) => {
	const [timeLeft, setTimeLeft] = useState(seconds);
	const interfalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const startCountdown = useCallback(() => {
		console.log('starting countdown...');

		interfalRef.current = setInterval(() => {
			setTimeLeft((timeLeft) => timeLeft - 1);
		}, 1000);
	}, [setTimeLeft]);

	const resetCountdown = useCallback(() => {
		console.log('resetting countdown...');

		if (interfalRef.current) {
			clearInterval(interfalRef.current);
		}

		setTimeLeft(seconds);
	}, [seconds]);

	useEffect(() => {
		if (!timeLeft && interfalRef.current) {
			console.log('clearing time...');
			clearInterval(interfalRef.current);
		}
	}, [timeLeft, interfalRef]);

	return { timeLeft, startCountdown, resetCountdown };
};

export default useCountdownTimer;
