import React from "react";
import "../styles/classSection.scss";

interface ClassProps {
	index: string;
	image: string;
	manualData: {
		id: number;
		name: string;
		description: string;
		features: string;
		wikidot_link: string;
	};
}

const ClassCard: React.FC<ClassProps> = ({ index, image, manualData }) => {
	const [expanded, setExpanded] = React.useState(false);

	const toggleExpanded = () => {
		setExpanded((prevState) => !prevState);
	};

	return (
		<div className="flip-card-class" onClick={toggleExpanded} key={index}>
			<div className={`flip-card-inner-class ${expanded ? "flipped" : ""}`}>
				<div className="flip-card-front-class">
					<img src={image} alt={manualData.name} />
					<h3>{manualData.name}</h3>
					<p>Click to view details</p>
				</div>
				<div className="flip-card-back-class">
					<p>{manualData.description}</p>
					<a onClick={() => window.open(manualData.wikidot_link, "_blank")}>View on Wikidot</a>

					<p>Click to close</p>
				</div>
			</div>
		</div>
	);
};

export default ClassCard;
