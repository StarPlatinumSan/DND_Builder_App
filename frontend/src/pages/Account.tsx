import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const Account = ({ user }: { user: User }) => {
	const navigate = useNavigate();

	return (
		<>
			<section className="accountContainer">
				<h1>My characters</h1>
				<div className="plusDiv">
					<img src="./plus.svg" alt="+" />
				</div>
			</section>
		</>
	);
};

export default Account;
