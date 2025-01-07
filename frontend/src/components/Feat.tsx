import React, { Component } from "react";
import axios from "axios";
import "../styles/featSection.scss";

interface FeatProps {
  index: string;
}

interface FeatData {
  name: string;
  desc: string[];
  prerequisites?: { type: string; value: string }[];
}

interface FeatState {
  featData: FeatData | null;
  loading: boolean;
  error: string | null;
  expanded: boolean;
}

class FeatCard extends Component<FeatProps, FeatState> {
  constructor(props: FeatProps) {
    super(props);
    this.state = {
      featData: null,
      loading: true,
      error: null,
      expanded: false,
    };
  }

  componentDidMount() {
    this.fetchFeatData();
  }

  fetchFeatData = async () => {
    const { index } = this.props;
    try {
      const response = await axios.get<FeatData>(`https://www.dnd5eapi.co/api/feats/${index}`);
      this.setState({ featData: response.data, loading: false });
    } catch (error) {
      this.setState({
        error: "Failed to fetch feat details.",
        loading: false,
      });
    }
  };

  toggleExpanded = () => {
    this.setState((prevState) => ({ expanded: !prevState.expanded }));
  };

  render() {
    const { featData, loading, error, expanded } = this.state;

    if (loading) return <div className="feat-card">Loading...</div>;
    if (error) return <div className="feat-card">{error}</div>;
    if (!featData) return <div className="feat-card">No feat data available.</div>;

    return (
      <div className="feat-card" onClick={this.toggleExpanded}>
        <h3>{featData.name}</h3>
        {expanded && (
          <div className="feat-details">
            <p>
              <strong>Description:</strong> {featData.desc.join(" ")}
            </p>
            {featData.prerequisites && featData.prerequisites.length > 0 && (
              <p>
                <strong>Prerequisites:</strong>{" "}
                {featData.prerequisites.map((prereq) => `${prereq.type}: ${prereq.value}`).join(", ")}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default FeatCard;
