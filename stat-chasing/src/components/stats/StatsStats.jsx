import { useReplays } from "../ReplaysContext";
import { wrappedUtils } from "../../utils/utils";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function StatsStats({ id, className }) {
  const { replays, playerId } = useReplays();

  function gamesPerScoreRange() {
    const gamesAtNScoreArr = new Array(11).fill(0);

    replays.forEach((replay) => {
      const coreStats = wrappedUtils.getMainCoreStats(replay, playerId);
      const score = coreStats["score"];

      if (score > 1000) {
        gamesAtNScoreArr[10]++;
      } else {
        const rangeIndex = Math.floor(score / 100);
        gamesAtNScoreArr[rangeIndex]++;
      }
    });

    console.log("filtered games", gamesAtNScoreArr);
    return gamesAtNScoreArr;
  }

  const scoresAtVaryingRanges = gamesPerScoreRange();

  return (
    <div id={id} className={className}>
      <h3>Stats Stats</h3>
      <div className="bar-chart">
        <div>
          <h3 className="chart-header">Games by score&nbsp;range</h3>
          <div className="bar-chart-label">
            <div>
              <span
                className="bar-chart-label-span"
                style={{
                  backgroundColor: "rgb(54, 162, 235)",
                  border: "solid 2px white",
                }}
              ></span>
              <p>Games</p>
            </div>
          </div>
        </div>
        <Bar
          data={{
            labels: [
              "0-99",
              "100-199",
              "200-299",
              "300-399",
              "400-499",
              "500-599",
              "600-699",
              "700-799",
              "800-899",
              "900-999",
              "1000+",
            ],
            datasets: [
              {
                label: "",
                data: scoresAtVaryingRanges,
                backgroundColor: "rgba(54, 162, 235, 0.8)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            maintainAspectRatio: true,
            responsive: true,
            scales: {
              y: {
                title: {
                  display: true,
                  text: "Number of Games",
                  color: "rgb(230, 232, 239)",
                },
                ticks: {
                  stepSize: 1,
                  color: "rgb(230, 232, 239)",
                },
                grid: {
                  color: "rgba(230, 232, 239, 0.2)",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Score Ranges",
                  color: "rgb(230, 232, 239)",
                },
                ticks: {
                  color: "rgb(230, 232, 239)",
                },
                grid: {
                  color: "rgba(230, 232, 239, 0.2)",
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  generateLabels: (chart) => {
                    const { datasets } = chart.data;
                    return datasets.map((dataset) => ({
                      text: dataset.label,
                      fontColor: "white",
                      fillStyle: "transparent",
                      strokeStyle: "transparent",
                    }));
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default StatsStats;
