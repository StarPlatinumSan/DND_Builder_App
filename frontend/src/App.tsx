import { useEffect, useState } from "react";
import axios from "./client/apiClient";

interface Test {
	id: number;
	username: string;
}

function App() {
	const [message, setMessage] = useState("");
	const [data, setData] = useState<Test[]>([]);
	const [error, setError] = useState<string>("");

	/* hook qui test le fetching d'une route */
	useEffect(() => {
		fetch("http://localhost:3000")
			.then((res) => res.text())
			.then(setMessage);
	}, []);

	/* hook qui test le fetching d'une table de test de la supabase */
	useEffect(() => {
		axios
			.get("http://localhost:3000/test")
			.then((response: { data: Test[] }) => {
				setData(response.data);
			})
			.catch((error: Error) => {
				console.error("Error: ", error);
				setError(error.message);
			});
	}, []);

	return (
		<>
			<main className="app">
				<h1>{message}</h1>
				{error && <p>{error}</p>}

				{data.length > 0 && (
					<ul>
						{data.map((item: Test) => (
							<li key={item.id}>{item.username}</li>
						))}
					</ul>
				)}
			</main>
		</>
	);
}

export default App;
