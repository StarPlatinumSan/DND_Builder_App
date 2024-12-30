import { useNavigate } from "react-router-dom";
import { supabase } from "../client/supabaseClient";
import { useState, useEffect } from "react";

const Login = () => {
	const [isRegistering, setIsRegistering] = useState(true);
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (provider: "google" | "discord") => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: window.location.origin + "/vault",
			},
		});
		if (error) {
			console.log(error.message);
		}
	};

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const email = (form.elements.namedItem("email") as HTMLInputElement).value;
		const password = (form.elements.namedItem("password") as HTMLInputElement).value;
		const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value;

		if (password !== confirmPassword) {
			setMessage("Passwords do not match, please try again.");
			setTimeout(() => {
				setMessage("");
			}, 3000);
			return;
		}

		const { data, error } = await supabase.auth.signUp({ email, password });
		if (error) {
			console.error("Registration error:", error.message);
			setMessage("Registration failed: " + error.message);
			setTimeout(() => {
				setMessage("");
			}, 5000);
		} else {
			console.log("Registration successful!");
			setMessage("Registration successful! Please check your email to verify your account.");
			setTimeout(() => {
				setMessage("");
			}, 5000);
		}
	};

	const accessVault = () => {
		window.location.href = "/vault";
	};

	useEffect(() => {
		const checkUserSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			if (session) {
				navigate("/vault");
			}
		};
		checkUserSession();
	}, [navigate]);

	return (
		<div className="loginContainer">
			<button className="btn goBack" onClick={() => navigate("/")}>
				Go back
			</button>
			{isRegistering ? (
				<form onSubmit={handleRegister}>
					<h2>Create an Account</h2>
					<input type="email" name="email" placeholder="Email" required />
					<input type="password" name="password" placeholder="Password" required />
					<input type="password" name="confirmPassword" placeholder="Confirm Password" required />
					<p className="message">{message}</p>
					<button type="submit" className="btn">
						Register
					</button>
					<p>
						Already have an account?{" "}
						<button type="button" className="btn btnGoLogin" onClick={() => setIsRegistering(false)}>
							Go to Log in
						</button>
					</p>
				</form>
			) : (
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						const form = e.target as HTMLFormElement;
						const email = (form.elements.namedItem("email") as HTMLInputElement).value;
						const password = (form.elements.namedItem("password") as HTMLInputElement).value;
						const { error } = await supabase.auth.signInWithPassword({ email, password });
						if (error) {
							setMessage("Invalid email or password. Please try again.");
							setTimeout(() => setMessage(""), 3000);
						} else {
							navigate("/vault");
						}
					}}
				>
					<h2>Log in</h2>
					<input type="email" name="email" placeholder="Email" required />
					<input type="password" name="password" placeholder="Password" required />
					<p>{message}</p>
					<button type="submit" className="btn">
						Log in with Email
					</button>

					<p>
						Create an account?{" "}
						<button className="btn btnGoLogin" onClick={() => setIsRegistering(true)}>
							Go to Register
						</button>
					</p>
				</form>
			)}

			<div className="or">or</div>

			<button className="btn btnProvider" onClick={() => handleLogin("google")}>
				<img src="./google-logo.png" alt="" className="provider-logo" />
				Log in with Google
			</button>
			<button className="btn btnProvider" onClick={() => handleLogin("discord")}>
				<img src="./discord-logo.png" alt="" className="provider-logo" />
				Log in with Discord
			</button>

			<div className="or">or</div>

			<button className="btn btnWithout" onClick={() => accessVault()}>
				Continue without logging in
			</button>
		</div>
	);
};

export default Login;
