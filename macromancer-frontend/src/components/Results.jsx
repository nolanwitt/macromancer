import { useLocation } from "react-router-dom";
import "../styles/Results.css";

const Results = () => {
  const location = useLocation();
  const { result } = location.state || {}; // Retrieve passed state

  if (!result) {
    return <p>No results to display. Please upload an image first.</p>;
  }

  return (
    <div className="results">
      <h2>Macro Breakdown</h2>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};

export default Results;
