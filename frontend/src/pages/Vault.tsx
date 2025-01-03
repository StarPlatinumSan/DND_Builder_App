import { useEffect, useState } from "react";
import { supabase } from "../client/supabaseClient";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

import Account from "./Account";

const Vault = () => {
	const [user, setUser] = useState<User | null | undefined>(undefined);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUser = async () => {
			const {
				data: { user },
				error,
			} = await supabase.auth.getUser();

			if (error) {
				setUser(null);
			} else {
				setUser(user);
			}
		};

		fetchUser();
	}, []);

	const handleLogout = async () => {
		await supabase.auth.signOut();
		navigate("/");
	};

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

	if (user === undefined) {
		return <p>Loading...</p>;
	}

	const isLoggedIn = !!user;

	return (
		<>
			<section className="vaultContainer" onClick={slideMenuEvent}>
				<header className="vaultHeader">
					<p className="description">My Vault</p>
					<div className="desktopVaultHeader">
						<button className="btn">Create a Character</button>
						<button className="btn">Spells</button>
						<button className="btn">Classes</button>
						<button className="btn">Races</button>
						<button className="btn">Feats</button>
						<button className="btn">Backgrounds</button>
						<button className="btn">Epic Boons</button>
						<button className="btn btnLogout btnLogoutMobile" onClick={handleLogout}></button>
					</div>

					<div className="mobileMenuVault" onClick={slideMenu}></div>

					<div className="slideMenu">
						<div className="optionsMobile">
							<button className="btn createButton">Create a Character</button>
							<button className="btn spellsButton">
								<img src="./spellsIcon.svg" alt="" />
								Spells
							</button>
							<button className="btn classesButton">
								<img src="./classesIcon.svg" alt="" />
								Classes
							</button>
							<button className="btn racesButton">
								<img src="./racesIcon.svg" alt="" />
								Races
							</button>
							<button className="btn featsButton">
								<img src="./featsIcon.svg" alt="" />
								Feats
							</button>
							<button className="btn backgroundsButton">
								<img src="./backgroundsIcon.svg" alt="" />
								Backgrounds
							</button>
							<button className="btn epicBoonsButton">
								<img src="./epicIcon.svg" alt="" />
								Epic Boons
							</button>

							<div className="logoutDiv">
								Log out
								<button className="btn btnLogout btnLogoutMobile" onClick={handleLogout}></button>
							</div>
						</div>

						<button className="closeX" onClick={() => ((document.querySelector(".slideMenu") as HTMLDivElement).style.transform = "translateX(100%)")}></button>
					</div>
				</header>

				<h1>
					Welcome to your Vault,{" "}
					{user?.email
						? (() => {
								const namePart = user.email.split(/[@.]/)[0];
								return namePart.charAt(0).toUpperCase() + namePart.slice(1);
						  })()
						: "Guest"}
				</h1>

				<div className="separation"></div>

				{isLoggedIn ? (
					<button className="btn createNew">Create a character</button>
				) : (
					<Link to="/login" className="btn createNew">
						Login to save your characters
					</Link>
				)}

				<div className="vaultCharactersContainer">{isLoggedIn ? <Account user={user} /> : <p>You must be logged in to view your characters.</p>}</div>
			</section>
		</>
	);
};

export default Vault;
