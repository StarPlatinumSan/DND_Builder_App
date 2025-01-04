import React, { Component } from "react";
import axios from "axios";
import "../styles/classSection.scss";

interface ClassProps {
	index: string;
	image: string;
	manualData?: ClassData;
}

interface ClassData {
	name: string;
	hit_die: number;
	proficiencies: { name: string }[];
	subclasses: { name: string }[];
}

interface ClassState {
	classData: ClassData | null;
	loading: boolean;
	error: string | null;
	expanded: boolean;
}

class ClassCard extends Component<ClassProps, ClassState> {
	constructor(props: ClassProps) {
		super(props);
		this.state = {
			classData: props.manualData || null,
			loading: !props.manualData,
			error: null,
			expanded: false,
		};
	}

	componentDidMount() {
		if (!this.props.manualData) {
			this.fetchClassData();
		}
	}

	fetchClassData = async () => {
		const { index } = this.props;
		try {
			const response = await axios.get<ClassData>(`https://www.dnd5eapi.co/api/classes/${index}`);
			this.setState({ classData: response.data, loading: false });
		} catch (error) {
			this.setState({
				error: "Failed to fetch class details.",
				loading: false,
			});
		}
	};

	toggleExpanded = () => {
		this.setState((prevState) => ({ expanded: !prevState.expanded }));
	};

	render() {
		const { image } = this.props;
		const { classData, loading, error, expanded } = this.state;

		if (loading) return <div>Loading...</div>;
		if (error) return <div>{error}</div>;
		if (!classData) return null;

		return (
			<div className="flip-card-class" onClick={this.toggleExpanded}>
				<div className={`flip-card-inner-class ${expanded ? "flipped" : ""}`}>
					<div className="flip-card-front-class">
						<img src={image} alt={classData.name} />
						<h3>{classData.name}</h3>
						<p>Click to view details</p>
					</div>
					<div className="flip-card-back-class">
						<p>
							<strong>Hit Die:</strong> d{classData.hit_die}
						</p>
						<p>
							<strong>Proficiencies:</strong> {classData.proficiencies.map((prof) => prof.name).join(", ")}
						</p>
						<p>
							<strong>Subclasses:</strong> {classData.subclasses.map((sub) => sub.name).join(", ")}
						</p>
						<p>Click to close</p>
					</div>
				</div>
			</div>
		);
	}
}

export default ClassCard;
