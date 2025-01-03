import React, { useState } from "react";

interface StatsProps {
	props: string;
	updateStats: (newStats: { [key: string]: number }) => void;
}

interface Assignments {
	[key: string]: number | null;
}

const Stats: React.FC<StatsProps> = ({ props, updateStats }) => {
	const [assignments, setAssignments] = useState<Assignments>({
		strength: null,
		dexterity: null,
		constitution: null,
		intelligence: null,
		wisdom: null,
		charisma: null,
	});

	const [rolls, setRoll] = useState<number[]>([]);

	const total = () => {
		const total = [];
		for (let i = 0; i < 4; i++) {
			total.push(Math.floor(Math.random() * 6) + 1);
		}

		total.sort((a, b) => a - b);
		total.shift();

		return total.reduce((sum, val) => sum + val, 0);
	};

	const rollDice = () => {
		const newRolls = [total(), total(), total(), total(), total(), total()];
		setRoll(newRolls);
		setAssignments({
			strength: null,
			dexterity: null,
			constitution: null,
			intelligence: null,
			wisdom: null,
			charisma: null,
		});
	};

	const handleAssign = (stat: string, rollIndex: number) => {
		setAssignments((prevAssignments) => {
			const updatedAssignments = {
				...prevAssignments,
				[stat]: rollIndex,
			};

			const newStats = Object.fromEntries(Object.entries(updatedAssignments).map(([key, value]) => [key, value !== null ? rolls[value] : 0]));
			updateStats(newStats);

			return updatedAssignments;
		});
	};

	const resetSelections = () => {
		setAssignments({
			strength: null,
			dexterity: null,
			constitution: null,
			intelligence: null,
			wisdom: null,
			charisma: null,
		});
	};

	const isRollUsed = (rollIndex: number) => Object.values(assignments).includes(rollIndex);

	return (
		<div className="statsContainer">
			{props === "roll" && (
				<div className="statsOption">
					<h2>Roll x6 times</h2>
					<button className="btnDice" onClick={rollDice}></button>

					{rolls.length > 0 && (
						<div className="rollsContainer">
							{rolls.map((roll, index) => (
								<div key={index} className="roll">
									Roll {index + 1}: <span style={{ color: isRollUsed(index) ? "#333333" : "whitesmoke" }}>{roll}</span>
								</div>
							))}
						</div>
					)}

					<div className="statAssignments">
						{["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"].map((stat) => (
							<div key={stat} className="stat">
								<h3>{stat.charAt(0).toUpperCase() + stat.slice(1)}</h3>
								<select onChange={(e) => handleAssign(stat, parseInt(e.target.value))} value={assignments[stat] !== null ? assignments[stat]!.toString() : ""} disabled={rolls.length === 0}>
									<option>{assignments[stat] !== null ? rolls[assignments[stat]!] : "Select a roll"}</option>
									{rolls.map(
										(roll, index) =>
											!isRollUsed(index) && (
												<option key={index} value={index}>
													{roll}
												</option>
											)
									)}
								</select>
							</div>
						))}
					</div>
					<button className="btn resetBtn" onClick={resetSelections}>
						Reset stats
					</button>
				</div>
			)}
		</div>
	);
};

export default Stats;
