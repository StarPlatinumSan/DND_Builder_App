// steps/Step7_Overview.tsx
import React from "react";
import { Character } from "../../types";

interface Step7_OverviewProps {
	character: Character;
	setCharacter: React.Dispatch<React.SetStateAction<Character>>;
	goBack: () => void;
	goNext: () => void;
	message: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const Step7_Overview: React.FC<Step7_OverviewProps> = ({ character, setCharacter, goBack, goNext, message, setMessage }) => {
	const handleSave = () => {
		console.log("Character saved:", character);
		// If you have some actual save functionality, call it here
	};

	return (
		<div className="step step7">
			<h2>You are almost there!</h2>
			<div className="subSectionCreation">
				<h3>Character Overview</h3>
				<p>
					<strong>Name:</strong> {character.name}
				</p>
				<p>
					<strong>Race:</strong> {character.race}
				</p>
				<p>
					<strong>Subrace:</strong> {character.subrace}
				</p>
				<p>
					<strong>Class:</strong> {character.class}
				</p>
				<p>
					<strong>Subclass:</strong> {character.subclass}
				</p>
				<p>
					<strong>Background:</strong> {character.background}
				</p>
				<p>
					<strong>Alignment:</strong> {character.alignment || "Unknown"}
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
					<strong>Hit Points:</strong> {character.hitPoints}
				</p>
				<p>
					<strong>Hit Die:</strong> {character.hitDie}
				</p>
				<p>
					<strong>Armor Class:</strong> {character.armorClass}
				</p>
				<p>
					<strong>Initiative:</strong> {character.initiative}
				</p>
				<p>
					<strong>Speed:</strong> {character.speed}
				</p>
				<p>
					<strong>Gold:</strong> {character.gold}
				</p>

				<button className="btn" onClick={handleSave}>
					Save Changes
				</button>
			</div>

			<div className="btnContainerCreation">
				<button className="btn btnBack" onClick={goBack}>
					Back
				</button>
				<button className="btn btnNext" onClick={goNext}>
					Finish
				</button>
			</div>

			{message && <p style={{ color: "red" }}>{message}</p>}
		</div>
	);
};

export default Step7_Overview;
