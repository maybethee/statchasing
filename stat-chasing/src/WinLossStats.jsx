import { useReplays } from "./ReplaysContext";
import { wrappedUtils } from "./utils";
import { useState, useEffect } from "react";
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

function WinLossStats() {
  const { replays, playerId } = useReplays();
  const [biggestWin, setBiggestWin] = useState(null);

  useEffect(() => {
    if (replays.length > 0) {
      setBiggestWin(highestGoalDifferenceGame());
      // setNoReplays(false);
    } else {
      // setNoReplays(true);
    }
  }, [replays]);

  function highestGoalDifferenceGame() {
    const winningReplays = replays.filter((replay) => {
      const isWinner = wrappedUtils.isPlayerWinner(replay, playerId);
      // console.log("is winner?", isWinner);
      return isWinner;
    });

    // console.log("Winning Replays:", winningReplays);

    if (winningReplays.length > 0) {
      return winningReplays.reduce((maxReplay, replay) => {
        const maxGoalDiff = wrappedUtils.getGoalDifference(maxReplay);
        const currentGoalDiff = wrappedUtils.getGoalDifference(replay);
        return currentGoalDiff > maxGoalDiff ? replay : maxReplay;
      }, winningReplays[0]);
    } else {
      return null;
    }
  }

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

  // there may be a bug with biggestWin where it returns the playerId's team's players as opponents names (maybe only when there are very few replays? or maybe i mistook this when looking at some other player i'd played against and it showed my name as an opposing player?)
  function formatBiggestWin() {
    // const biggestWin = highestGoalDifferenceGame();

    if (biggestWin) {
      const opponentsWithLinks = wrappedUtils.getOpposingPlayerNamesWithLinks(
        biggestWin,
        playerId
      );

      // console.log(biggestWin["replay_stats"][0]["stats"]);
      return (
        "biggest win: " +
        wrappedUtils.getGoalDifference(biggestWin) +
        " " +
        "goal lead against " +
        opponentsWithLinks +
        " " +
        "on " +
        // eventually: link to replay on ballchasing?
        new Date(
          biggestWin["replay_stats"][0]["stats"]["date"]
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }) +
        "."
      );
    } else {
      return "Biggest win: No wins :( keep trying";
    }
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
    "rgba(75, 192, 192, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(255, 99, 132, 0.6)",
    "rgba(255, 99, 132, 0.6)",
    "rgba(255, 99, 132, 0.6)",
    "rgba(255, 99, 132, 0.6)",
    "rgba(255, 99, 132, 0.6)",
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
      afterDatasetsDraw: drawLabelsPlugin.afterDatasetsDraw,
    },
  };

  const data = {
    labels: ["games won", "games lost"],
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
    <div>
      <h2>Win/Loss Stats</h2>
      <br />
      <PieChart data={data} options={options} plugins={[drawLabelsPlugin]} />
      <br />
      <br />
      average MVPs out of all games: {avgMVPInAllGames()}
      <br />
      <br />
      average MVPs out of only wins: {avgMVPInWins()}
      <div style={{ position: "relative" }}>
        <Bar
          data={{
            labels: [
              "5+ goals",
              "4 goals",
              "3 goals",
              "2 goals",
              "1 goal",
              "1 goal",
              "2 goals",
              "3 goals",
              "4  goals",
              "5+ goals",
            ],
            datasets: [
              {
                // might just make a custom label...
                label: "Games Won | Games Lost",
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
                ticks: {
                  stepSize: 1,
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
      <br />
      <p dangerouslySetInnerHTML={{ __html: formatBiggestWin() }}></p>
    </div>
  );
}

export default WinLossStats;
