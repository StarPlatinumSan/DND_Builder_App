import React, { useEffect, useState } from "react";
import { supabase } from "../client/supabaseClient";
import axios from "../client/apiClient";
import Stats from "../components/Stats";

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
	subraces?: subraces[];
}

const CharacterCreation = () => {
	const [step, setStep] = useState(0);
	const [method, setMethod] = useState("");
	const [bonusPoints, setBonusPoints] = useState(3);
	const [message, setMessage] = useState("");
	const [showDiv, setShowDiv] = useState("");
	const [races, setRaces] = useState<Race[]>([]);
	const [error, setError] = useState("");

	const [character, setCharacter] = useState({
		level: 1,
		name: "",
		race: "",
		class: "",
		subclass: "",
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
	});

	const [initialStats, setInitialStats] = useState({
		strength: 0,
		dexterity: 0,
		constitution: 0,
		intelligence: 0,
		wisdom: 0,
		charisma: 0,
	});

	const [selectedLevels, setSelectedLevels] = useState<{ [key: number]: boolean }>({
		4: false,
		8: false,
		12: false,
		16: false,
		19: false,
	});

	const handleFeatClick = (level: number) => {
		setSelectedLevels((prev) => ({
			...prev,
			[level]: true,
		}));
	};

	const handleASI = (level: number) => {
		setSelectedLevels((prev) => ({
			...prev,
			[level]: !prev[level],
		}));
		setBonusPoints((prev) => prev + 2);
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
		if (validateStep()) setStep((prev) => prev + 1);
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
				for (const statValue of Object.values(character.stats)) {
					if (statValue === 0) {
						setMessage("Please fill in all the fields.");
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
		}));
	};

	const removeGold = () => {
		if (character.gold <= 0) return;
		setCharacter((prev) => ({
			...prev,
			gold: prev.gold - 1,
		}));
	};

	const addGold = () => {
		setCharacter((prev) => ({
			...prev,
			gold: prev.gold + 1,
		}));
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
		}
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
				} /* else {
					setRaces(data as Race[]);
					console.log(races);
				} */

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
		}
	}, [showDiv]);

	return (
		<div className="characterCreationContainer">
			{showDiv === "races" && (
				<div className="raceSelectionDiv">
					<div className="showDiv allRaces">
						<div className="opacity"></div>
						<div className="divSelection races">
							<h2>Select a race</h2>
							{races.length === 0 && <p>No races found</p>}

							{races.map((race) => (
								<div key={race.id}>
									<h3>{race.name}</h3>
									<p>{race.description}</p>
									{race.subraces && race.subraces.length > 0 && (
										<ul>
											{race.subraces.map((subrace) => (
												<li key={subrace.race_id}>
													<h4>{subrace.name}</h4>
												</li>
											))}
										</ul>
									)}
								</div>
							))}
						</div>
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
								View all races
							</button>
						</div>

						<div className="subSectionCreation">
							<label htmlFor="class" className="labelCreation">
								Pick your class
							</label>
							<button className="btn">View all classes</button>
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
							<button className="btn">View all your subclasses</button>
						</div>

						<div className="subSectionCreation">
							<label htmlFor="background" className="labelCreation">
								Choose your background
							</label>
							<button className="btn">View all backgrounds</button>
						</div>

						<div className="subSectionCreation">
							<label htmlFor="alignment" className="labelCreation">
								Enter your alignment
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
								<Stats props={"point"} updateStats={updateStats} />
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
								<button className="btn resetBtn" onClick={resetBonus}>
									Reset Bonuses
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
												Level {lvl}:
												<button className="btn btnFeat" onClick={() => handleFeatClick(lvl)} disabled={selectedLevels[lvl]}>
													Feat
												</button>
												<button className="btn btnFeat" onClick={() => handleASI(lvl)} disabled={selectedLevels[lvl]}>
													ASI
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
							<p>This is the last step before creating your character.</p>
							<p>Note that usually those stats are related to your class, although, we want to let you choose them more freely in case your DM is more flexible about them.</p>
							<p style={{ color: "darkgreen" }}>You can always edit those sections later.</p>
						</div>

						<div className="or">-</div>

						<div className="subSectionCreation">
							<p>Select your character's proficiencies:</p>
							<button className="btn maxWidth50">View all Proficiencies</button>
							<small>
								View your class proficiencies on <a onClick={() => window.open("https://www.dndbeyond.com/classes", "_blank")}>dndbeyond.com</a> to know which one are available for your character usually. Typically, you get 2 from a small list.
							</small>
						</div>

						<div className="or">-</div>

						<div className="subSectionCreation">
							<p>Choose your character's languages:</p>
							<button className="btn maxWidth50">View all Languages</button>
							<small>Typically, your character knows Common and 1-2 more languages.</small>
						</div>

						<div className="or">-</div>

						<div className="subSectionCreation">
							<p>Choose your character's equipment:</p>
							<button className="btn maxWidth50">View all Equipment</button>
							<small>Typically, you'd have the base equipment for your class. But your DM and level could decide otherwise.</small>
						</div>

						<div className="subSectionCreation">
							<p>Select your starting gold:</p>
							<div className="numberInput">
								<button className="decrement" onClick={removeGold}>
									-
								</button>
								<input type="number" min="1" max="20" id="gold" value={character.gold} />
								<button className="increment" onClick={addGold}>
									+
								</button>
							</div>
							<p>Enter your starting items:</p>
							<textarea className="inputCreation" placeholder="Enter any items you may have"></textarea>
							<small>You should discuss your starting gold and items with your DM.</small>
						</div>

						<div className="or">-</div>

						<div className="subSectionCreation">
							<p>Add a description about your character and its personality:</p>
							<textarea className="inputCreation" placeholder="Enter your character's description here..."></textarea>
						</div>

						<div className="or">-</div>

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
						<h2>Step 6: Select your spells</h2>
						<div className="subSectionCreation">
							<p>If your character is a full-caster.</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CharacterCreation;
