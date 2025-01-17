import React, { useState } from "react";

interface Feat {
	id: number;
	name: string;
	description: string;
}

const FeatsSection: React.FC<{ feats: Feat[] }> = ({ feats }) => {
	const [openFeatId, setOpenFeatId] = useState<number | null>(null);

	const toggleFeat = (id: number) => {
		setOpenFeatId((prevId) => (prevId === id ? null : id));
	};

	return (
		<div className="feats-container">
			<div className="feats-list">
				{feats.map((feat) => (
					<div key={feat.id} className="feat-card">
						<h3 onClick={() => toggleFeat(feat.id)}>{feat.name}</h3>
						<div className={`feat-description ${openFeatId === feat.id ? "open" : ""}`}>{feat.description}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default FeatsSection;
