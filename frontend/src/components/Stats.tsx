import React, { useEffect, useState } from "react";

interface StatsProps {
	props: string;
	updateStats: (newStats: { [key: string]: number }) => void;
}

interface Assignments {
	[key: string]: number | null;
}

const Stats: React.FC<StatsProps> = ({ props, updateStats }) => {
	const [pointBuy, setPointBuy] = useState(27);
	const [assignments, setAssignments] = useState<Assignments>({
		strength: 8,
		dexterity: 8,
		constitution: 8,
		intelligence: 8,
		wisdom: 8,
		charisma: 8,
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
			strength: 8,
			dexterity: 8,
			constitution: 8,
			intelligence: 8,
			wisdom: 8,
			charisma: 8,
		});
	};

	const addInput = (stat: string) => {
		if (props === "point") {
			const currentValue = assignments[stat] || 8;
			if (currentValue >= 8 && currentValue < 13 && pointBuy > 0) {
				setPointBuy((prev) => prev - 1);
			} else if (currentValue >= 13 && currentValue < 15 && pointBuy > 1) {
				setPointBuy((prev) => prev - 2);
			} else {
				return;
			}
		}

		setAssignments((prevAssignments) => {
			const updatedAssignments = {
				...prevAssignments,
				[stat]: Math.min((prevAssignments[stat] || 8) + 1, 50),
			};

			const newStats = Object.fromEntries(Object.entries(updatedAssignments).map(([key, value]) => [key, value !== null ? value : 0]));
			updateStats(newStats);

			return updatedAssignments;
		});
	};

	const removeInput = (stat: string) => {
		if (props === "point") {
			if (assignments[stat]! > 8 && assignments[stat]! <= 13 && pointBuy < 27) {
				setPointBuy(pointBuy + 1);
			} else if (assignments[stat]! >= 14 && assignments[stat]! <= 15 && pointBuy < 26) {
				setPointBuy(pointBuy + 2);
			} else {
				return;
			}
		}

		setAssignments((prevAssignments) => {
			const updatedAssignments = {
				...prevAssignments,
				[stat]: Math.max((prevAssignments[stat] || 8) - 1, 1),
			};

			const newStats = Object.fromEntries(Object.entries(updatedAssignments).map(([key, value]) => [key, value !== null ? value : 0]));
			updateStats(newStats);

			return updatedAssignments;
		});
	};

	useEffect(() => {
		if (props === "point") {
			setPointBuy(27);
			resetSelections();
		} else if (props === "custom") {
			const newStats = Object.fromEntries(Object.entries(assignments).map(([key, value]) => [key, value !== null ? value : 0]));
			updateStats(newStats);
		}
	}, [props]);

	useEffect(() => {
		if (pointBuy === 0) {
			const newStats = Object.fromEntries(Object.entries(assignments).map(([key, value]) => [key, value !== null ? value : 0]));
			updateStats(newStats);
		}
	}, [pointBuy]);

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
			{props === "point" && (
				<div className="statsOption">
					<h2>Point Buy System</h2>
					<p>Available points: {pointBuy}</p>
					<div className="statAssignments">
						{["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"].map((stat) => (
							<div key={stat} className="stat pointStat">
								<p>{stat.charAt(0).toUpperCase() + stat.slice(1)}</p>
								<div className="numberInput pointsContainer">
									<button className="decrement" onClick={() => removeInput(stat)}>
										-
									</button>

									<input type="number" min="1" max="20" className="inputStats" value={assignments[stat] || 8} />

									<button className="increment" onClick={() => addInput(stat)}>
										+
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{props === "custom" && (
				<div className="statsOption">
					<h2>Custom System</h2>
					<p>You may enter the values of your choice with complete freedom, they also have a maximum of 50 for Game Masters.</p>
					<small>P.S. Make sure to discuss it with your DM before!</small>
					<div className="statAssignments">
						{["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"].map((stat) => (
							<div key={stat} className="stat pointStat">
								<p>{stat.charAt(0).toUpperCase() + stat.slice(1)}</p>
								<div className="numberInput pointsContainer">
									<button className="decrement" onClick={() => removeInput(stat)}>
										-
									</button>

									<input type="number" min="1" max="50" className="inputStats" value={assignments[stat] || 8} />

									<button className="increment" onClick={() => addInput(stat)}>
										+
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Stats;
