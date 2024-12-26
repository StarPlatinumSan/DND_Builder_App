import { useState, useEffect } from "react";
import { SlideDown } from "react-slidedown-react-18";
import "react-slidedown-react-18/lib/slidedown.css";

const Home = () => {
	const [open, setOpen] = useState(false);

	const toggleSlide = () => {
		setOpen((prev) => !prev);
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
		<div className="homeContainer">
			<header className="header">
				<p>D&D Character Builder</p>
				<div className="mobileMenu"></div>
			</header>
			<section className="hero">
				<div className="opacity"></div>

				<div className="startHero">
					<h1>D&D Character Builder</h1>
					<p className="description">Create and level up characters, explore profiles, and effortlessly manage your own, all in one place.</p>
					<a href="#" className="startButton">
						Start your adventure
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</a>
				</div>
			</section>

			<section className="content">
				<div className="groupCategoryMain">
					<div className="category mainCategory">
						<img src="/redpin.webp" alt="PIN" className="redPin" />
						<h2>What is it?</h2>
						<p className="description">Create characters, level them up, exploring other users' creations, and more!</p>
						<div className="collapsible">
							<button className="btnLearn btnSlide" onClick={toggleSlide}>
								Click to find out
							</button>
							<SlideDown
								style={{
									transition: "height 0.2s ease-in-out",
								}}
							>
								{open && (
									<div className="slideDownContent">
										<strong>An overhauled D&D character builder and controller</strong>
										<ul>
											<li>Create your characters from scratch with an easy to use and mostly automated interface!</li>

											<li>Save them on your profile and maintain them.</li>
											<li>Level them up whenever needed.</li>
											<li>Discover other people's public characters and save them on your profile.</li>
											<li>Explore all classes, races, spells, feats and more!</li>
										</ul>
									</div>
								)}
							</SlideDown>
						</div>
					</div>
					<div className="category">
						<img src="/redpin.webp" alt="PIN" className="redPin" />
						<h2>What is Dungeons and Dragons?</h2>
						<img src="dnd.jpg" alt="What is this app" className="imgCategory" />
						<p className="description">
							Dungeons & Dragons is a collaborative storytelling game that invites you to become a hero in a fantasy world of magic and monsters. Whether exploring ancient dungeons or forging alliances, the only limit is your imagination.
						</p>
						<button className="btnLearn">About</button>
					</div>
				</div>

				<div className="interCategory">
					<h2>Why we built this app</h2>
					<p className="description">
						This non-official fanmade D&D app was created with the purpose of having an easy to use interface that automates most of the redundant stuff you need when creating a character. It focuses on what's important and auto-selects all the
						non-modifiable content like the class features or abilities. It lets you have your characters always with you, so you can access them even without your character sheet. Moreover, you can level them up easily, making you save time with all the
						search usually needed. It also serves as a database for all the spells, classes, races, features, etc.
					</p>
				</div>
				<div className="groupCategory">
					<div className="category">
						<img src="/redpin.webp" alt="PIN" className="redPin" />
						<h2>What is Dungeons and Dragons?</h2>
						<img src="dnd.jpg" alt="What is this app" className="imgCategory" />
						<p className="description">
							Dungeons & Dragons is a collaborative storytelling game that invites you to become a hero in a fantasy world of magic and monsters. Whether exploring ancient dungeons or forging alliances, the only limit is your imagination.
						</p>
						<button className="btnLearn">About</button>
					</div>
					<div className="category">
						<img src="/redpin.webp" alt="PIN" className="redPin" />
						<h2>Explore the spells</h2>
						<img src="spells.jpg" alt="spells" className="imgCategory" />
						<p className="description">From simple cantrips to legendary incantations, spells are the heart of any magic-wielding character. Unleash arcane energy, manipulate elements, and shape reality itself as you master the art of spellcasting.</p>
						<button className="btnLearn">Explore</button>
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
					<div className="category">
						<img src="/redpin.webp" alt="PIN" className="redPin" />
						<h2>Customize your character</h2>
						<img src="character.jpg" alt="character" className="imgCategory" />
						<p className="description">Build a hero as unique as you are! Refine your backstory, choose specialized skills, and select gear that fits your style. Your character’s journey is entirely in your hands, no two adventurers are ever the same.</p>
						<button className="btnLearn">Start now!</button>
					</div>
					<div className="category" id="customCard">
						<img src="/redpin.webp" alt="PIN" className="redPin" />
						<h2>Share it with your friends</h2>
						<img src="buildCharacter.jpg" alt="character" className="imgCategory" />
						<p className="description">Save your characters on your profile, and decide which ones you want to set public for the others to see!</p>
						<button className="btnLearn">How it works</button>
					</div>
				</div>
			</section>

			<footer className="footer">
				<p>
					By <a href="https://github.com/StarPlatinumSan">StarPlatinumSan</a> and <a href="https://github.com/Gelehead">Gelehead</a>
				</p>
				<p className="copyright"> &copy; 2023 D&D Character Builder</p>
			</footer>
		</div>
	);
};

export default Home;
