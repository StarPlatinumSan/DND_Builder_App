import React, { useState, useEffect } from "react";
import axios from "axios";
import Spell from "../components/Spell";

interface SpellData {
	index: string;
	name: string;
	level: number;
}

const SpellSection = () => {
	const [spells, setSpells] = useState<SpellData[]>([]);
	const [activeLevel, setActiveLevel] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchSpells = async () => {
			try {
				const response = await axios.get("https://www.dnd5eapi.co/api/spells");
				setSpells(response.data.results || []);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching spells:", error);
				setLoading(false);
			}
		};

		fetchSpells();
	}, []);

	const filterSpellsByLevel = (level: number) => {
		return spells.filter((spell) => spell.level === level);
	};

	if (loading) {
		return <div style={{ backgroundColor: "#051B2F;" }}>Loading spells...</div>;
	}

	return (
		<div className="spell-section">
			<div className="wrapper">
				<h1 className="spell-title">Spell Archive</h1>

				<div className="spell-levels">
					<button className={`level-button ${activeLevel === 0 ? "active" : ""}`} onClick={() => setActiveLevel(0)}>
						Cantrip
					</button>

					{Array.from({ length: 9 }, (_, i) => i + 1).map((level) => (
						<button key={level} className={`level-button ${activeLevel === level ? "active" : ""}`} onClick={() => setActiveLevel(level)}>
							Level {level}
						</button>
					))}
				</div>

				<div className="spells-list">
					{filterSpellsByLevel(activeLevel).map((spell) => (
						<Spell key={spell.index} index={spell.index} />
					))}
				</div>
			</div>
		</div>
	);
};

export default SpellSection;
