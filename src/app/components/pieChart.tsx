// components/pieChart.tsx
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

import { ChartData, ChartOptions } from "chart.js";

const PieChart = ({
  data,
  options,
}: {
  data: ChartData<"pie">;
  options: ChartOptions<"pie">;
}) => {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Stock Distribution</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
