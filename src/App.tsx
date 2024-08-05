import RestartButton from './components/RestartButton';
import './styles/App.css';
import Results from './components/Results';
import UserTypings from './components/UserTypings';
import useEngine, { COUNTDOWN_TIME } from './hooks/useEngine';
import { calculateAccuracyPercentage } from './utils/helper';

const App = () => {
	const { state, words, timeLeft, typed, errors, totalTyped, restart } = useEngine();

	return (
		<div>
			<CountDownTimer timeLeft={timeLeft} />
			<WordsContainer>
				<GeneratedWords words={words} />
				<UserTypings className='absolute inset-0' words={words} userInput={typed} />
			</WordsContainer>
			<RestartButton className={'mx-auto mt-10 text-primary-400'} onRestart={restart} />
			<Results
				state={state}
				className='mt-10'
				errors={errors}
				accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
				total={totalTyped / 5}
				time={COUNTDOWN_TIME / 60}
			/>
		</div>
	);
};

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
	return <div className='relative text-3xl max-w-5xl leading-relaxed break-all mt-3'>{children}</div>;
};

const GeneratedWords = ({ words }: { words: string }) => {
	return <div className='text-primary-400'>{words}</div>;
};

const CountDownTimer = ({ timeLeft }: { timeLeft: number }) => {
	return <h2 className='text-emerald-400 font-medium'>Time: {timeLeft}</h2>;
};

export default App;
