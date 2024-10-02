import { useReplays } from "./ReplaysContext";
import { wrappedUtils } from "./utils";
import PieChart from "./PieChart";

function WinLossStats() {
  const { replays, playerId } = useReplays();

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
    </div>
  );
}

export default WinLossStats;
