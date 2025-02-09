import { useLocation } from "react-router-dom";
import "../styles/Results.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#8a2be2", "white"];

const Results = () => {
  const location = useLocation();
  const { result } = location.state || {}; // Retrieve passed state

  if (!result || !result.macro_breakdown) {
    return <p>No results to display. Please upload an image first.</p>;
  }

  // Debugging: Log raw response
  console.log("Raw macro breakdown response:", result.macro_breakdown);

  let parsedData = {};
  try {
    let responseText = result.macro_breakdown.trim(); // Remove whitespace

    // Check if response already starts with `{`, meaning it's valid JSON
    if (responseText.startsWith("{")) {
      parsedData = JSON.parse(responseText);
    } else {
      // Attempt to extract JSON using regex
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No valid JSON found in response.");
      }
    }
  } catch (error) {
    console.error("Error parsing macro breakdown:", error);
    return <p>Invalid data format received from backend.</p>;
  }

  // Extract values safely
  const {
    calories = 0,
    protein = 0,
    carbs = 0,
    fat = 0,
    "calories-percent": caloriesPercent = 0,
    "protein-percent": proteinPercent = 0,
    "carbs-percent": carbsPercent = 0,
    "fat-percent": fatPercent = 0
  } = parsedData;

  // Format data for visualization
  const macroData = [
    {
      name: "Protein",
      data: [
        { name: "Protein", value: protein },
        { name: "Remaining", value: Math.max(0, 100 - protein) }
      ]
    },
    {
      name: "Carbohydrates",
      data: [
        { name: "Carbs", value: carbs },
        { name: "Remaining", value: Math.max(0, 100 - carbs) }
      ]
    },
    {
      name: "Fats",
      data: [
        { name: "Fats", value: fat },
        { name: "Remaining", value: Math.max(0, 100 - fat) }
      ]
    },
    {
      name: "Calories",
      data: [
        { name: "Calories", value: calories },
        { name: "Remaining", value: Math.max(0, 2000 - calories) }
      ]
    },
    {
      name: "Daily Value %",
      data: [
        { name: "Calories %", value: caloriesPercent },
        { name: "Protein %", value: proteinPercent },
        { name: "Carbs %", value: carbsPercent },
        { name: "Fat %", value: fatPercent }
      ]
    }
  ];

  return (
    <div className="results">
      <h2>Macro Breakdown</h2>

      {/* Container for horizontal alignment */}
      <div className="charts-container">
        {macroData.map((macro, index) => (
          <div key={index} className="macro-chart">
            <h3>{macro.name}</h3>
            <PieChart width={250} height={250}>
              <Pie
                data={macro.data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                label
              >
                {macro.data.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            <p className="macro-label">
              {macro.name}: <span style={{ color: COLORS[0] }}>{macro.data[0].value}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Debugging Output: Show Raw Data */}
      <div className="raw-data">
        <h3>Raw Data from Backend:</h3>
        <pre>{JSON.stringify(parsedData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Results;
