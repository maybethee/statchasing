import { useReplays } from "./ReplaysContext";
import { wrappedUtils } from "./utils";
import PieChart from "./PieChart";

function DemoStats() {
  const { replays, playerId } = useReplays();

  function avgDemosInflicted() {
    const sum = replays.reduce(
      (sum, replay) => sum + wrappedUtils.getDemosInflicted(replay, playerId),
      0
    );
    const avg = sum / replays.length;
    return avg.toFixed(2);
  }

  function avgDemosTaken() {
    const sum = replays.reduce(
      (sum, replay) => sum + wrappedUtils.getDemosTaken(replay, playerId),
      0
    );
    const avg = sum / replays.length;
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
    labels: ["demos inflicted", "demos taken"],
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
      afterDatasetsDraw: drawLabelsPlugin.afterDatasetsDraw,
    },
  };

  return (
    <div>
      <br />
      <br />
      <h2>Demolition Stats</h2>
      <br />
      <PieChart data={data} options={options} plugins={[drawLabelsPlugin]} />
      <br />
      <ul>
        <li>most demos in a single game: {highestDemoCount()}</li>
      </ul>
    </div>
  );
}

export default DemoStats;
