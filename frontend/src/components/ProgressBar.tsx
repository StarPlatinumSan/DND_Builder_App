import React from "react";

interface ProgressBarProps {
	currentStep: number;
	totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
	const percentage = ((currentStep + 1) / totalSteps) * 100;

	return (
		<div className="progressBarContainer">
			<div className="progressBar" style={{ width: `${percentage}%` }}></div>
			<span>
				Step {currentStep + 1} of {totalSteps}
			</span>
		</div>
	);
};

export default ProgressBar;
