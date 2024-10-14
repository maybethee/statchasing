import { useReplays } from "../ReplaysContext";
import { wrappedUtils } from "../../utils/utils";
// import { useState, useEffect } from "react";
import PieChart from "../charts/PieChart";
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

function WinLossStats({ id, className }) {
  const { replays, playerId } = useReplays();

  function gamesWonGoalDiffs() {
    const goalDiffsArr = [];

    // 5 times, do:
    for (let n = 1; n <= 5; n++) {
      const gamesAtNDiff = replays.filter((replay) => {
        const isWinner = wrappedUtils.isPlayerWinner(replay, playerId);
        const nGoals = wrappedUtils.isGoalDifference(replay, n);
        return isWinner && nGoals;
      });
      // console.log(gamesAtNDiff);
      // console.log(gamesAtNDiff.length);
      goalDiffsArr.push(gamesAtNDiff.length);
    }
    // console.log("games won diff array: ", goalDiffsArr);
    return goalDiffsArr;
  }

  function gamesLostGoalDiffs() {
    const goalDiffsArr = [];

    // 5 times, do:
    for (let n = 1; n <= 5; n++) {
      const gamesAtNDiff = replays.filter((replay) => {
        const isLoser = !wrappedUtils.isPlayerWinner(replay, playerId);
        const nGoals = wrappedUtils.isGoalDifference(replay, n);
        return isLoser && nGoals;
      });
      // console.log(gamesAtNDiff);
      // console.log(gamesAtNDiff.length);
      goalDiffsArr.push(gamesAtNDiff.length);
    }
    // console.log("games lost diff array: ", goalDiffsArr);
    return goalDiffsArr;
  }

  function avgMVPInAllGames() {
    const sum = replays.reduce((sum, replay) => {
      if (wrappedUtils.isPlayerMVP(replay, playerId)) {
        return sum + 1;
      }
      return sum;
    }, 0);
    const avg = sum / replays.length;
    return avg.toFixed(2);
  }

  function avgMVPInWins() {
    // note: this filter is necessary to differentiate from the above statistic
    const filteredReplays = replays.filter((replay) => {
      const isWinner = wrappedUtils.isPlayerWinner(replay, playerId);
      return isWinner;
    });
    const sum = filteredReplays.reduce((sum, replay) => {
      if (wrappedUtils.isPlayerMVP(replay, playerId)) {
        return sum + 1;
      }
      return sum;
    }, 0);
    const avg = sum / filteredReplays.length;
    return avg.toFixed(2);
  }

  const winRatePieData = () => {
    const winsAndLosses = [];
    const totalWins = replays.filter((replay) => {
      return wrappedUtils.isPlayerWinner(replay, playerId);
    });

    const totalLosses = replays.filter((replay) => {
      return !wrappedUtils.isPlayerWinner(replay, playerId);
    });

    winsAndLosses.push(totalWins.length, totalLosses.length);

    return winsAndLosses;
  };

  const drawLabelsPlugin = {
    afterDraw: function (chart) {
      const ctx = chart.ctx;
      const datasets = chart.data.datasets[0].data;
      const total = datasets.reduce((acc, value) => acc + parseFloat(value), 0);

      ctx.save();
      datasets.forEach((value, index) => {
        const meta = chart.getDatasetMeta(0);
        const arc = meta.data[index];
        const properties = arc.getProps(
          ["x", "y", "startAngle", "endAngle", "outerRadius"],
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
        const percentage = ((parseFloat(value) / total) * 100).toFixed(1);

        ctx.fillStyle = "white";
        ctx.font = "bold 14px sans-serif";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(`${percentage}%`, labelX, labelY);
      });
      ctx.restore();
    },
  };

  const combinedGoalDiffs = gamesWonGoalDiffs()
    .reverse()
    .concat(gamesLostGoalDiffs());

  const backgroundColors = [
    "rgba(54, 162, 235, 0.8)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(255, 99, 132, 0.8)",
    "rgba(255, 99, 132, 0.8)",
    "rgba(255, 99, 132, 0.8)",
    "rgba(255, 99, 132, 0.8)",
    "rgba(255, 99, 132, 0.8)",
  ];

  const borderColors = [
    "rgba(75, 192, 192, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(255, 99, 132, 1)",
  ];

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

  const data = {
    labels: ["Games Won", "Games Lost"],
    datasets: [
      {
        label: "Games",
        data: winRatePieData(),
        backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div id={id} className={className}>
      <h3>Win/Loss Stats</h3>
      <ul>
        <li>Average MVPs out of all games: {avgMVPInAllGames()}</li>
        <li>Average MVPs out of only wins: {avgMVPInWins()}</li>
      </ul>

      <PieChart
        data={data}
        options={options}
        plugins={[drawLabelsPlugin]}
        header="Win/Loss ratio"
      />

      <div className="bar-chart">
        <div>
          <h3 className="chart-header">Games by goal difference</h3>
          <div className="bar-chart-label">
            <div>
              <span
                className="bar-chart-label-span"
                style={{
                  backgroundColor: "rgb(54, 162, 235)",
                }}
              ></span>
              <p>Wins</p>
            </div>
            <div>
              <span
                className="bar-chart-label-span"
                style={{
                  backgroundColor: "rgb(255, 95, 132)",
                }}
              ></span>
              <p>Losses</p>
            </div>
          </div>
        </div>
        <Bar
          data={{
            labels: ["5+", "4", "3", "2", "1", "1", "2", "3", "4", "5+"],
            datasets: [
              {
                // might just make a custom label...
                label: "",
                data: combinedGoalDiffs,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
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

export default WinLossStats;
