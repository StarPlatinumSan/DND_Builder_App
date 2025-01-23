import React from "react";
import { Feat, Character } from "../../types";

interface Step4_BonusProps {
	character: Character;
	setCharacter: React.Dispatch<React.SetStateAction<Character>>;
	feats: Feat[];
	goNext: () => void;
	goBack: () => void;
	message: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
	bonusPoints: number;
	addBonus: (value: number, stat: string) => void;
	resetBonus: () => void;
	handleASI: (level: number) => void;
	handleFeatSelection: (level: number) => void;
	selectedLevels: { [key: number]: string | null };
}

const Step4_Bonus: React.FC<Step4_BonusProps> = ({ character, setCharacter, feats, goNext, goBack, message, setMessage, bonusPoints, addBonus, resetBonus, handleASI, handleFeatSelection, selectedLevels }) => {
	return (
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
								<button className="decrement" onClick={() => addBonus(1, statName)} disabled={bonusPoints < 1}>
									+1
								</button>
								<button className="increment" onClick={() => addBonus(2, statName)} disabled={bonusPoints < 2}>
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
					<p>You can either add +2 points to your stats or obtain a Feat at certain class level milestones.</p>
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
	);
};

export default Step4_Bonus;
