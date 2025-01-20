import React, { useEffect, useState } from "react";
import FeatCard from "./Feat";

interface Feat {
	id: number;
	name: string;
	description: string;
}

const FeatsSection: React.FC<{ feats: Feat[]; addFeatToCharacter: (feat: Feat) => void }> = ({ feats, addFeatToCharacter }) => {
	const [filteredFeats, setFilteredFeats] = useState<Feat[]>(feats);

	const filterFeats = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = event.target.value.toLowerCase();
		setFilteredFeats(feats.filter((feat) => feat.name.toLowerCase().includes(searchTerm)));
	};

	useEffect(() => {
		setFilteredFeats(feats);
	}, [feats]);

	return (
		<div className="featsContainer">
			<h2>Feats</h2>
			<input type="text" placeholder="Search Feats" onChange={filterFeats} />
			<div className="featsList">
				{filteredFeats.map((feat) => (
					<FeatCard key={feat.id} feat={feat} addFeatToCharacter={addFeatToCharacter} />
				))}
			</div>
		</div>
	);
};

export default FeatsSection;
