import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../client/supabaseClient";
import "../styles/spellSection.scss";

interface SpellProps {
	index: number;
	name: string;
	level: number;
	school: string;
	castTime: string;
	range: string;
	duration: string;
	components: string;
	description: string;
	atHigherLevels: string;
	spellLists: string;
}

const Spell: React.FC<SpellProps> = ({ index, name, level, school, castTime, range, duration, components, description, atHigherLevels, spellLists }) => {
	const [spellDetails, setSpellDetails] = useState<SpellProps | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [expanded, setExpanded] = useState<boolean>(false);

	const toggleExpand = () => {
		setExpanded((prev) => !prev);
	};

	useEffect(() => {
		const fetchSpellDetails = async () => {
			try {
				const { data, error } = await supabase.from("spells").select("*").eq("name", name).single();

				if (error) {
					setError("Failed to fetch spell details.");
					console.error(error);
				} else {
					setSpellDetails(data as SpellProps);
				}

				setLoading(false);
			} catch (error) {
				console.error("Unexpected error fetching spell details:", error);
				setError("Unexpected error occurred.");
				setLoading(false);
			}
		};

		fetchSpellDetails();
	}, [name]);

	if (loading) return <div>Loading spell...</div>;
	if (error) return <div>{error}</div>;
	if (!spellDetails) return <div>No spell data available.</div>;

	return (
		<div className="spell" key={index} onClick={toggleExpand}>
			<h3 className="spell-title">{name}</h3>
			<div className="spell-meta">
				<p>
					<strong>Level:</strong> {level}
				</p>
				<p>
					<strong>Cast Time:</strong> {castTime}
				</p>
				<p>
					<strong>School:</strong> {school}
				</p>
			</div>
			<AnimatePresence>
				{expanded && (
					<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: "hidden" }}>
						<div className="spell-details">
							<p>
								<strong>Range:</strong> {range}
							</p>
							<p>
								<strong>Duration:</strong> {duration}
							</p>
							<p>
								<strong>Components:</strong> {components}
							</p>
							<p>{description}</p>
							{atHigherLevels && (
								<p>
									<strong>At Higher Levels:</strong> {atHigherLevels}
								</p>
							)}
							<p>
								<strong>Spell Lists:</strong> {spellLists}
							</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Spell;
