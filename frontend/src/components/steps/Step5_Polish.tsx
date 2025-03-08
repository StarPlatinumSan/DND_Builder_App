import React from "react";
import { Character } from "../../types";

interface Step5_PolishProps {
	character: Character;
	setCharacter: React.Dispatch<React.SetStateAction<Character>>;
	goNext: () => void;
	goBack: () => void;
	message: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const Step5_Polish: React.FC<Step5_PolishProps> = ({ character, setCharacter, goNext, goBack, message, setMessage }) => {
	const handleProficiencies = () => {};

	const handleLanguages = () => {};

	const handleEquipment = () => {};

	return (
		<div className="step step4">
			<h2>Step 5: Polish your identity</h2>
			<div className="subSectionCreation">
				<p>Select your character's proficiencies:</p>
				<input type="text" placeholder="Enter proficiencies" onClick={handleProficiencies}></input>
				<small>
					View your class proficiencies on{" "}
					<a href="https://www.dndbeyond.com/classes" target="_blank" rel="noopener noreferrer">
						dndbeyond.com
					</a>{" "}
					to know which ones are available for your character usually. Typically, you get 2 from a small list.
				</small>
			</div>

			<div className="subSectionCreation">
				<p>Enter your character's languages:</p>
				<input type="text" placeholder="Enter languages" onClick={handleLanguages}></input>
				<small>Typically, your character knows Common and 1-2 more languages.</small>
			</div>

			<div className="subSectionCreation">
				<p>Enter your character's equipment:</p>
				<input type="text" placeholder="Enter equipment" onClick={handleEquipment}></input>
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
	);
};

export default Step5_Polish;
