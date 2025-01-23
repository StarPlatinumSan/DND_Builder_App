import React from "react";
import { Race, Class, Character } from "../../types";

interface Step1_CoreProps {
	character: Character;
	setCharacter: React.Dispatch<React.SetStateAction<Character>>;
	races: Race[];
	classes: Class[];
	goNext: () => void;
	message: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
	showDivSelection: (name: string) => void;
}

const Step1_Core: React.FC<Step1_CoreProps> = ({ character, setCharacter, races, classes, goNext, message, setMessage, showDivSelection }) => {
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

	return (
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
					<input type="number" min="1" max="20" id="level" value={character.level} readOnly />
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

			{message && <p style={{ color: "red" }}>{message}</p>}
			<button className="btn btnNext" onClick={goNext}>
				Next
			</button>
		</div>
	);
};

export default Step1_Core;
