import { useReplays } from "./ReplaysContext";
import { wrappedUtils } from "../utils";
import { useState, useEffect } from "react";
import PieChart from "./PieChart";

function OvertimeStats({ className }) {
  const { replays, playerId } = useReplays();
  const [replaysWithOvertimes, setReplaysWithOvertimes] = useState([]);

  useEffect(() => {
    if (replays.length > 0) {
      const overtimes = replays.filter((replay) =>
        wrappedUtils.getOvertimeSeconds(replay)
      );
      setReplaysWithOvertimes(overtimes);
    }
  }, [replays]);

  function formatOvertime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  const getOvertimes = () => {
    return replays.filter((replay) => wrappedUtils.getOvertimeSeconds(replay));
  };

  function overtimeGamesPercent() {
    const overtimePercent = (getOvertimes().length / replays.length) * 100;
    return overtimePercent.toFixed(2);
  }

  function longestOvertime() {
    const overtimes = getOvertimes().map((replay) =>
      parseInt(wrappedUtils.getOvertimeSeconds(replay), 10)
    );
    // console.log("Filtered Overtimes:", overtimes);
    const longestOvertimeSeconds = Math.max(...overtimes);
    return formatOvertime(longestOvertimeSeconds);
  }

  function longestOvertimeWin() {
    const overtimes = replays
      .filter((replay) => {
        const isWinner = wrappedUtils.isPlayerWinner(replay, playerId);
        const overtimeSeconds = wrappedUtils.getOvertimeSeconds(replay);
        return isWinner && overtimeSeconds > 0;
      })
      .map((replay) => {
        const overtimeSeconds = wrappedUtils.getOvertimeSeconds(replay);
        return parseInt(overtimeSeconds, 10);
      });

    // console.log("Filtered Overtimes:", overtimes);
    const longestOvertimeSeconds = Math.max(...overtimes);
    return longestOvertimeSeconds === -Infinity
      ? "No Overtimes Won :("
      : formatOvertime(longestOvertimeSeconds);
  }

  function longestOvertimeLoss() {
    const overtimes = replays
      .filter((replay) => {
        const isLoser = !wrappedUtils.isPlayerWinner(replay, playerId);
        const overtimeSeconds = wrappedUtils.getOvertimeSeconds(replay);
        return isLoser && overtimeSeconds > 0;
      })
      .map((replay) => {
        const overtimeSeconds = wrappedUtils.getOvertimeSeconds(replay);
        return parseInt(overtimeSeconds, 10);
      });

    // console.log("Filtered Overtimes:", overtimes);
    const longestOvertimeSeconds = Math.max(...overtimes);
    return longestOvertimeSeconds === -Infinity
      ? "No Overtimes lost :)"
      : formatOvertime(longestOvertimeSeconds);
  }

  const overtimeWinRatePieData = () => {
    const winsAndLosses = [];
    const allOvertimes = replays.filter((replay) => {
      const overtimeSeconds = wrappedUtils.getOvertimeSeconds(replay);
      return overtimeSeconds > 0;
    });
    const overtimeWins = allOvertimes.filter((replay) => {
      const isWinner = wrappedUtils.isPlayerWinner(replay, playerId);
      return isWinner;
    });

    const totalLosses = allOvertimes.length - overtimeWins.length;

    winsAndLosses.push(overtimeWins.length, totalLosses);

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

  const data = {
    labels: ["overtimes won", "overtimes lost"],
    datasets: [
      {
        label: "overtimes",
        data: overtimeWinRatePieData(),
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

  if (replaysWithOvertimes.length < 1) {
    return (
      <div>
        <h3>Overtime Stats</h3>
        <p>No overtimes found.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <h3>Overtime Stats</h3>
      <PieChart data={data} options={options} plugins={[drawLabelsPlugin]} />
      <ul>
        <li>% games go to overtime: {overtimeGamesPercent()}%</li>
        <li>Longest overtime: {longestOvertime()}</li>
        <li>Longest overtime win: {longestOvertimeWin()}</li>
        <li>Longest overtime loss: {longestOvertimeLoss()}</li>
      </ul>
    </div>
  );
}

export default OvertimeStats;
