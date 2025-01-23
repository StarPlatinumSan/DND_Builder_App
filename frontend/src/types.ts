// types.ts
export interface Character {
	level: number;
	name: string;
	race: string;
	class: string;
	subclass: string;
	subrace: string;
	background: string;
	alignment: string;
	stats: {
		strength: number;
		dexterity: number;
		constitution: number;
		intelligence: number;
		wisdom: number;
		charisma: number;
	};
	hitPoints: number;
	hitDie: number;
	armorClass: number;
	initiative: number;
	speed: number;
	gold: number;
	skills: string[];
	proficiencies: string[];
	equipment: string[];
	languages: string[];
	traits: string[];
	features: string[];
	subFeatures: string[];
	feats: { name: string; description?: string; boni?: string }[];
	spells: string[];
	description: string;
}

export interface Subrace {
	id: number;
	race_id: number;
	name: string;
	features: string;
}

export interface Race {
	id: number;
	name: string;
	description: string;
	features: string;
	subraces: Subrace[];
}

export interface Subclasses {
	id: number;
	class_id: number;
	name: string;
	features: string;
}

export interface Class {
	id: number;
	name: string;
	description: string;
	features: string;
	subclasses: Subclasses[];
}

export interface Background {
	id: number;
	name: string;
	proficiencies: string;
	tool_proficiencies: string;
	languages: string;
	equipment: string;
	features: string;
}

export interface Feat {
	id: number;
	name: string;
	description: string;
	boni: string;
	prerequisite?: string;
}
