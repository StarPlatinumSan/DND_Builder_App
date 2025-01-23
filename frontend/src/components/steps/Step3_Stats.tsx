// steps/Step3_Stats.tsx
import React from "react";
import Stats from "../Stats";
import { Character } from "../../types";

interface Step3_StatsProps {
	character: Character;
	setCharacter: React.Dispatch<React.SetStateAction<Character>>;
	goNext: () => void;
	goBack: () => void;
	message: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
	changeMethod: (method: string) => void;
	method: string;
	validPointBuy: (isValid: boolean) => boolean;
}

const Step3_Stats: React.FC<Step3_StatsProps> = ({ character, setCharacter, goNext, goBack, message, setMessage, changeMethod, method, validPointBuy }) => {
	const handleUpdateStats = (newStats: { [key: string]: number }) => {
		setCharacter((prev) => ({
			...prev,
			stats: {
				...prev.stats,
				...newStats,
			},
		}));
	};

	return (
		<div className="step step2">
			<div className="btnContainerCreation">
				<h2>Step 3: Craft your base stats</h2>
				<button className="btn info"></button>
			</div>

			<div className="subSectionCreation">
				<p>Method of stat building:</p>
				<div className="radioContainer">
					<div className="radio">
						<input type="radio" name="method" id="method1" onClick={() => changeMethod("roll")} checked={method === "roll"} />
						<label htmlFor="method1">Roll</label>
					</div>
					<div className="radio">
						<input type="radio" name="method" id="method2" onClick={() => changeMethod("point")} checked={method === "point"} />
						<label htmlFor="method2">Point Buy</label>
					</div>
					<div className="radio">
						<input type="radio" name="method" id="method3" onClick={() => changeMethod("custom")} checked={method === "custom"} />
						<label htmlFor="method3">Custom</label>
					</div>
				</div>
			</div>

			<Stats props={method} updateStats={handleUpdateStats} validPointBuy={validPointBuy} />

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

export default Step3_Stats;
