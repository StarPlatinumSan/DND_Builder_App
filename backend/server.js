require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Backend is running");
});

app.get("/data", async (req, res) => {
	try {
		const { data, error } = await supabase.from("test").select("*");

		if (error) {
			console.error("Error fetching data: ", error.message);
			return res.status(500).json({ error: error.message });
		}

		res.json(data);
	} catch (err) {
		console.error("Error: ", err.message);
		return res.status(500).json({ error: "An unexpected error occurred" });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port : ${port}`);
});
