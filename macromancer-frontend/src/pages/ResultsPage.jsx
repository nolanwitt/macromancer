const ResultsPage = ({ result }) => {
    return (
      <div className="results-container">
        <h2>Analysis Results</h2>
        {result ? (
          <div>
            <p><strong>Calories:</strong> {result.calories} kcal</p>
            <p><strong>Carbs:</strong> {result.carbs} g</p>
            <p><strong>Proteins:</strong> {result.protein} g</p>
            <p><strong>Fats:</strong> {result.fats} g</p>
          </div>
        ) : (
          <p>Loading results...</p>
        )}
      </div>
    );
  };
  
  export default ResultsPage;
  