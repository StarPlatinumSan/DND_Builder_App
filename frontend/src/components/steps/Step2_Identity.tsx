// steps/Step2_Identity.tsx
import React from "react";
import { Race, Class, Background, Character } from "../../types";

interface Step2_IdentityProps {
	character: Character;
	setCharacter: React.Dispatch<React.SetStateAction<Character>>;
	backgrounds: Background[];
	races: Race[];
	classes: Class[];
	goNext: () => void;
	goBack: () => void;
	message: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
	showDivSelection: (name: string) => void;
}

const Step2_Identity: React.FC<Step2_IdentityProps> = ({ character, setCharacter, backgrounds, races, classes, goNext, goBack, message, setMessage, showDivSelection }) => {
	return (
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
				<input type="text" placeholder="optional" value={character.alignment} onChange={(e) => setCharacter({ ...character, alignment: e.target.value })} />
			</div>

			<div className="or">---</div>

			{message && <p style={{ color: "red" }}>{message}</p>}

			<div className="btnContainerCreation">
				<button className="btn btnBack" onClick={goBack}>
					Back
				</button>
				<button className="btn btnNext" onClick={goNext}>
					Next
				</button>
			</div>
		</div>
	);
};

export default Step2_Identity;
