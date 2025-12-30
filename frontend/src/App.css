import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3001/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userInput: input }),
    });

    const data = await response.json();
    setMovies(data.recommendations);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🎬 Movie Recommendation App</h1>

      <input
        type="text"
        placeholder="e.g. action movies with strong female lead"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={getRecommendations}>Get Recommendations</button>

      {loading && <p>Loading...</p>}

      <ul>
        {movies.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
