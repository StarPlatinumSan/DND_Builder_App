import React, { useState } from "react";
import Stats from "../components/Stats";

const CharacterCreation = () => {
	const [step, setStep] = useState(0);
	const [method, setMethod] = useState("");
	const [message, setMessage] = useState("");

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

	const updateStats = (newStats: { [key: string]: number }) => {
		setCharacter((prevCharacter) => ({
			...prevCharacter,
			stats: {
				...prevCharacter.stats,
				...newStats,
			},
		}));
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

	return (
		<div className="characterCreationContainer">
			<div className="wrapper">
				<h1>Welcome to your Forge</h1>

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
								<input type="number" min="1" max="20" value={character.level} />
								<button className="increment" onClick={addInput}>
									+
								</button>
							</div>
						</div>

						<div className="subSectionCreation">
							<label htmlFor="race" className="labelCreation">
								Pick your race
							</label>
							<button className="btn">View all races</button>
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
							<label htmlFor="alignment" className="labelCreation">
								Choose your alignment
							</label>
							<input type="text" placeholder="optional" />
						</div>

						<div className="subSectionCreation">
							<label htmlFor="background" className="labelCreation">
								Pick your background
							</label>
							<button className="btn">View all backgrounds</button>
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

						{method === "pointBuy" && (
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
			</div>
		</div>
	);
};

export default CharacterCreation;
