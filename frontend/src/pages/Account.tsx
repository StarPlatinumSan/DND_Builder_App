import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const Account = ({ user }: { user: User }) => {
	const navigate = useNavigate();

	return (
		<>
			<section className="accountContainer">
				<h1>My Vault</h1>
			</section>
		</>
	);
};

export default Account;
