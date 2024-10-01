import { useReplays } from "./ReplaysContext";
import { wrappedUtils } from "./utils";
import { useState, useEffect } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
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

function OvertimeStats() {
  const { replays, playerName } = useReplays();
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

  function overtimWinRate() {
    const overtimeWins = replays.filter((replay) => {
      const isWinner = wrappedUtils.isPlayerWinner(replay, playerName);
      const overtimeSeconds = wrappedUtils.getOvertimeSeconds(replay);
      return isWinner && overtimeSeconds > 0;
    });
    const winRate = overtimeWins.length / getOvertimes().length;
    return winRate.toFixed(2);
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
        const isWinner = wrappedUtils.isPlayerWinner(replay, playerName);
        const overtimeSeconds = wrappedUtils.getOvertimeSeconds(replay);
        return isWinner && overtimeSeconds > 0;
      })
      .map((replay) => {
        const overtimeSeconds = wrappedUtils.getOvertimeSeconds(replay);
        return parseInt(overtimeSeconds, 10);
      });

    // console.log("Filtered Overtimes:", overtimes);
    const longestOvertimeSeconds = Math.max(...overtimes);
    return formatOvertime(longestOvertimeSeconds);
  }

  function longestOvertimeLoss() {
    const overtimes = replays
      .filter((replay) => {
        const isLoser = !wrappedUtils.isPlayerWinner(replay, playerName);
        const overtimeSeconds = wrappedUtils.getOvertimeSeconds(replay);
        return isLoser && overtimeSeconds > 0;
      })
      .map((replay) => {
        const overtimeSeconds = wrappedUtils.getOvertimeSeconds(replay);
        return parseInt(overtimeSeconds, 10);
      });

    // console.log("Filtered Overtimes:", overtimes);
    const longestOvertimeSeconds = Math.max(...overtimes);
    return formatOvertime(longestOvertimeSeconds);
  }

  const overtimeWinRatePieData = () => {
    const winsAndLosses = [];
    const allOvertimes = replays.filter((replay) => {
      const overtimeSeconds = wrappedUtils.getOvertimeSeconds(replay);
      return overtimeSeconds > 0;
    });
    const overtimeWins = allOvertimes.filter((replay) => {
      const isWinner = wrappedUtils.isPlayerWinner(replay, playerName);
      return isWinner;
    });

    const totalLosses = allOvertimes.length - overtimeWins.length;

    winsAndLosses.push(overtimeWins.length, totalLosses);

    return winsAndLosses;
  };

  if (replaysWithOvertimes.length < 1) {
    return (
      <div>
        <br />
        <br />
        <h2>Overtime Stats</h2>
        <br />
        <p>No overtimes found.</p>
      </div>
    );
  }

  return (
    <div>
      <br />
      <br />
      <h2>Overtime Stats</h2>
      <br />
      <div style={{ position: "relative", width: "400px" }}>
        <Pie
          data={{
            labels: ["overtimes won", "overtimes lost"],
            datasets: [
              {
                label: "overtimes",
                data: overtimeWinRatePieData(),
                backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
                hoverOffset: 4,
              },
            ],
          }}
        />
      </div>

      <ul>
        <br />
        <li>% games go to overtime: {overtimeGamesPercent()}%</li>
        <li>longest overtime: {longestOvertime()}</li>
        <li>longest overtime win: {longestOvertimeWin()}</li>
        <li>longest overtime loss: {longestOvertimeLoss()}</li>
        <li>overtime win rate: {overtimWinRate()}</li>
      </ul>
    </div>
  );
}

export default OvertimeStats;
