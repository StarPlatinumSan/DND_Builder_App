import { useState, useEffect } from "react";
import axios from "axios";

interface SpellProps {
	spellIndex: string;
}

interface SpellData {
	name: string;
	level: number;
	school: { name: string };
	components: string[];
	desc: string[];
}

const Spell: React.FC<SpellProps> = ({ spellIndex }) => {
	const [spell, setSpell] = useState<SpellData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchSpell = async () => {
			try {
				const response = await axios.get<SpellData>(
					`https://www.dnd5eapi.co/api/spells/${spellIndex}`
				);
				setSpell(response.data);
				setLoading(false);
			} catch (err) {
				setError("Failed to fetch spell details.");
				setLoading(false);
			}
		};

		fetchSpell();
	}, [spellIndex]);

	if (loading) return <div>Loading spell details...</div>;
	if (error) return <div>{error}</div>;
	if (!spell) return <div>No spell data available.</div>;

	return (
		<div>
			<h2>{spell.name}</h2>
			<p><strong>Level:</strong> {spell.level}</p>
			<p><strong>School:</strong> {spell.school.name}</p>
			<p><strong>Components:</strong> {spell.components.join(", ")}</p>
			<p><strong>Description:</strong> {spell.desc.join(" ")}</p>
		</div>
	);
};

export default Spell;
