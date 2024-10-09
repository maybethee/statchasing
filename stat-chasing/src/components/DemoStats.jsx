import { useReplays } from "./ReplaysContext";
import { wrappedUtils } from "../utils";
import PieChart from "./PieChart";
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

function DemoStats({ id, className }) {
  const { replays, playerId } = useReplays();

  function avgDemosInflicted(replaysArr = replays) {
    const sum = replaysArr.reduce(
      (sum, replay) => sum + wrappedUtils.getDemosInflicted(replay, playerId),
      0
    );
    const avg = sum / replaysArr.length;
    return avg.toFixed(2);
  }

  function avgDemosTaken(replaysArr = replays) {
    const sum = replaysArr.reduce(
      (sum, replay) => sum + wrappedUtils.getDemosTaken(replay, playerId),
      0
    );
    const avg = sum / replaysArr.length;
    return avg.toFixed(2);
  }

  function highestDemoCount() {
    const demos = replays.map((replay) => {
      const demosInGame = wrappedUtils.getDemosInflicted(replay, playerId);
      return parseInt(demosInGame, 10);
    });
    return Math.max(...demos);
  }

  function demosInflictedTakenRatio() {
    return [avgDemosInflicted(), avgDemosTaken()];
  }

  function demosInLosses() {
    const losingReplays = replays.filter((replay) => {
      const isWinner = wrappedUtils.isPlayerWinner(replay, playerId);
      return !isWinner;
    });

    const avgInflicted = avgDemosInflicted(losingReplays);

    const avgTaken = avgDemosTaken(losingReplays);

    return [avgInflicted, avgTaken];
  }

  function demosInWins() {
    const winningReplays = replays.filter((replay) => {
      const isWinner = wrappedUtils.isPlayerWinner(replay, playerId);
      return isWinner;
    });

    const avgInflicted = avgDemosInflicted(winningReplays);

    const avgTaken = avgDemosTaken(winningReplays);

    return [avgInflicted, avgTaken];
  }

  const avgDemoStatsData = {
    labels: ["Wins", "Losses"],
    datasets: [
      {
        label: "Inflicted",
        data: [demosInWins()[0], demosInLosses()[0]],
        backgroundColor: "rgb(54, 162, 235)",
        // hoverOffset: 4,
      },
      {
        label: "Taken",
        data: [demosInWins()[1], demosInLosses()[1]],
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  const drawLabelsPlugin = {
    afterDraw: function (chart) {
      const ctx = chart.ctx;
      const datasets = chart.data.datasets[0].data;

      ctx.save();
      datasets.forEach((value, index) => {
        const meta = chart.getDatasetMeta(0);
        const arc = meta.data[index];
        const properties = arc.getProps(
          ["x", "y", "startAngle", "endAngle", "outerRadius", "innerRadius"],
          true
        );
        const {
          x: centerX,
          y: centerY,
          startAngle,
          endAngle,
          outerRadius,
        } = properties;
        const midAngle = (startAngle + endAngle) / 2;
        const labelX = centerX + (outerRadius - 45) * Math.cos(midAngle); // Adjust the label position
        const labelY = centerY + (outerRadius - 45) * Math.sin(midAngle); // Adjust the label position

        ctx.fillStyle = "white";
        ctx.font = "bold 14px sans-serif";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(value, labelX, labelY);
      });
      ctx.restore();
    },
  };

  const data = {
    labels: ["Demos Inflicted", "Demos Taken"],
    datasets: [
      {
        label: "Demos",
        data: demosInflictedTakenRatio(),
        backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
      afterDatasetsDraw: drawLabelsPlugin.afterDatasetsDraw,
    },
  };

  return (
    <div id={id} className={className}>
      <h3>Demolition Stats</h3>
      <ul>
        <li>Most demos in a single game: {highestDemoCount()}</li>
      </ul>

      <div className="chart-container bar-chart">
        <Bar
          data={avgDemoStatsData}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: "white",
                },
              },
            },
            maintainAspectRatio: true,
            responsive: true,
            scales: {
              y: {
                ticks: {
                  stepSize: 0.2,
                  color: "rgba(230, 232, 239, 0.7)",
                },
                grid: {
                  color: "rgba(230, 232, 239, 0.2)",
                },
              },
              x: {
                ticks: {
                  color: "rgba(230, 232, 239, 0.7)",
                },
                grid: {
                  color: "rgba(230, 232, 239, 0.2)",
                },
              },
            },
          }}
        />
      </div>

      {avgDemosInflicted() > 0 && avgDemosTaken() > 0 ? (
        <PieChart data={data} options={options} plugins={[drawLabelsPlugin]} />
      ) : null}
    </div>
  );
}

export default DemoStats;
