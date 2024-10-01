import { useReplays } from "./ReplaysContext";
import { wrappedUtils } from "./utils";

function MovementStats() {
  const { replays, playerName } = useReplays();

  function avgSupersonic() {
    const sum = replays.reduce(
      (sum, replay) =>
        sum + wrappedUtils.getPercentSupersonicSpeed(replay, playerName),
      0
    );
    const avg = sum / replays.length;
    return avg.toFixed(2);
  }
  function avgBoostSpeed() {
    const sum = replays.reduce(
      (sum, replay) =>
        sum + wrappedUtils.getPercentBoostSpeed(replay, playerName),
      0
    );
    const avg = sum / replays.length;
    return avg.toFixed(2);
  }

  function avgSlowSpeed() {
    const sum = replays.reduce(
      (sum, replay) =>
        sum + wrappedUtils.getPercentSlowSpeed(replay, playerName),
      0
    );
    const avg = sum / replays.length;
    return avg.toFixed(2);
  }

  function avgBPM() {
    const sum = replays.reduce(
      (sum, replay) => sum + wrappedUtils.getBPM(replay, playerName),
      0
    );
    const avg = sum / replays.length;
    return avg.toFixed(2);
  }

  function avgBCPM() {
    const sum = replays.reduce(
      (sum, replay) => sum + wrappedUtils.getBCPM(replay, playerName),
      0
    );
    const avg = sum / replays.length;
    return avg.toFixed(2);
  }

  function avgOfAvgSpeed() {
    const sum = replays.reduce(
      (sum, replay) => sum + wrappedUtils.getAvgSpeed(replay, playerName),
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
      (sum, replay) => sum + wrappedUtils.getTotalDistance(replay, playerName),
      0
    );
  }

  function avgDistance() {
    const sum = sumTotalDistance(replays);
    const avg = sum / replays.length;
    return avg.toFixed(2);
  }

  // figure out a better system for the buttons, maybe just set up an object with button names and their associated playlist names, and only display replays under played playlists, as i did with the car stats
  return (
    <div>
      <br />
      <br />
      <h2>Movement/Speed Stats</h2>
      <br />
      <ul>
        <li>average % supersonic speed: {avgSupersonic()}%</li>
        <li>average % boost speed: {avgBoostSpeed()}%</li>
        <li>average % slow speed: {avgSlowSpeed()}%</li>
        <li>average overall speed: {formatAvgOfAvgSpeed()}</li>
        <br />

        <li>average boost used per minute: {avgBPM()}</li>
        <li>average boost collected per minute: {avgBCPM()}</li>
        <br />
        <li>average distance driven per game: {avgDistance()}</li>
        <br />
        <li> total distance driven across all games: {sumTotalDistance()}</li>
      </ul>
    </div>
  );
}

export default MovementStats;
