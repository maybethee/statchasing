import { Doughnut } from "react-chartjs-2";
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

const DoughnutChart = ({ data, options, plugins }) => (
  <div style={{ position: "relative", width: "400px" }}>
    <Doughnut data={data} options={options} plugins={plugins} />
  </div>
);

export default DoughnutChart;
