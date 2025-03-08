// steps/Step6_Finalize.tsx
import React from "react";
import { Character } from "../../types";

interface Step6_FinalizeProps {
	character: Character;
	setCharacter: React.Dispatch<React.SetStateAction<Character>>;
	goNext: () => void;
	goBack: () => void;
	message: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const Step6_Finalize: React.FC<Step6_FinalizeProps> = ({ character, setCharacter, goNext, goBack, message, setMessage }) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		if (name === "gold") {
			setCharacter((prev) => ({
				...prev,
				gold: value,
			}));
		} else if (name === "equipment") {
			setCharacter((prev) => ({
				...prev,
				equipment: value.split(",").map((item) => item.trim()),
			}));
		} else if (name === "description") {
			setCharacter((prev) => ({
				...prev,
				description: value,
			}));
		} else if (name === "backstory") {
			setCharacter((prev) => ({
				...prev,
				description: value,
			}));
		}
	};

	return (
		<div className="step step5">
			<h2>Step 6: Finalize your character</h2>
			<div className="subSectionCreation">
				<p>Enter your starting items:</p>
				<textarea className="inputCreation" placeholder="Enter any items and gold you may have" name="equipment" value={character.equipment.join(", ")} onChange={handleChange}></textarea>
				<small>You should discuss your starting items with your DM.</small>
			</div>

			<div className="subSectionCreation">
				<p>Enter your character's starting gold:</p>
				<input type="text" className="inputCreation" placeholder="Enter your character's starting gold" name="gold" value={character.gold} onChange={handleChange} />
				<small>You should discuss your starting gold with your DM.</small>
			</div>

			<div className="subSectionCreation">
				<p>Add a description about your character and its personality:</p>
				<textarea className="inputCreation" placeholder="Enter your character's description here..." name="description" value={character.description} onChange={handleChange}></textarea>
			</div>

			<div className="subSectionCreation">
				<p>Add a backstory for your character:</p>
				<textarea
					className="inputCreation"
					placeholder="Enter your character's backstory here..."
					name="backstory"
					value={character.description}
					onChange={(e) =>
						setCharacter((prev) => ({
							...prev,
							description: e.target.value,
						}))
					}
				></textarea>
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

export default Step6_Finalize;
