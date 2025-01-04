import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/SpellSection.scss"; // Assuming it's a CSS file now
import Spell from "../components/Spell"; // Import the Spell component

interface SpellData {
	index: string;
	name: string;
	level: number;
}

const SpellSection = () => {
	const [spells, setSpells] = useState<SpellData[]>([]); // Explicitly define the state as an array of Spell objects
	const [activeLevel, setActiveLevel] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchSpells = async () => {
			try {
				const response = await axios.get("https://www.dnd5eapi.co/api/spells");
				setSpells(response.data.results || []); // Ensure that we handle cases where results may be empty
				setLoading(false);
			} catch (error) {
				console.error("Error fetching spells:", error);
				setLoading(false);
			}
		};

		fetchSpells();
	}, []);

	// Function to filter spells based on the selected level
	const filterSpellsByLevel = (level: number) => {
		return spells.filter((spell) => spell.level === level);
	};

	if (loading) {
		return <div>Loading spells...</div>; // Show loading text if data is still being fetched
	}

	return (
		<div className="spell-section">
			<h1 className="spell-title">Spell Archive</h1>

			<div className="spell-levels">
				{Array.from({ length: 10 }, (_, i) => i).map((level) => (
					<button key={level} className={`level-button ${activeLevel === level ? "active" : ""}`} onClick={() => setActiveLevel(level)}>
						Level {level === 0 ? "Cantrip" : level}
					</button>
				))}
			</div>

			<div className="spells-list">
				{filterSpellsByLevel(activeLevel).map((spell) => (
					<Spell key={spell.index} index={spell.index} />
				))}
			</div>
		</div>
	);
};

export default SpellSection;
