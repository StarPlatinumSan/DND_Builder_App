import React, { Component } from "react";
import axios from "axios";
import "../styles/classSection.scss";

interface ClassProps {
  index: string;
  image: string;
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
      classData: null,
      loading: true,
      error: null,
      expanded: false,
    };
  }

  componentDidMount() {
    this.fetchClassData();
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
    if (!classData) return <div>No class data available.</div>;

    return (
      <div className="class-card" onClick={this.toggleExpanded}>
        <img src={image} alt={classData.name} />
        <hr className="class-divider" />
        <h3>{classData.name}</h3>
        {expanded && (
          <div className="class-details">
            <p>
              <strong>Hit Die:</strong> d{classData.hit_die}
            </p>
            <p>
              <strong>Proficiencies:</strong>{" "}
              {classData.proficiencies.map((prof) => prof.name).join(", ")}
            </p>
            <p>
              <strong>Subclasses:</strong>{" "}
              {classData.subclasses.map((sub) => sub.name).join(", ")}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default ClassCard;
