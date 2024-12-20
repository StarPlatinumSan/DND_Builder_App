import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((res) => res.text())
      .then(setMessage);
  }, []);

  return (
    <>
      <main className="app">{message}</main>
    </>
  );
}

export default App;
