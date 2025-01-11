import React, { useEffect, useState } from "react";
import { supabase } from "../../client/supabaseClient";
import Class from "../../components/Class";
import { Link } from "react-router-dom";

interface ClassInfo {
	id: number;
	name: string;
	description: string;
	features: string;
	caster_type: "non-caster" | "half-caster" | "full-caster";
	image: string;
	wikidot_link: string;
}

const ClassPage: React.FC = () => {
	const [classes, setClasses] = useState<ClassInfo[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const casterCategories = {
		"non-caster": ["Barbarian", "Fighter", "Rogue", "Monk"],
		"half-caster": ["Paladin", "Ranger", "Artificer"],
		"full-caster": ["Bard", "Cleric", "Druid", "Sorcerer", "Wizard", "Warlock"],
	};

	const classImages: { [key: string]: string } = {
		Artificer: "Artificer.jpg",
		Barbarian: "Barbarian.jpg",
		Fighter: "Fighter.jpg",
		Rogue: "Rogue.jpg",
		Monk: "Monk.jpg",
		Paladin: "Paladin.jpg",
		Ranger: "Ranger.jpg",
		Bard: "Bard.jpg",
		Cleric: "Cleric.jpg",
		Druid: "Druid.jpg",
		Sorcerer: "Sorcerer.jpg",
		Wizard: "Wizard.jpg",
		Warlock: "Warlock.jpg",
	};

	useEffect(() => {
		const fetchClasses = async () => {
			try {
				const { data, error } = await supabase.from("classes").select("id, name, description, features, wikidot_link");

				if (error) {
					throw new Error("Failed to fetch classes from Supabase.");
				}

				const categorizedClasses = data.map((cls) => {
					let caster_type: "non-caster" | "half-caster" | "full-caster" = "non-caster";

					if (casterCategories["half-caster"].includes(cls.name)) {
						caster_type = "half-caster";
					} else if (casterCategories["full-caster"].includes(cls.name)) {
						caster_type = "full-caster";
					}

					return {
						...cls,
						caster_type,
						image: classImages[cls.name] || "/images/default.png",
					};
				});

				setClasses(categorizedClasses);
				setIsLoading(false);
			} catch (error) {
				setError(error instanceof Error ? error.message : "Unknown error occurred.");
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
									<Class
										index={cls.name}
										image={classImages[cls.name]}
										manualData={{
											id: cls.id,
											name: cls.name,
											description: cls.description,
											features: cls.features,
											wikidot_link: cls.wikidot_link,
										}}
									/>
								))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ClassPage;
