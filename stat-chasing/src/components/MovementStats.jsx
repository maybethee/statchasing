import { useReplays } from "./ReplaysContext";
import { wrappedUtils } from "../utils";
import DoughnutChart from "./DoughnutChart";

function MovementStats({ id, className }) {
  const { replays, playerId } = useReplays();

  function avgSupersonic() {
    const sum = replays.reduce(
      (sum, replay) =>
        sum + wrappedUtils.getPercentSupersonicSpeed(replay, playerId),
      0
    );
    const avg = sum / replays.length;
    return avg.toFixed(2);
  }
  function avgBoostSpeed() {
    const sum = replays.reduce(
      (sum, replay) =>
        sum + wrappedUtils.getPercentBoostSpeed(replay, playerId),
      0
    );
    const avg = sum / replays.length;
    return avg.toFixed(2);
  }

  function avgSlowSpeed() {
    const sum = replays.reduce(
      (sum, replay) => sum + wrappedUtils.getPercentSlowSpeed(replay, playerId),
      0
    );
    const avg = sum / replays.length;
    return avg.toFixed(2);
  }

  function avgBPM() {
    const sum = replays.reduce(
      (sum, replay) => sum + wrappedUtils.getBPM(replay, playerId),
      0
    );
    const avg = sum / replays.length;
    return avg.toFixed(2);
  }

  function avgBCPM() {
    const sum = replays.reduce(
      (sum, replay) => sum + wrappedUtils.getBCPM(replay, playerId),
      0
    );
    const avg = sum / replays.length;
    return avg.toFixed(2);
  }

  function avgOfAvgSpeed() {
    const sum = replays.reduce(
      (sum, replay) => sum + wrappedUtils.getAvgSpeed(replay, playerId),
      0
    );
    return sum / replays.length;
  }

  function formatAvgOfAvgSpeed() {
    const avg = avgOfAvgSpeed();

    const avgAsPercent = (avg / 2300) * 100;
    return avgAsPercent.toFixed(2) + "%" + " (" + Math.trunc(avg) + "uu/s)";
  }

  function sumTotalDistance(replaysArr = replays) {
    return replaysArr.reduce(
      (sum, replay) => sum + wrappedUtils.getTotalDistance(replay, playerId),
      0
    );
  }

  function avgDistance() {
    const sum = sumTotalDistance(replays);
    const avg = sum / replays.length;
    return avg.toFixed(2);
  }

  function avgSpeedsRatio() {
    return [avgSlowSpeed(), avgBoostSpeed(), avgSupersonic()];
  }

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
          ["x", "y", "startAngle", "endAngle", "outerRadius", "innerRadius"],
          true
        );
        const {
          x: centerX,
          y: centerY,
          startAngle,
          endAngle,
          outerRadius,
          innerRadius,
        } = properties;
        const midAngle = (startAngle + endAngle) / 2;
        const radius = (outerRadius + innerRadius) / 2;
        const labelX = centerX + radius * Math.cos(midAngle);
        const labelY = centerY + radius * Math.sin(midAngle);
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

  const centerTextPlugin = {
    beforeDraw: function (chart) {
      const ctx = chart.ctx;
      const width = chart.width;
      const height = chart.height;
      ctx.restore();
      const fontSize = (height / 550).toFixed(2); // Adjusted font size calculation
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = "middle";
      const text1 = "Average Speed:";
      const text2 = `${formatAvgOfAvgSpeed()}`;
      const textX1 = Math.round((width - ctx.measureText(text1).width) / 2);
      const textX2 = Math.round((width - ctx.measureText(text2).width) / 2);
      const textY = height / 2;

      ctx.fillStyle = "white";
      ctx.fillText(text1, textX1, textY + 15); // Adjust the Y position for the first line
      ctx.fillText(text2, textX2, textY + 38); // Adjust the Y position for the second line
      ctx.save();
    },
  };

  const data = {
    labels: ["Slow Speed", "Boost Speed", "Supersonic Speed"],
    datasets: [
      {
        labels: ["Average Speed"],
        data: avgSpeedsRatio(),
        backgroundColor: [
          "rgb(204, 50, 50)",
          "rgb(231, 180, 22",
          "rgb(45, 201, 55)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    cutoutPercentage: 70,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
      beforeDraw: centerTextPlugin.beforeDraw,
      afterDatasetsDraw: drawLabelsPlugin.afterDatasetsDraw,
    },
  };
  // figure out a better system for the buttons, maybe just set up an object with button names and their associated playlist names, and only display replays under played playlists, as i did with the car stats
  return (
    <div id={id} className={className}>
      <h3>Movement/Speed Stats</h3>
      <ul>
        <li>Average boost used per minute: {avgBPM()}</li>
        <li>Average boost collected per minute: {avgBCPM()}</li>
        <li>Average distance driven per game: {avgDistance()}</li>
        <li> Total distance driven across all games: {sumTotalDistance()}</li>
      </ul>
      <DoughnutChart
        data={data}
        options={options}
        plugins={[centerTextPlugin, drawLabelsPlugin]}
        header="Percent of time spent at different&nbsp;speeds"
      />
    </div>
  );
}

export default MovementStats;
