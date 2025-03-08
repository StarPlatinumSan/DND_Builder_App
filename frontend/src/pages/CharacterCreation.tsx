import React, { useEffect, useState } from "react";
import { supabase } from "../client/supabaseClient";
import Step1_Core from "../components/steps/Step1_Core";
import Step2_Identity from "../components/steps/Step2_Identity";
import Step3_Stats from "../components/steps/Step3_Stats";
import Step4_Bonus from "../components/steps/Step4_Bonus";
import Step5_Polish from "../components/steps/Step5_Polish";
import Step6_Finalize from "../components/steps/Step6_Finalize";
import Step7_Overview from "../components/steps/Step7_Overview";
import FeatsSection from "../components/FeatsSection";
import ProgressBar from "../components/ProgressBar";
import { Character, Race, Class, Background, Feat } from "../types";

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
			strength: 8,
			dexterity: 8,
			constitution: 8,
			intelligence: 8,
			wisdom: 8,
			charisma: 8,
		},
		hitPoints: 0,
		hitDie: 0,
		armorClass: 0,
		initiative: 0,
		speed: 0,
		gold: "0",
		skills: [],
		proficiencies: [],
		equipment: [],
		languages: [],
		traits: [],
		features: [],
		subFeatures: [],
		feats: [],
		spells: [],
		description: "",
	});

	const [initialStats, setInitialStats] = useState(character.stats);

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
		Tiefling: "/Tiefling.jpg",
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
		}
	};

	const goBack = () => {
		setStep((prev) => prev - 1);
		cleanUp();
	};

	const cleanUp = () => {
		setMethod("");
		setCharacter((prev) => ({
			...prev,
			stats: {
				strength: 0,
				dexterity: 0,
				constitution: 0,
				intelligence: 0,
				wisdom: 0,
				charisma: 0,
			},
		}));
	};

	const validateStep = (): boolean => {
		switch (step) {
			case 0:
				if (character.name === "" || character.race === "" || character.class === "") {
					setMessage("Please fill in all the fields and select a race and a class.");
					setTimeout(() => {
						setMessage("");
					}, 3000);
					return false;
				}
				break;
			case 1:
				break;
			case 2:
				if (method === "") {
					setMessage("Please select a stats method.");
					setTimeout(() => {
						setMessage("");
					}, 3000);
					return false;
				}

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
						setMessage("Please assign all rolled values to your stats.");
						setTimeout(() => {
							setMessage("");
						}, 3000);
						return false;
					}
				}
				break;
			case 3: {
				const requiredLevels = [4, 8, 12, 16, 19].map((level) => (character.level >= level ? level : null)).filter((level): level is number => level !== null);
				const unselectedLevels = requiredLevels.filter((lvl) => !selectedLevels[lvl]);
				if (bonusPoints > 0) {
					setMessage("Please distribute your bonus points.");
					setTimeout(() => {
						setMessage("");
					}, 3000);
					return false;
				}
				if (unselectedLevels.length > 0) {
					setMessage(`Please make a selection for level: ${unselectedLevels.join(", ")}`);
					setTimeout(() => {
						setMessage("");
					}, 3000);
					return false;
				}
				break;
			}
		}
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
				},
			],
		}));
		setShowDiv("");
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
		setShowDiv(name);
	};

	const validPointBuy = (isValid: boolean): boolean => {
		setIsPointBuyValid(isValid);
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
					setRaces([]);
					return;
				}
				if (!Array.isArray(data) || data.length === 0) {
					setRaces([]);
					return;
				}
				setRaces(data as Race[]);
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
					console.log("Error fetching classes:", error);
				}
				if (!data) {
					setClasses([]);
					return;
				}
				if (!Array.isArray(data) || data.length === 0) {
					setClasses([]);
					return;
				}
				setClasses(data as Class[]);
			};
			fetchClasses();
		} else if (showDiv === "backgrounds") {
			const fetchBackgrounds = async () => {
				const { data, error } = await supabase.from("backgrounds").select("*");
				if (error) {
					console.log("Error fetching backgrounds:", error);
				}
				if (!data) {
					setBackgrounds([]);
					return;
				}
				if (!Array.isArray(data) || data.length === 0) {
					setBackgrounds([]);
					return;
				}
				setBackgrounds(data as Background[]);
			};
			fetchBackgrounds();
		} else if (showDiv === "feats") {
			const fetchFeats = async () => {
				const { data, error } = await supabase.from("feats").select("*");
				if (error) {
					console.log("Error fetching feats:", error);
				}
				if (!data) {
					setFeats([]);
					return;
				}
				if (!Array.isArray(data) || data.length === 0) {
					setFeats([]);
					return;
				}
				setFeats(data as Feat[]);
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
						</div>
					</div>
				</div>
			)}

			{showDiv === "feats" && (
				<div className="featSelectionDiv">
					<div className="showDiv">
						<div className="opacity"></div>
						<div className="divSelection subDivSelection">
							<FeatsSection feats={feats} addFeatToCharacter={addFeatToCharacter} onClose={() => setShowDiv("")} />
						</div>
					</div>
				</div>
			)}

			<div className="wrapper">
				<h1>The Forge</h1>

				<ProgressBar currentStep={step} totalSteps={7} />

				<div id="promptCancel" className="promptCancel" style={{ display: "none" }}>
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

				{step === 0 && <Step1_Core character={character} setCharacter={setCharacter} races={races} classes={classes} goNext={goNext} message={message} setMessage={setMessage} showDivSelection={showDivSelection} />}

				{step === 1 && (
					<Step2_Identity character={character} setCharacter={setCharacter} backgrounds={backgrounds} races={races} classes={classes} goNext={goNext} goBack={goBack} message={message} setMessage={setMessage} showDivSelection={showDivSelection} />
				)}

				{step === 2 && <Step3_Stats character={character} setCharacter={setCharacter} goNext={goNext} goBack={goBack} message={message} setMessage={setMessage} changeMethod={changeMethod} method={method} validPointBuy={validPointBuy} />}

				{step === 3 && (
					<Step4_Bonus
						character={character}
						setCharacter={setCharacter}
						feats={feats}
						goNext={goNext}
						goBack={goBack}
						message={message}
						setMessage={setMessage}
						bonusPoints={bonusPoints}
						addBonus={addBonus}
						resetBonus={resetBonus}
						handleASI={handleASI}
						handleFeatSelection={handleFeatSelection}
						selectedLevels={selectedLevels}
					/>
				)}

				{step === 4 && <Step5_Polish character={character} setCharacter={setCharacter} goNext={goNext} goBack={goBack} message={message} setMessage={setMessage} />}

				{step === 5 && <Step6_Finalize character={character} setCharacter={setCharacter} goNext={goNext} goBack={goBack} message={message} setMessage={setMessage} />}

				{step === 6 && <Step7_Overview character={character} setCharacter={setCharacter} goBack={goBack} goNext={goNext} message={message} setMessage={setMessage} />}
			</div>
		</div>
	);
};

export default CharacterCreation;
