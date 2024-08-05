import { motion } from 'framer-motion';
import { formatPercentage } from '../utils/helper';
import { State } from '../hooks/useEngine';

const Results = ({
	state,
	errors,
	accuracyPercentage,
	total,
	time,
	className,
}: {
	state: State;
	errors: number;
	accuracyPercentage: number;
	total: number;
	time: number;
	className?: string;
}) => {
	const initial = { opacity: 0 };
	const animate = { opacity: 1 };
	const duration = { duration: 0.3 };

	if (state !== 'finish') {
		return null;
	}

	return (
		<motion.ul className={`flex flex-col text-center items-center text-purple-400 space-y-3 ${className}`}>
			<motion.li
				initial={initial}
				animate={animate}
				className='text-xl font-semibold'
				transition={{ ...duration, delay: 0 }}
			>
				Results
			</motion.li>
			<motion.li initial={initial} animate={animate} transition={{ ...duration, delay: 0.5 }}>
				WPM
				<br />
				<strong className='text-emerald-400 text-2xl'>{Math.round(total / time)}</strong>
			</motion.li>
			<motion.li initial={initial} animate={animate} transition={{ ...duration, delay: 1 }}>
				Accuracy
				<br />
				<strong className='text-emerald-400 text-2xl'>{formatPercentage(accuracyPercentage)}</strong>
			</motion.li>
			<motion.li
				initial={initial}
				animate={animate}
				transition={{ ...duration, delay: 1.4 }}
				className='text-red-500'
			>
				Errors: {errors}
			</motion.li>
		</motion.ul>
	);
};

export default Results;
