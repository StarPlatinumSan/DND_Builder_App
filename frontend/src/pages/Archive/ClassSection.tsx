import React, { useEffect, useState } from "react";
import "../../styles/classSection.scss";

interface ClassInfo {
  name: string;
  index: string;
  caster_type: "non-caster" | "half-caster" | "full-caster"; // Custom categorization
  image: string;
}

const ClassPage: React.FC = () => {
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const casterCategories = {
    "non-caster": ["barbarian", "fighter", "rogue", "monk"],
    "half-caster": ["paladin", "ranger"],
    "full-caster": ["bard", "cleric", "druid", "sorcerer", "wizard", "warlock"],
  };

  const classImages: { [key: string]: string } = {
    barbarian: "../../../public/barbarian.jpg",
    fighter: "../../../public/fighter.jpg",
    rogue: "../../../public/rogue.jpg",
    monk: "../../../public/monk.jpg",
    paladin: "../../../public/paladin.jpg",
    ranger: "../../../public/ranger.jpg",
    bard: "../../../public/bard.jpg",
    cleric: "../../../public/cleric.jpg",
    druid: "../../../public/druid.jpg",
    sorcerer: "../../../public/sorcerer.jpg",
    wizard: "../../../public/wizard.jpg",
    warlock: "../../../public/warlock.jpg",
  };

  useEffect(() => {
    // Fetch all classes from the D&D API
    fetch("https://www.dnd5eapi.co/api/classes")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch classes: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const categorizedClasses = data.results.map((cls: { name: string; index: string }) => {
          let caster_type: "non-caster" | "half-caster" | "full-caster" = "non-caster";

          if (casterCategories["half-caster"].includes(cls.index)) {
            caster_type = "half-caster";
          } else if (casterCategories["full-caster"].includes(cls.index)) {
            caster_type = "full-caster";
          }

          return {
            name: cls.name,
            index: cls.index,
            caster_type,
            image: classImages[cls.index] || "../../assets/default.png", // Default image fallback
          };
        });

        setClasses(categorizedClasses);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="class-page">Loading classes...</div>;
  }

  if (error) {
    return <div className="class-page">Error: {error}</div>;
  }

  return (
    <div className="page-container">
        <div className="class-page">
        {Object.keys(casterCategories).map((category) => (
            <div className="caster-category" key={category}>
            <h2>{category.replace("-", " ").toUpperCase()}</h2>
            <div className="card-grid">
                {classes
                .filter((cls) => cls.caster_type === category)
                .map((cls) => (
                    <div className="class-card" key={cls.index}>
                    <img src={cls.image} alt={cls.name} />
                    <hr className="class-divider" />
                    <h3>{cls.name}</h3>
                    </div>
                ))}
            </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default ClassPage;
