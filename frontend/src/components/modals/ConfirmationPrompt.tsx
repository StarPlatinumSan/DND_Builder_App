import React from "react";

interface ConfirmationPromptProps {
	show: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}

const ConfirmationPrompt: React.FC<ConfirmationPromptProps> = ({ show, onConfirm, onCancel }) => {
	if (!show) return null;

	return (
		<div className="modalOverlay">
			<div className="modalContent">
				<p>Are you sure you want to cancel the creation of your character?</p>
				<p style={{ color: "red" }}>If you do so, you will lose all your progress.</p>

				<div className="btnContainer">
					<button className="btn btnYes" onClick={onConfirm}>
						Yes
					</button>
					<button className="btn btnNo" onClick={onCancel}>
						No
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationPrompt;
