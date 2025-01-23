import React from "react";

interface SelectionModalProps {
	type: "races" | "classes" | "subraces" | "subclasses" | "backgrounds" | "feats";
	items: string[];
	onSelect: (name: string) => void;
	onClose: () => void;
}

const SelectionModal: React.FC<SelectionModalProps> = ({ type, items, onSelect, onClose }) => {
	return (
		<div className="modalOverlay">
			<div className="modalContent">
				<h3>Select {type.charAt(0).toUpperCase() + type.slice(1)}</h3>
				<div className="itemsList">
					{items.length === 0 ? (
						<p>No items available.</p>
					) : (
						items.map((item, index) => (
							<div key={index} className="item" onClick={() => onSelect(item)}>
								{item}
							</div>
						))
					)}
				</div>
				<button className="btn btnClose" onClick={onClose}>
					Close
				</button>
			</div>
		</div>
	);
};

export default SelectionModal;
