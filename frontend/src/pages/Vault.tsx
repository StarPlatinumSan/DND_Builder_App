import { useEffect, useState } from "react";
import { supabase } from "../client/supabaseClient";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";

import Account from "./Account";

const Vault = () => {
	const [user, setUser] = useState<User | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUser = async () => {
			const {
				data: { user },
				error,
			} = await supabase.auth.getUser();
			if (error !== null) {
				navigate("/login");
			} else {
				setUser(user);
			}
		};
		fetchUser();
	}, [navigate]);

	const handleLogout = async () => {
		await supabase.auth.signOut();
		navigate("/");
	};

	if (!user) return <p>Loading...</p>;

	return (
		<>
			<section className="vaultContainer">
				<header className="vaultHeader">
					<button className="btn">Create a Character</button>
					<div className="desktopVaultHeader" style={{ display: "none" }}>
						<p className="description">My Vault</p>
						<button className="btn">Spells</button>
						<button className="btn">Classes</button>
						<button className="btn">Races</button>
						<button className="btn">Feats</button>
						<button className="btn">Backgrounds</button>
						<button className="btn">Epic Boons</button>
					</div>
					<button className="btn btnLogout" onClick={handleLogout}>
						Log Out
					</button>
					<div className="mobileMenuVault">Menu</div>
				</header>

				<div className="vaultCharactersContainer">
					<h1>
						Welcome to your Vault,{" "}
						{user.email
							? (() => {
									const namePart = user.email.split(/[@.]/)[0];
									return namePart.charAt(0).toUpperCase() + namePart.slice(1);
							  })()
							: "Guest"}
					</h1>
				</div>
			</section>
		</>
	);
};

export default Vault;
