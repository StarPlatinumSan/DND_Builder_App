import { useState, useEffect } from "react";
import axios from "../client/apiClient";
import Spell from "../components/Spell";

interface SpellData {
	name: string;
	index: string;
	level: number;
	school: { name: string };
}

const SpellSection: React.FC = () => {
	const [spellsByLevel, setSpellsByLevel] = useState<Record<number, SpellData[]>>({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

	useEffect(() => {
		const fetchSpells = async () => {
			try {
				const response = await axios.get<{ results: SpellData[] }>("https://www.dnd5eapi.co/api/spells");
				const spells = response.data.results;

				// Fetch detailed spell information for classification
				const detailedSpells = await Promise.all(spells.map((spell) => axios.get<SpellData>(`https://www.dnd5eapi.co/api/spells/${spell.index}`)));

				// Classify spells by level
				const spellsByLevel: Record<number, SpellData[]> = {};
				detailedSpells.forEach(({ data }) => {
					if (!spellsByLevel[data.level]) spellsByLevel[data.level] = [];
					spellsByLevel[data.level].push(data);
				});

				setSpellsByLevel(spellsByLevel);
				setLoading(false);
			} catch (err) {
				console.error(err);
				setError("Failed to fetch spells.");
				setLoading(false);
			}
		};

		fetchSpells();
	}, []);

	if (loading) return <div>Loading spells...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div>
			<h1>Spell Archive</h1>
			<div className="spell-levels">
				{Object.keys(spellsByLevel).map((level) => (
					<button key={level} className={`level-button ${selectedLevel === Number(level) ? "active" : ""}`} onClick={() => setSelectedLevel(Number(level))}>
						{level === "0" ? "Cantrips" : `Level ${level}`}
					</button>
				))}
			</div>

			<div className="spells-list">
				{selectedLevel !== null &&
					spellsByLevel[selectedLevel]?.map((spell) => (
						<div key={spell.index} className="spell-item">
							<Spell spellIndex={spell.index} />
						</div>
					))}
			</div>
		</div>
	);
};

export default SpellSection;
