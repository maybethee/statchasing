import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const PieChart = ({ data, options, plugins, header }) => (
  <div className="chart-container">
    <h3 className="chart-header">{header}</h3>
    <Pie data={data} options={options} plugins={plugins} />
  </div>
);

export default PieChart;
