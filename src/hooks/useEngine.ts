/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from 'react';
import useWords from './useWords';
import useCountdownTimer from './useCountdownTimer';
import useTypings from './useTypings';
import { countErrors } from '../utils/helper';

export type State = 'start' | 'run' | 'finish';

const NUMBER_OF_WORDS = 30;
export const COUNTDOWN_TIME = 30;

const useEngine = () => {
	const [state, setState] = useState<State>('start');
	const { words, updateWords } = useWords(NUMBER_OF_WORDS);
	const { timeLeft, startCountdown, resetCountdown } = useCountdownTimer(COUNTDOWN_TIME);
	const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } = useTypings(state !== 'finish');
	const [errors, setErrors] = useState(0);

	const isStarting = state === 'start' && cursor > 0;
	const areWordsFinished = cursor === words.length;

	const sumErrors = useCallback(() => {
		const wordsReached = words.substring(0, cursor);
		setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
	}, [typed, words, cursor]);

	useEffect(() => {
		if (isStarting) {
			setState('run');
			startCountdown();
		}
	}, [isStarting, startCountdown, cursor]);

	useEffect(() => {
		if (!timeLeft) {
			setState('finish');
			sumErrors();
		}
	}, [timeLeft, sumErrors]);

	// when words are filled up, we generate and show new words

	useEffect(() => {
		if (areWordsFinished) {
			sumErrors();
			updateWords();
			clearTyped();
		}
	}, [cursor, words, clearTyped, typed, areWordsFinished, updateWords, sumErrors]);

	const restart = useCallback(() => {
		resetCountdown();
		resetTotalTyped();
		setState('start');
		setErrors(0);
		updateWords();
		clearTyped();
	}, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);

	return { state, words, timeLeft, typed, errors, totalTyped, restart };
};

export default useEngine;
