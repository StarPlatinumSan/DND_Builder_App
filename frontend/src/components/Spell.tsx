import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/spellSection.scss";

interface SpellProps {
	index: string;
}

interface SpellData {
	name: string;
	level: number;
	school: { name: string };
	components: string[];
	desc: string[];
}

const Spell: React.FC<SpellProps> = ({ index }) => {
	const [spell, setSpell] = useState<SpellData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [expanded, setExpanded] = useState<boolean>(false);

	useEffect(() => {
		const fetchSpell = async () => {
			try {
				const response = await axios.get<SpellData>(`https://www.dnd5eapi.co/api/spells/${index}`);
				setSpell(response.data);
				console.log(response.data);
				setLoading(false);
			} catch (err) {
				setError("Failed to fetch spell details.");
				setLoading(false);
			}
		};

		fetchSpell();
	}, [index]);

	if (loading) return <div>Loading spell...</div>;
	if (error) return <div>{error}</div>;
	if (!spell) return <div>No spell data available.</div>;

	return (
		<div className="spell" onClick={() => setExpanded(!expanded)}>
			<h3 className="spell-title">{spell.name}</h3>
			<p className="spell-meta">
				<strong>School:</strong> {spell.school.name}
			</p>
			{expanded && (
				<div className="spell-details">
					<p>
						<strong>Components:</strong> {spell.components.join(", ")}
					</p>
					<p>
						<strong>Description:</strong> {spell.desc.join(" ")}
					</p>
				</div>
			)}
		</div>
	);
};

export default Spell;
