import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../client/supabaseClient";
import Spell from "../../components/Spell";

interface SpellData {
	level: number;
	name: string;
	school: string;
	cast_time: string;
	range: string;
	duration: string;
	components: string;
	description: string;
	atHigherLevels: string;
	spellLists: string;
}

const SpellSection = () => {
	const [spells, setSpells] = useState<SpellData[]>([]);
	const [activeLevel, setActiveLevel] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchSpells = async () => {
			try {
				const response = await supabase.from("spells").select(`
					level,
					name,
					school,
					cast_time,
					range,
					duration,
					components,
					description,
					atHigherLevels,
					spellLists
				`);

				if (response.error) {
					console.error("Error fetching spells:", response.error);
					setLoading(false);
					return;
				}

				setSpells(response.data! || []);
				setLoading(false);
			} catch (error) {
				console.error("Unexpected error fetching spells:", error);
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
			<Link to="/" className="btn returnBtnSpells">
				Go Back
			</Link>
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
					{filterSpellsByLevel(activeLevel).map((spell, index) => (
						<Spell
							index={index}
							name={spell.name}
							level={spell.level}
							school={spell.school}
							castTime={spell.cast_time}
							range={spell.range}
							duration={spell.duration}
							components={spell.components}
							description={spell.description}
							atHigherLevels={spell.atHigherLevels}
							spellLists={spell.spellLists}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default SpellSection;
