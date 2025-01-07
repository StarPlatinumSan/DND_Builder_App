import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/featSection.scss";
import FeatCard from "../../components/Feat";

interface Feat {
  name: string;
  index: string;
}

const FeatPage: React.FC = () => {
  const [feats, setFeats] = useState<Feat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeats = async () => {
      try {
        const response = await axios.get<{ results: Feat[] }>("https://www.dnd5eapi.co/api/feats");
        setFeats(response.data.results);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch feats.");
        setIsLoading(false);
      }
    };

    fetchFeats();
  }, []);

  if (isLoading) {
    return <div className="feat-page">Loading feats...</div>;
  }

  if (error) {
    return <div className="feat-page">Error: {error}</div>;
  }

  return (
    <div className="feat-page">
      <h1>Feats</h1>
      <div className="feat-grid">
        {feats.map((feat) => (
          <FeatCard key={feat.index} index={feat.index} />
        ))}
      </div>
    </div>
  );
};

export default FeatPage;
