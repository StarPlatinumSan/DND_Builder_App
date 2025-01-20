import React, { useEffect, useState } from "react";
import { supabase } from "../client/supabaseClient";
import Stats from "../components/Stats";
import FeatsSection from "../components/FeatsSection";

interface Character {
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

interface subraces {
	id: number;
	race_id: number;
	name: string;
	features: string;
}

interface Race {
	id: number;
	name: string;
	description: string;
	features: string;
	subraces: subraces[];
}

interface Subclasses {
	id: number;
	class_id: number;
	name: string;
	features: string;
}

interface Class {
	id: number;
	name: string;
	description: string;
	features: string;
	subclasses: Subclasses[];
}

interface Background {
	id: number;
	name: string;
	proficiencies: string;
	tool_proficiencies: string;
	languages: string;
	equipment: string;
	features: string;
}

interface Feat {
	id: number;
	name: string;
	description: string;
	boni: string;
	prerequisite?: string;
}

const CharacterCreation = () => {
	const [step, setStep] = useState(0);
	const [method, setMethod] = useState("");
	const [bonusPoints, setBonusPoints] = useState(3);
	const [message, setMessage] = useState("");
	const [showDiv, setShowDiv] = useState("");
	const [races, setRaces] = useState<Race[]>([]);
	const [classes, setClasses] = useState<Class[]>([]);
	const [backgrounds, setBackgrounds] = useState<Background[]>([]);
	const [feats, setFeats] = useState<Feat[]>([]);
	const [isPointBuyValid, setIsPointBuyValid] = useState(false);

	const [character, setCharacter] = useState<Character>({
		level: 1,
		name: "",
		race: "",
		class: "",
		subclass: "",
		subrace: "",
		background: "",
		alignment: "",
		stats: {
			strength: 0,
			dexterity: 0,
			constitution: 0,
			intelligence: 0,
			wisdom: 0,
			charisma: 0,
		},
		hitPoints: 0,
		hitDie: 0,
		armorClass: 0,
		initiative: 0,
		speed: 0,
		gold: 0,
		skills: [],
		proficiencies: [],
		equipment: [],
		languages: [],
		traits: [] /* features de race */,
		features: [] /* features de class */,
		subFeatures: [] /* features de subclass */,
		feats: [],
		spells: [],
		description: "",
	});

	const [initialStats, setInitialStats] = useState({
		strength: 0,
		dexterity: 0,
		constitution: 0,
		intelligence: 0,
		wisdom: 0,
		charisma: 0,
	});

	const [selectedLevels, setSelectedLevels] = useState<{ [key: number]: string | null }>({
		4: null,
		8: null,
		12: null,
		16: null,
		19: null,
	});

	const imageRaceMap: { [key: string]: string } = {
		Aasimar: "/Aasimar.jpg",
		Artificer: "/Artificer.jpg",
		Barbarian: "/Barbarian.jpg",
		Bard: "/Bard.jpg",
		Cleric: "/Cleric.jpg",
		Dragonborn: "/Dragonborn.jpg",
		Druid: "/Druid.jpg",
		Dwarf: "/Dwarf.jpg",
		Elf: "/Elf.jpg",
		Exotic: "/Exotic.jpg",
		Fighter: "/Fighter.jpg",
		Genasi: "/Genasi.jpg",
		Gnome: "/Gnome.jpg",
		"Half-Elf": "/Half-Elf.png",
		"Half-Orc": "/Half-Orc.jpg",
		Halfling: "/Halfling.jpg",
		Human: "/Human.png",
		Monk: "/Monk.jpg",
		Paladin: "/Paladin.jpg",
		Tiefling: "Tiefling.jpg",
	};

	const imageClassMap: { [key: string]: string } = {
		Rogue: "/Rogue.png",
		Cleric: "/cleric.png",
		Monk: "/monk.png",
		Bard: "/bard.png",
		Paladin: "/paladin.png",
		Druid: "/druid.png",
		Ranger: "/ranger.png",
		Fighter: "/fighter.png",
		Warlock: "/warlock.png",
		Barbarian: "/barbarian.png",
		Wizard: "/wizard.png",
		Sorcerer: "/sorcerer.png",
		Artificer: "/artificer.png",
	};

	const handleASI = (level: number) => {
		setSelectedLevels((prev) => ({
			...prev,
			[level]: "asi",
		}));

		setBonusPoints((prev) => prev + 2);

		setShowDiv("");
	};

	const handleFeatSelection = (level: number) => {
		setSelectedLevels((prev) => ({
			...prev,
			[level]: "feat",
		}));

		setShowDiv("feats");
	};

	const updateStats = (newStats: { [key: string]: number }) => {
		setCharacter((prevCharacter) => {
			const updatedStats = {
				...prevCharacter.stats,
				...newStats,
			};

			setInitialStats(updatedStats);
			return {
				...prevCharacter,
				stats: updatedStats,
			};
		});
	};

	const goNext = () => {
		if (validateStep()) {
			setStep((prev) => prev + 1);
			console.log(character);
		}
	};
	const goBack = () => {
		setStep((prev) => prev - 1);
		cleanUp();
	};

	const cleanUp = () => {
		setMethod("");
		character.stats = {
			strength: 0,
			dexterity: 0,
			constitution: 0,
			intelligence: 0,
			wisdom: 0,
			charisma: 0,
		};
	};

	const validateStep = () => {
		switch (step) {
			case 0:
				if (character.name === "") {
					setMessage("Please fill in all the fields.");
					setTimeout(() => {
						setMessage("");
					}, 3000);
					return false;
				}
				break;
			case 1:
				break;
			case 2:
				if (method === "point") {
					if (!isPointBuyValid) {
						setMessage("Please distribute your 27 points among all the stats.");
						setTimeout(() => {
							setMessage("");
						}, 3000);
						return false;
					}
				} else if (method === "roll") {
					if (Object.values(character.stats).some((stat) => stat === 0)) {
						setMessage("Please asign all rolled values to your stats.");
						setTimeout(() => {
							setMessage("");
						}, 3000);
						return false;
					}
				}
				break;
			case 3:
				if (bonusPoints > 0) {
					setMessage("Please distribute your bonus points.");
					setTimeout(() => {
						setMessage("");
					}, 3000);
					return false;
				}
				break;
		}
		console.log(Object.values(character.stats));
		return true;
	};

	const addFeatToCharacter = (feat: Feat) => {
		setCharacter((prev) => ({
			...prev,
			feats: [
				...prev.feats,
				{
					name: feat.name,
					description: feat.description,
					boni: feat.boni,
					prerequisite: feat.prerequisite,
				},
			],
		}));

		setShowDiv("");
	};

	const addInput = () => {
		if (character.level >= 20) return;

		setCharacter((prev) => ({
			...prev,
			level: prev.level + 1,
		}));
	};

	const removeInput = () => {
		if (character.level <= 1) return;
		setCharacter((prev) => ({
			...prev,
			level: prev.level - 1,
		}));
	};

	const addBonus = (value: number, stat: string) => {
		const currentStat = character.stats[stat as keyof typeof character.stats];

		if (bonusPoints <= 0 || value > bonusPoints) return;

		setCharacter((prev) => ({
			...prev,
			stats: {
				...prev.stats,
				[stat]: currentStat + value,
			},
		}));

		setBonusPoints((prev) => prev - value);
	};

	const resetBonus = () => {
		setBonusPoints(3);

		setCharacter((prev) => ({
			...prev,
			stats: { ...initialStats },
			feats: [],
		}));

		setSelectedLevels({
			4: null,
			8: null,
			12: null,
			16: null,
			19: null,
		});
	};

	const promptCancel = () => {
		const prompt = document.getElementById("promptCancel") as HTMLDivElement;
		prompt.style.display = "flex";
	};

	const returnToHome = () => {
		const prompt = document.getElementById("promptCancel") as HTMLDivElement;
		prompt.style.display = "none";
		window.location.href = "/vault";
	};

	const changeMethod = (method: string) => {
		cleanUp();
		setMethod(method);
	};

	const showDivSelection = (name: string) => {
		if (name === "races") {
			setShowDiv("races");
		} else if (name === "classes") {
			setShowDiv("classes");
		} else if (name === "subraces") {
			setShowDiv("subraces");
		} else if (name === "subclasses") {
			setShowDiv("subclasses");
		} else if (name === "backgrounds") {
			setShowDiv("backgrounds");
		} else if (name === "feats") {
			setShowDiv("feats");
		}
	};

	const validPointBuy = (isValid: boolean): boolean => {
		setIsPointBuyValid(isValid);
		console.log(isPointBuyValid);
		return isValid;
	};

	const setRaceCharacter = (raceName: string) => {
		const selectedRace = races.find((race) => race.name === raceName);

		if (selectedRace!.name === "Exotic") {
			setCharacter((prev) => ({
				...prev,
				exotic: true,
			}));
		}

		setCharacter((prev) => ({
			...prev,
			race: raceName,
			traits: [...prev.traits, ...(selectedRace?.features ? [selectedRace.features] : [])],
		}));

		setShowDiv("");
	};

	const setClassCharacter = (className: string) => {
		setCharacter((prev) => ({
			...prev,
			class: className,
		}));

		setShowDiv("");
	};

	const setSubraceCharacter = (subraceName: string) => {
		const selectedSubrace = races.find((race) => race.name === character.race)?.subraces.find((subrace) => subrace.name === subraceName);

		setCharacter((prev) => ({
			...prev,
			subrace: subraceName,
			traits: [...prev.traits, ...(selectedSubrace?.features ? [selectedSubrace.features] : [])],
		}));

		setShowDiv("");
	};

	const setSubclassCharacter = (subclassName: string) => {
		setCharacter((prev) => ({
			...prev,
			subclass: subclassName,
		}));

		setShowDiv("");
	};

	const setBackgroundCharacter = (backgroundName: string) => {
		setCharacter((prev) => ({
			...prev,
			background: backgroundName,
		}));

		setShowDiv("");
	};

	useEffect(() => {
		if (showDiv === "races") {
			const fetchRaces = async () => {
				const { data, error } = await supabase.from("races").select(`
						id,
						name,
						description,
						features,
						subraces (id, race_id, name, features)
					`);

				if (error) {
					console.log("Error fetching races:", error);
				}

				if (!data) {
					console.warn("No data returned from Supabase.");
					setRaces([]);
					return;
				}

				if (!Array.isArray(data) || data.length === 0) {
					console.warn("No races found in the database (empty array).");
					setRaces([]);
					return;
				}

				setRaces(data);
			};
			fetchRaces();
		} else if (showDiv === "classes") {
			const fetchClasses = async () => {
				const { data, error } = await supabase.from("classes").select(`
						id,
						name,
						description,
						features,
						subclasses (id, class_id, name, features)
					`);

				if (error) {
					console.log("Error fetching races:", error);
				}

				if (!data) {
					console.warn("No data returned from Supabase.");
					setClasses([]);
					return;
				}

				if (!Array.isArray(data) || data.length === 0) {
					console.warn("No classes found in the database (empty array).");
					setClasses([]);
					return;
				}

				setClasses(data);
			};
			fetchClasses();
		} else if (showDiv === "backgrounds") {
			const fetchBackgrounds = async () => {
				const { data, error } = await supabase.from("backgrounds").select("*");

				if (error) {
					console.log("Error fetching races:", error);
				}

				if (!data) {
					console.warn("No data returned from Supabase.");
					setBackgrounds([]);
					return;
				}

				if (!Array.isArray(data) || data.length === 0) {
					console.warn("No backgrounds found in the database (empty array).");
					setBackgrounds([]);
					return;
				}

				setBackgrounds(data);
			};
			fetchBackgrounds();
		} else if (showDiv === "feats") {
			const fetchFeats = async () => {
				const { data, error } = await supabase.from("feats").select("*");

				if (error) {
					console.log("Error fetching races:", error);
				}

				if (!data) {
					console.warn("No data returned from Supabase.");
					setFeats([]);
					return;
				}

				if (!Array.isArray(data) || data.length === 0) {
					console.warn("No feats found in the database (empty array).");
					setFeats([]);
					return;
				}

				setFeats(data);
			};
			fetchFeats();
		}
	}, [showDiv]);

	return (
		<div className="characterCreationContainer">
			{showDiv === "races" && (
				<div className="raceSelectionDiv">
					<div className="showDiv allRaces">
						<div className="opacity"></div>

						<div className="divSelection races">
							{races.length === 0 && <p>Fetching races...</p>}

							{races.map((race) => (
								<div key={race.id} className={`card ${race.name === "Exotic" ? "exotic" : ""}`} onClick={() => setRaceCharacter(race.name)}>
									<img src={imageRaceMap[race.name] || ""} alt="" />
									<h3>{race.name}</h3>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			{showDiv === "classes" && (
				<div className="classSelectionDiv">
					<div className="showDiv">
						<div className="opacity"></div>

						<div className="divSelection">
							{classes.map((cls) => (
								<div key={cls.id} className={`card ${cls.name === "Exotic" ? "exotic" : ""}`} onClick={() => setClassCharacter(cls.name)}>
									<img src={imageClassMap[cls.name] || ""} alt={`${cls.name}`} />
									<h3>{cls.name}</h3>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			{showDiv === "subraces" && (
				<div className="subraceSelectionDiv">
					<div className="showDiv">
						<div className="opacity"></div>

						<div className="divSelection subDivSelection">
							{(() => {
								const selectedRace = races.find((race) => race.name === character.race);
								const subraces = selectedRace?.subraces || [];

								if (subraces.length === 0) {
									return <p>Fetching subraces...</p>;
								}

								if (subraces.length === 1) {
									return (
										<div className={`card ${subraces[0].name === "Exotic" ? "exotic" : ""}`} onClick={() => setSubraceCharacter(subraces[0].name)}>
											<h3>{subraces[0].name}</h3>
										</div>
									);
								}

								return subraces.map((subrace) => (
									<div key={subrace.id} className={`card ${subrace.name === "Exotic" ? "exotic" : ""}`} onClick={() => setSubraceCharacter(subrace.name)}>
										<h3>{subrace.name}</h3>
									</div>
								));
							})()}

							{/* <button className="btn maxWidth50" onClick={() => setShowDiv("")}>
								Return
							</button> */}
						</div>
					</div>
				</div>
			)}

			{showDiv === "subclasses" && (
				<div className="subraceSelectionDiv">
					<div className="showDiv">
						<div className="opacity"></div>

						<div className="divSelection subDivSelection">
							{(() => {
								const selectedClass = classes.find((cls) => cls.name === character.class);
								const subclasses = selectedClass?.subclasses || [];

								if (subclasses.length === 0) {
									return <p>Fetching subclasses...</p>;
								}

								if (subclasses.length === 1) {
									return (
										<div className={`card ${subclasses[0].name === "Exotic" ? "exotic" : ""}`} onClick={() => setSubclassCharacter(subclasses[0].name)}>
											<h3>{subclasses[0].name}</h3>
										</div>
									);
								}

								return subclasses.map((subclass) => (
									<div key={subclass.id} className={`card ${subclass.name === "Exotic" ? "exotic" : ""}`} onClick={() => setSubclassCharacter(subclass.name)}>
										<h3>{subclass.name}</h3>
									</div>
								));
							})()}

							{/* <button className="btn maxWidth50" onClick={() => setShowDiv("")}>
								Return
							</button> */}
						</div>
					</div>
				</div>
			)}

			{showDiv === "backgrounds" && (
				<div className="backgroundSelectionDiv">
					<div className="showDiv">
						<div className="opacity"></div>

						<div className="divSelection subDivSelection">
							{(() => {
								if (backgrounds.length === 0) {
									return <p>Fetching backgrounds...</p>;
								}

								return backgrounds.map((background) => (
									<div key={background.id} className={`card ${background.name === "Exotic" ? "exotic" : ""}`} onClick={() => setBackgroundCharacter(background.name)}>
										<h3>{background.name}</h3>
									</div>
								));
							})()}

							{/* <button className="btn maxWidth50" onClick={() => setShowDiv("")}>
								Return
							</button> */}
						</div>
					</div>
				</div>
			)}

			{showDiv === "feats" && (
				<div className="featSelectionDiv">
					<div className="showDiv">
						<div className="opacity"></div>
						<div className="divSelection subDivSelection">{showDiv === "feats" && <FeatsSection feats={feats} addFeatToCharacter={addFeatToCharacter} />}</div>
					</div>
				</div>
			)}

			<div className="wrapper">
				<h1>The Forge</h1>

				<div id="promptCancel">
					<p>Are you sure you want to cancel the creation of your character?</p>
					<p style={{ color: "red" }}>If you do so, you will lose all your progress.</p>

					<div className="btnContainer">
						<button className="btn btnYes" onClick={returnToHome}>
							Yes
						</button>
						<button className="btn btnNo" onClick={() => ((document.getElementById("promptCancel") as HTMLDivElement).style.display = "none")}>
							No
						</button>
					</div>
				</div>

				<button className="btn btnCancel" onClick={promptCancel}>
					Cancel
				</button>

				<div className="or">---</div>

				{step === 0 && (
					<div className="step step0">
						<h2>Step 1: Forge your core</h2>

						<input type="text" placeholder="Name" onChange={(e) => setCharacter({ ...character, name: e.target.value })} value={character.name} />

						<div className="subSectionCreation">
							<label htmlFor="level" className="labelCreation">
								Pick your starting level
							</label>
							<small>P.S. You will be able to change it after you saved your character.</small>
							<div className="numberInput">
								<button className="decrement" onClick={removeInput}>
									-
								</button>
								<input type="number" min="1" max="20" id="level" value={character.level} />
								<button className="increment" onClick={addInput}>
									+
								</button>
							</div>
						</div>

						<div className="subSectionCreation">
							<label htmlFor="race" className="labelCreation">
								Pick your race
							</label>
							<button className="btn" onClick={() => showDivSelection("races")}>
								{character.race || "View all races"}
							</button>
						</div>

						<div className="subSectionCreation">
							<label htmlFor="class" className="labelCreation">
								Pick your class
							</label>
							<button className="btn" onClick={() => showDivSelection("classes")}>
								{character.class || "View all classes"}
							</button>
						</div>

						<div className="or">---</div>

						<p style={{ color: "red" }}>{message}</p>
						<button className="btn btnNext" onClick={goNext}>
							Next
						</button>
					</div>
				)}

				{step === 1 && (
					<div className="step step1">
						<h2>Step 2: Forge your identity</h2>

						<div className="subSectionCreation">
							<label htmlFor="alignment" className="labelCreation">
								Pick your subclass
							</label>
							<button className="btn" onClick={() => showDivSelection("subclasses")}>
								{character.subclass || "View all subclasses"}
							</button>
						</div>

						<div className="subSectionCreation">
							<label htmlFor="alignment" className="labelCreation">
								Pick your subrace
							</label>
							<button className="btn" onClick={() => showDivSelection("subraces")}>
								{character.subrace || "View all subraces"}
							</button>
						</div>

						<div className="subSectionCreation">
							<label htmlFor="background" className="labelCreation">
								Choose your background
							</label>
							<button className="btn" onClick={() => showDivSelection("backgrounds")}>
								{character.background || "View all backgrounds"}
							</button>
						</div>

						<div className="subSectionCreation">
							<label htmlFor="alignment" className="labelCreation">
								Enter your alignment <button className="btn info"></button>
							</label>

							<input type="text" placeholder="optional" />
						</div>

						<div className="or">---</div>

						<p style={{ color: "red" }}>{message}</p>

						<div className="btnContainerCreation">
							<button className="btn btnBack" onClick={goBack}>
								Back
							</button>
							<button className="btn btnNext" onClick={goNext}>
								Next
							</button>
						</div>
					</div>
				)}

				{step === 2 && (
					<div className="step step2">
						<div className="btnContainerCreation">
							<h2>Step 3: Craft your base stats</h2>
							<button className="btn info"></button>
						</div>

						<div className="subSectionCreation">
							<p>Method of stat building:</p>

							<div className="radioContainer">
								<div className="radio">
									<input type="radio" name="method" id="method1" onClick={() => changeMethod("roll")} />
									<label htmlFor="method1">Roll</label>
								</div>
								<div className="radio">
									<input type="radio" name="method" id="method2" onClick={() => changeMethod("point")} />
									<label htmlFor="method1">Point Buy</label>
								</div>
								<div className="radio">
									<input type="radio" name="method" id="method3" onClick={() => changeMethod("custom")} />
									<label htmlFor="method2">Custom</label>
								</div>
							</div>
						</div>

						{method === "roll" && (
							<div className="subSectionCreation">
								<p style={{ color: "green" }}>This option is if you want us to roll 4d6 for you and pick the 3 highest dice:</p>
								<div className="or">-</div>
								<Stats props={"roll"} updateStats={updateStats} />
							</div>
						)}

						{method === "point" && (
							<div className="subSectionCreation">
								<p style={{ color: "green" }}>This option is if you want to build your stats using the 27 points system:</p>
								<div className="or">-</div>
								<Stats props={"point"} updateStats={updateStats} validPointBuy={validPointBuy} />
							</div>
						)}

						{method === "custom" && (
							<div className="subSectionCreation">
								<p style={{ color: "green" }}>This option is if you want to pick your own stats or roll them with your dice:</p>
								<div className="or">-</div>
								<Stats props={"custom"} updateStats={updateStats} />
							</div>
						)}

						<p style={{ color: "red" }}>{message}</p>
						<div className="btnContainerCreation">
							<button className="btn btnBack" onClick={goBack}>
								Back
							</button>
							<button className="btn btnNext" onClick={goNext}>
								Next
							</button>
						</div>
					</div>
				)}

				{step === 3 && (
					<div className="step step3">
						<h2>Step 4: Add your stat bonuses</h2>
						<small>
							You've set your character's stats! Traditionally, races added +2 to one stat and +1 to another, but newer rules tie these bonuses to backgrounds. We allow you to choose where to apply your bonuses, but consult your DM if stricter rules are in
							play.
						</small>
						<div className="subSectionCreation">
							<p>Select two stats to increase by +2 and +1 (or distribute as three +1s):</p>
							<div className="numberInput subSectionMap">
								{Object.entries(character.stats).map(([statName, statValue]) => (
									<div key={statName} className="stat">
										<label>
											<strong>{statName.charAt(0).toUpperCase() + statName.slice(1)}</strong>: {statValue}
										</label>
										<div className="bonusButtons">
											<button className="decrement" onClick={() => addBonus(1, statName as keyof typeof initialStats)} disabled={bonusPoints < 1}>
												+1
											</button>
											<button className="increment" onClick={() => addBonus(2, statName as keyof typeof initialStats)} disabled={bonusPoints < 2}>
												+2
											</button>
										</div>
									</div>
								))}
								<button className="btn resetBtn redReset" onClick={resetBonus}>
									Reset Bonuses and feats
								</button>
							</div>
						</div>
						<div className="or">-</div>
						{character.level >= 4 && (
							<div className="subSectionCreation featsSection">
								<p>
									Your character is also level {character.level}, which means it can either get {Math.floor(character.level / 4)} feat(s) or ability score improvement (ASI).
								</p>
								<p>Vous pouvez avoir +2 points à ajouter à vos stats plus haut ou bien obtenir un Feat à certains paliers de niveaux de classe.</p>
								{[4, 8, 12, 16, 19].map(
									(lvl) =>
										character.level >= lvl && (
											<div key={lvl} className="btnContainerCreation">
												<p>Level {lvl}:</p>
												<button className="btn btnFeat" onClick={() => handleFeatSelection(lvl)} disabled={selectedLevels[lvl] !== null}>
													{selectedLevels[lvl] === "feat" ? "Feat Selected" : "Feat"}
												</button>
												<button className="btn btnFeat" onClick={() => handleASI(lvl)} disabled={selectedLevels[lvl] !== null}>
													{selectedLevels[lvl] === "asi" ? "ASI Selected" : "ASI"}
												</button>
											</div>
										)
								)}
							</div>
						)}

						<p style={{ color: "red" }}>{message}</p>

						<div className="btnContainerCreation">
							<button className="btn btnBack" onClick={goBack}>
								Back
							</button>
							<button className="btn btnNext" onClick={goNext}>
								Next
							</button>
						</div>
					</div>
				)}

				{step === 4 && (
					<div className="step step4">
						<h2>Step 5: Polish your identity</h2>
						<div className="subSectionCreation">
							<p>Note that usually those stats are related to your class, although, we want to let you choose them more freely in case your DM is more flexible about them.</p>
							<p style={{ color: "darkgreen" }}>You can always edit those sections later.</p>
						</div>

						<div className="subSectionCreation">
							<p>Select your character's proficiencies:</p>
							<button className="btn maxWidth50">View all Proficiencies</button>
							<small>
								View your class proficiencies on <a onClick={() => window.open("https://www.dndbeyond.com/classes", "_blank")}>dndbeyond.com</a> to know which one are available for your character usually. Typically, you get 2 from a small list.
							</small>
						</div>

						<div className="subSectionCreation">
							<p>Choose your character's languages:</p>
							<button className="btn maxWidth50">View all Languages</button>
							<small>Typically, your character knows Common and 1-2 more languages.</small>
						</div>

						<div className="subSectionCreation">
							<p>Choose your character's equipment:</p>
							<button className="btn maxWidth50">View all Equipment</button>
							<small>Typically, you'd have the base equipment for your class. But your DM and level could decide otherwise.</small>
						</div>

						<div className="btnContainerCreation">
							<button className="btn btnBack" onClick={goBack}>
								Back
							</button>
							<button className="btn btnNext" onClick={goNext}>
								Next
							</button>
						</div>
					</div>
				)}

				{step === 5 && (
					<div className="step step5">
						<h2>You are almost there!</h2>
						<p>This is the last step before creating your character.</p>

						<div className="subSectionCreation">
							<p>Enter your starting items:</p>
							<textarea className="inputCreation" placeholder="Enter any items and gold you may have"></textarea>
							<small>You should discuss your starting items with your DM.</small>
						</div>

						<div className="subSectionCreation">
							<p>Enter your character's starting gold:</p>
							<input type="text" className="inputCreation" placeholder="Enter your character's starting gold" />
							<small>You should discuss your starting gold with your DM.</small>
						</div>

						<div className="subSectionCreation">
							<p>Add a description about your character and its personality:</p>
							<textarea className="inputCreation" placeholder="Enter your character's description here..."></textarea>
						</div>

						<div className="subSectionCreation">
							<p>Add a backstory for your character:</p>
							<textarea className="inputCreation" placeholder="Enter your character's backstory here..."></textarea>
						</div>

						<div className="btnContainerCreation">
							<button className="btn btnBack" onClick={goBack}>
								Back
							</button>
							<button className="btn btnNext" onClick={goNext}>
								Next
							</button>
						</div>
					</div>
				)}

				{step === 6 && (
					<div className="step step6">
						<h2>You are done!</h2>
						<div className="subSectionCreation">
							<h3>Character Overview</h3>
							<p>
								<strong>Name:</strong> <input type="text" value={character.name} onChange={(e) => setCharacter({ ...character, name: e.target.value })} />
							</p>
							<p>
								<strong>Race:</strong> <input type="text" value={character.race} onChange={(e) => setCharacter({ ...character, race: e.target.value })} />
							</p>
							<p>
								<strong>Subrace:</strong> <input type="text" value={character.subrace} onChange={(e) => setCharacter({ ...character, subrace: e.target.value })} />
							</p>
							<p>
								<strong>Class:</strong> <input type="text" value={character.class} onChange={(e) => setCharacter({ ...character, class: e.target.value })} />
							</p>
							<p>
								<strong>Subclass:</strong> <input type="text" value={character.subclass} onChange={(e) => setCharacter({ ...character, subclass: e.target.value })} />
							</p>
							<p>
								<strong>Background:</strong> <input type="text" value={character.background} onChange={(e) => setCharacter({ ...character, background: e.target.value })} />
							</p>
							<p>
								<strong>Alignment:</strong> <input type="text" value={character.alignment || "Unknown"} onChange={(e) => setCharacter({ ...character, alignment: e.target.value })} />
							</p>

							<h4>Stats:</h4>
							<ul style={{ listStyleType: "none" }}>
								{Object.entries(character.stats).map(([statName, statValue]) => (
									<li key={statName}>
										<strong>{statName.charAt(0).toUpperCase() + statName.slice(1)}:</strong> {statValue}
									</li>
								))}
							</ul>

							<p>
								<strong>Hit Points:</strong> <input type="number" value={character.hitPoints} onChange={(e) => setCharacter({ ...character, hitPoints: parseInt(e.target.value) })} />
							</p>
							<p>
								<strong>Hit Die:</strong> <input type="number" value={character.hitDie} onChange={(e) => setCharacter({ ...character, hitDie: parseInt(e.target.value) })} />
							</p>
							<p>
								<strong>Armor Class:</strong> <input type="number" value={character.armorClass} onChange={(e) => setCharacter({ ...character, armorClass: parseInt(e.target.value) })} />
							</p>
							<p>
								<strong>Initiative:</strong> <input type="number" value={character.initiative} onChange={(e) => setCharacter({ ...character, initiative: parseInt(e.target.value) })} />
							</p>
							<p>
								<strong>Speed:</strong> <input type="number" value={character.speed} onChange={(e) => setCharacter({ ...character, speed: parseInt(e.target.value) })} />
							</p>
							<p>
								<strong>Gold:</strong> <input type="number" value={character.gold} onChange={(e) => setCharacter({ ...character, gold: parseInt(e.target.value) })} />
							</p>

							<button className="btn" onClick={() => console.log("Character saved:", character)}>
								Save Changes
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CharacterCreation;
