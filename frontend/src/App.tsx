import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "./client/apiClient";
import { useEffect, useState } from "react";
import Home from "./pages/Home";

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
		<Routes>
			<Route path="/" element={<Home />}></Route>
		</Routes>
	);
}

export default App;
