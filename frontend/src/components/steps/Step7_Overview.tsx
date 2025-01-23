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
	};

	return (
		<div className="step step6">
			<h2>You are almost there!</h2>
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
