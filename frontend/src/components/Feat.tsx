import React, { useState } from "react";
import SlidePlatinum from "./SlidePlatinum";

interface Feat {
	id: number;
	name: string;
	description: string;
	boni?: string;
	prerequisite?: string;
}

const FeatCard: React.FC<{ feat: Feat; addFeatToCharacter: (feat: Feat) => void }> = ({ feat, addFeatToCharacter }) => {
	const handleSelect = (e: React.MouseEvent) => {
		e.stopPropagation();
		addFeatToCharacter(feat);
	};

	return (
		<SlidePlatinum title={feat.name} duration={0.3} trigger="click" position="static" className="featCard">
			<div className="featContent">
				{feat.description.length > 0 && <p>{feat.description}</p>}
				{feat.boni && feat.boni.length > 2 && <p>{feat.boni}</p>}
				{feat.prerequisite && <span className="prerequisite">Prerequisite {feat.prerequisite || null}</span>}

				<button className="btn maxWidth50" onClick={handleSelect}>
					Select
				</button>
			</div>
		</SlidePlatinum>
	);
};

export default FeatCard;
