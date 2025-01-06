import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
	const [open, setOpen] = useState(false);
	const [openIndex, setOpenIndex] = useState(null);

	const toggleSlide = (index) => {
		setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	const sections = [
		{
			title: "About this game",
			content:
				"Dungeons and Dragons (D&D) is a collaborative role-playing game (RPG) where players take on the roles of unique characters. Together, players explore a fantasy world created and guided by the Dungeon Master (DM), the storyteller of the game. This world can include sprawling cities, dangerous dungeons, and mystical wilderness, filled with challenges, puzzles, and epic battles. Using dice, maps, figures, and creativity, players engage in a rich storytelling experience full of choices, teamwork, and adventure.",
			image: "./Sorcerer.jpg",
		},
		{
			title: "Where to start",
			content:
				"The first step in playing D&D is creating your character. This app simplifies that process, allowing you to easily craft, level up, and manage your characters. Choose their race (Elf, Human, Dwarf, etc.), class (Fighter, Wizard, Rogue, etc.), and background. Define their abilities like Strength, Dexterity, and Intelligence. This app automates the tedious aspects of character creation, ensuring you never miss a critical feature, spell, or ability for your character.",
			image: "./Barbarian.jpg",
		},
		{
			title: "Once you have a character",
			content:
				"After creating your character, you can log in to save it to your profile. Your personal library will store all your characters for future use. Additionally, you can explore and save public characters created by other users, perfect for when you need inspiration or a ready-to-play character. Organize your library to keep track of your characters and their progress over time.",
			image: "./Paladin.jpg",
		},
		{
			title: "Getting ready to play",
			content:
				"With your character ready, it’s time to play! Find a Dungeon Master who can run a campaign (a series of interconnected adventures) or a oneshot (a single-session adventure). Whether you're a beginner or an experienced player, you can adjust your character’s level and abilities to fit the game’s requirements. Don’t forget—if you’re feeling ambitious, you can also be the Dungeon Master and create adventures for your friends, shaping the world they’ll explore.",
			image: "./Wizard.jpg",
		},
		{
			title: "Final touches",
			content:
				"Before you begin your adventure, gather a few essentials: a set of dice (polyhedral dice like d20, d12, d8, etc.), a character sheet, and perhaps a figure or token to represent your character on the map. This app ensures your character sheet is ready and up-to-date with all stats, spells, and abilities. Now, gather your party, roll some dice, and embark on your D&D journey. Have fun creating unforgettable stories!",

			image: "./Rogue.jpg",
		},
	];

	const slideMenu = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		const slideMenu = document.querySelector(".slideMenu") as HTMLDivElement;
		slideMenu.style.transform = "translateX(0)";
	};

	const slideMenuEvent = (e: React.MouseEvent<HTMLElement>) => {
		const slideMenu = document.querySelector(".slideMenu") as HTMLDivElement;

		if (!(e.target as HTMLElement).closest(".slideMenu")) {
			slideMenu.style.transform = "translateX(100%)";
		}
	};

	useEffect(() => {
		const header = document.querySelector(".header");

		let timeout: NodeJS.Timeout;

		const handleScroll = () => {
			if (timeout) clearTimeout(timeout);

			timeout = setTimeout(() => {
				if (window.scrollY > 0) {
					header?.classList.add("scrolled");
				} else {
					header?.classList.remove("scrolled");
				}
			}, 100);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="homeContainer" onClick={slideMenuEvent}>
			<div className="slideMenu">
				<button className="closeX" onClick={() => ((document.querySelector(".slideMenu") as HTMLDivElement).style.transform = "translateX(100%)")}></button>

				<h2>Menu</h2>
				<Link to="/login" className="btn btnLoginMenu btnMenuHome">
					{" "}
					Login{" "}
				</Link>
				<Link to="/spells" className="btn btnMenuHome">
					Spells
				</Link>
				<Link to="/classes" className="btn btnMenuHome">
					Classes
				</Link>
				<button className="btn btnMenuHome"> Races </button>
				<Link to="/feats" className="btn btnMenuHome">
					Feats
				</Link>
				<button className="btn btnMenuHome"> Backgrounds </button>
				<button className="btn btnMenuHome"> Epic Boons </button>
			</div>

			<header className="header">
				<p>D&D Character Builder</p>
				<div className="mobileMenu" onClick={slideMenu}></div>

				<div className="desktopMenu">
					<Link to="/spells" className="btnDesktopHead">
						Spells
					</Link>
					<Link to="/classes" className="btnDesktopHead">
						Classes
					</Link>
					<button className="btnDesktopHead"> Races </button>
					<Link to="/feats" className="btnDesktopHead">
						Feats
					</Link>
					<button className="btnDesktopHead"> Backgrounds </button>
					<button className="btnDesktopHead"> Epic Boons </button>
					<Link to="/login" className="btnDesktopHead btnLoginHead">
						Login
					</Link>
				</div>
			</header>
			<section className="hero">
				<div className="opacity"></div>

				<div className="startHero">
					<h1>D&D Character Builder</h1>
					<p className="description">Create and level up characters, explore other creations, and effortlessly manage your own, all in one place.</p>
					<Link to="/login" className="startButton">
						Start your adventure
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</Link>
				</div>
			</section>

			<section className="content">
				<div className="smallDescription">
					<h2 className="whatIsTitle">What is Dungeon & Dragons?</h2>
					<div className="yapping">
						{sections.map((section, index) => (
							<div className="whatIsSection" key={index}>
								<div className={`flip-card-inner ${openIndex === index ? "flipped" : ""}`} onClick={() => toggleSlide(index)}>
									<div className="flip-card-front">
										<img src={section.image} alt={section.title} className="imgLogoClass" />
										<p className="description">
											<strong className="titleStrong">{section.title}</strong>
										</p>
										<p className="btnSlide">
											<small>Click to learn more</small>
										</p>
									</div>

									<div className="flip-card-back">
										<p className="description">{section.content}</p>

										<p className="btnSlide">
											<small>Click to close</small>
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="interCategory">
					<h2>Why we built this app</h2>
					<p className="description">
						This non-official, fanmade D&D app was created with the purpose of having an easy to use interface that automates most of the redundant stuff you need when creating a character. It focuses on what's important and auto-selects all the
						non-modifiable content like the class features or abilities. It lets you have your characters always with you, so you can access them even without your character sheet. Moreover, you can level them up easily, making you save time with all the
						search usually needed. It also serves as a database for all the spells, classes, races, features, etc.
					</p>
				</div>

				<div className="groupCategory">
					<div className="category">
						<img src="/redpin.webp" alt="PIN" className="redPin" />
						<h2>Customize your character</h2>
						<img src="character.jpg" alt="character" className="imgCategory" />
						<p className="description">Build a hero as unique as you are! Refine your backstory, choose specialized skills, and select gear that fits your style. Your character’s journey is entirely in your hands, no two adventurers are ever the same.</p>
						<Link to="/login" className="btnLearn">
							Start now!
						</Link>
					</div>
					<div className="category">
						<img src="/redpin.webp" alt="PIN" className="redPin" />
						<h2>Maintain and level up your characters easily</h2>
						<img src="maintain.jpg" alt="character" className="imgCategory" />
						<p className="description">Access all your characters and change their levels, abilities, and features easily. Whether you're a seasoned player or just starting out, this app has got you covered with an automated leveling system.</p>
						<button className="btnLearn">Gain full control!</button>
					</div>
					<div className="category">
						<img src="/redpin.webp" alt="PIN" className="redPin" />
						<h2>Share your characters with your friends</h2>
						<img src="buildCharacter.png" alt="character" className="imgCategory" />
						<p className="description">Save your characters on your profile, and decide which ones you want to set public for the others to see!</p>
						<button className="btnLearn">How it works</button>
					</div>

					<div className="category">
						<img src="/redpin.webp" alt="PIN" className="redPin" />
						<h2>Explore the spells</h2>
						<img src="spells.jpg" alt="spells" className="imgCategory" />
						<p className="description">From simple cantrips to legendary incantations, spells are the heart of any magic-wielding character. Unleash arcane energy, manipulate elements, and shape reality itself as you master the art of spellcasting.</p>
						<Link to="/spells" className="btnLearn">
							Explore
						</Link>
					</div>
					<div className="category">
						<img src="/redpin.webp" alt="PIN" className="redPin" />
						<h2>Dive into your potential classes</h2>
						<img src="classes.webp" alt="spells" className="imgCategory" />
						<p className="description">
							Will you take up the sword as a mighty Fighter, delve into forbidden lore as a Warlock, or heal the party’s wounds as a Cleric? Each class offers distinct abilities and playstyles, choose the one that speaks to your heroic spirit.
						</p>
						<button className="btnLearn">Dive into</button>
					</div>
					<div className="category">
						<img src="/redpin.webp" alt="PIN" className="redPin" />
						<h2>Discover the racial options</h2>
						<img src="races.jpg" alt="spells" className="imgCategory" />
						<p className="description">
							From the stout Dwarves to the graceful Elves, every playable race brings its own history and culture to the table. Embrace unique traits, lore, and heritage that can shape the way your character views, and changes the world.
						</p>
						<button className="btnLearn">Discover</button>
					</div>
				</div>
			</section>

			<footer className="footer">
				<p className="description footerTxt">
					By <a href="https://github.com/StarPlatinumSan">StarPlatinumSan</a> and <a href="https://github.com/Gelehead">Gelehead</a>
				</p>
				<p className="copyright"> &copy; 2025 D&D Character Builder</p>
			</footer>
		</div>
	);
};

export default Home;
