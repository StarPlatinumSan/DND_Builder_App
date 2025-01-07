import React, { useEffect, useState } from "react";
import axios from "axios";
import Class from "../../components/Class";
import { Link } from "react-router-dom";

interface ClassInfo {
	name: string;
	index: string;
	caster_type: "non-caster" | "half-caster" | "full-caster";
	image: string;
	manualData?: {
		name: string;
		hit_die: number;
		proficiencies: { name: string }[];
		subclasses: { name: string }[];
	};
}

const ClassPage: React.FC = () => {
	const [classes, setClasses] = useState<ClassInfo[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const casterCategories = {
		"non-caster": ["barbarian", "fighter", "rogue", "monk"],
		"half-caster": ["paladin", "ranger", "artificier"],
		"full-caster": ["bard", "cleric", "druid", "sorcerer", "wizard", "warlock"],
	};

	const classImages: { [key: string]: string } = {
		artificier: "../../../public/artificer.jpg",
		barbarian: "../../../public/barbarian.jpg",
		fighter: "../../../public/fighter.jpg",
		rogue: "../../../public/rogue.jpg",
		monk: "../../../public/monk.jpg",
		paladin: "../../../public/paladin.jpg",
		ranger: "../../../public/ranger.jpg",
		bard: "../../../public/bard.jpg",
		cleric: "../../../public/cleric.jpg",
		druid: "../../../public/druid.jpg",
		sorcerer: "../../../public/sorcerer.jpg",
		wizard: "../../../public/wizard.jpg",
		warlock: "../../../public/warlock.jpg",
	};

	useEffect(() => {
		const fetchClasses = async () => {
			try {
				const response = await axios.get("https://www.dnd5eapi.co/api/classes");
				const categorizedClasses = response.data.results.map((cls: { name: string; index: string }) => {
					let caster_type: "non-caster" | "half-caster" | "full-caster" = "non-caster";

					if (casterCategories["half-caster"].includes(cls.index)) {
						caster_type = "half-caster";
					} else if (casterCategories["full-caster"].includes(cls.index)) {
						caster_type = "full-caster";
					}

					return {
						name: cls.name,
						index: cls.index,
						caster_type,
						image: classImages[cls.index] || "../../assets/default.png",
					};
				});

				const artificerClass: ClassInfo = {
					name: "Artificer",
					index: "artificer",
					caster_type: "half-caster",
					image: "../../../public/artificer.jpg",
					manualData: {
						name: "Artificer",
						hit_die: 8,
						proficiencies: [{ name: "Tinker's Tools" }, { name: "Light Armor" }, { name: "Simple Weapons" }],
						subclasses: [{ name: "Alchemist" }, { name: "Artillerist" }],
					},
				};

				setClasses([...categorizedClasses, artificerClass]);
				setIsLoading(false);
			} catch (error) {
				setError("Failed to fetch classes.");
				setIsLoading(false);
			}
		};

		fetchClasses();
	}, []);

	if (isLoading) {
		return <div className="class-page">Loading classes...</div>;
	}

	if (error) {
		return <div className="class-page">Error: {error}</div>;
	}

	return (
		<div className="page-container">
			<Link to={"/"} className="btn returnBtnClass">
				Go Back
			</Link>
			<div className="class-page">
				{Object.keys(casterCategories).map((category) => (
					<div className="caster-category" key={category}>
						<h2>{category.replace("-", " ").toUpperCase()}</h2>
						<div className="card-grid">
							{classes
								.filter((cls) => cls.caster_type === category)
								.map((cls) => (
									<Class key={cls.index} index={cls.index} image={cls.image} manualData={cls.manualData} />
								))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ClassPage;
