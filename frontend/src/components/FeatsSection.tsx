import React, { useEffect, useState } from "react";
import FeatCard from "./Feat";

interface Feat {
	id: number;
	name: string;
	description: string;
}

interface FeatsSectionProps {
	feats: Feat[];
	addFeatToCharacter: (feat: Feat) => void;
}

const FeatsSection: React.FC<FeatsSectionProps> = ({ feats, addFeatToCharacter }) => {
	const [filteredFeats, setFilteredFeats] = useState<Feat[]>(feats);
	const [searchTerm, setSearchTerm] = useState("");

	const filterFeats = (event: React.ChangeEvent<HTMLInputElement>) => {
		const term = event.target.value.toLowerCase();
		setSearchTerm(term);
		setFilteredFeats(feats.filter((feat) => feat.name.toLowerCase().includes(term)));
	};

	useEffect(() => {
		setFilteredFeats(feats);
	}, [feats]);

	return (
		<div className="featsContainer">
			<h2>Feats</h2>
			<input type="text" placeholder="Search Feats" value={searchTerm} onChange={filterFeats} className="featSearchInput" />
			<div className="featsList">{filteredFeats.length === 0 ? <p>No feats available.</p> : filteredFeats.map((feat) => <FeatCard key={feat.id} feat={feat} addFeatToCharacter={addFeatToCharacter} />)}</div>
		</div>
	);
};

export default FeatsSection;
