import React, { useState } from "react";
import SlideDown from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

interface Feat {
	id: number;
	name: string;
	description: string;
	boni?: string;
	prerequisite?: string;
}

const FeatCard: React.FC<{ feat: Feat; addFeatToCharacter: (feat: Feat) => void }> = ({ feat, addFeatToCharacter }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleFeat = () => {
		setIsOpen((prev) => !prev);
	};

	const handleSelect = (e: React.MouseEvent) => {
		e.stopPropagation();
		addFeatToCharacter(feat);
	};

	return (
		<div className="featCard" onClick={toggleFeat}>
			<h3>{feat.name}</h3>
			<SlideDown>
				{isOpen && (
					<div className="featContent">
						<p>{feat.description}</p>
						<p>{feat.boni || "No bonus available"}</p>
						{feat.prerequisite && <span className="prerequisite">{feat.prerequisite || null}</span>}

						<button className="btn maxWidth50" onClick={handleSelect}>
							Select
						</button>
					</div>
				)}
			</SlideDown>
		</div>
	);
};

export default FeatCard;
