import { useLocation } from "react-router-dom";
import "../styles/Results.css";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#8a2be2", "white"];

const Results = () => {
  const location = useLocation();
  const { result } = location.state || {}; // Retrieve passed state

  if (!result || !result.macro_breakdown) {
    return <p>No results to display. Please upload an image first.</p>;
  }

  console.log("Raw macro breakdown response:", result.macro_breakdown);

  let parsedData = {};
  try {
    let responseText = result.macro_breakdown.trim(); // Remove whitespace

    if (responseText.startsWith("{")) {
      parsedData = JSON.parse(responseText);
    } else {
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

  const macroData = [
    {
      name: "Protein",
      value: protein,
      percent: proteinPercent
    },
    {
      name: "Carbohydrates",
      value: carbs,
      percent: carbsPercent
    },
    {
      name: "Fats",
      value: fat,
      percent: fatPercent
    },
    {
      name: "Calories",
      value: calories,
      percent: caloriesPercent
    }
  ];

  return (
    <div className="results">
      <h2>Macro Breakdown</h2>
      <div className="charts-container">
        {macroData.map((macro, index) => (
          <div key={index} className="macro-chart">
            <h3>{macro.name}</h3>
            <PieChart width={250} height={250}>
              <Pie
                data={[{ name: macro.name, value: macro.percent }, { name: "Remaining", value: 100 - macro.percent }]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {COLORS.map((color, idx) => (
                  <Cell key={idx} fill={color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <p className="macro-label">
              {macro.name}: <span style={{ color: COLORS[0] }}>{macro.value}{macro.name === "Calories" ? " kcal" : " g"}</span>
            </p>
          </div>
        ))}
      </div>
      <div className="macro-key" style={{ textAlign: "center", marginTop: "20px" }}>
        <p><span style={{ color: COLORS[0] }}>■</span> Percentage</p>
        <p><span style={{ color: COLORS[1] }}>■</span> Remaining</p>
      </div>
    </div>
  );
};

export default Results;