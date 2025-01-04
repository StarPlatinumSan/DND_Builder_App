import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
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

	const toggleExpand = () => {
		setExpanded((prev) => !prev);
	};

	useEffect(() => {
		const fetchSpell = async () => {
			try {
				const response = await axios.get<SpellData>(`https://www.dnd5eapi.co/api/spells/${index}`);
				setSpell(response.data);
				setLoading(false);
			} catch (error) {
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
		<div className="spell" onClick={toggleExpand}>
			<h3 className="spell-title">{spell.name}</h3>
			<p className="spell-meta">
				<strong>School:</strong> {spell.school.name}
			</p>
			<AnimatePresence>
				{expanded && (
					<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: "hidden" }}>
						<div className="spell-details">
							<p>
								<strong style={{ fontSize: "1.1em" }}>Components:</strong> {spell.components.join(", ")}
							</p>
							<p>
								<strong style={{ fontSize: "1.1em" }}>Description:</strong> {spell.desc.join(" ")}
							</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Spell;
