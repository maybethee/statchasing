import { useState } from "react";
import { useReplays } from "./ReplaysContext";
import { wrappedUtils } from "./utils";

function MovementStats() {
  const { replays, playerName } = useReplays();
  const [playlist, setPlaylist] = useState(null);

  function filterReplays() {
    let replaysArr = replays;

    if (playlist) {
      replaysArr = replays.filter((replay) => {
        const inPlaylist = wrappedUtils.inPlaylist(replay, playlist);
        return inPlaylist;
      });
    }

    return replaysArr || [];
  }

  function avgSupersonic() {
    const filteredReplays = filterReplays();

    // console.log(
    //   "remaining replay id:",
    //   filteredReplays.map((replay) => {
    //     return replay["replay_stats"][0]["stats"]["playlist_id"];
    //   })
    // );

    const sum = filteredReplays.reduce(
      (sum, replay) =>
        sum + wrappedUtils.getPercentSupersonicSpeed(replay, playerName),
      0
    );
    const avg = sum / filteredReplays.length;
    return avg.toFixed(2);
  }
  function avgBoostSpeed() {
    const filteredReplays = filterReplays();

    const sum = filteredReplays.reduce(
      (sum, replay) =>
        sum + wrappedUtils.getPercentBoostSpeed(replay, playerName),
      0
    );
    const avg = sum / filteredReplays.length;
    return avg.toFixed(2);
  }

  function avgSlowSpeed() {
    const filteredReplays = filterReplays();

    const sum = filteredReplays.reduce(
      (sum, replay) =>
        sum + wrappedUtils.getPercentSlowSpeed(replay, playerName),
      0
    );
    const avg = sum / filteredReplays.length;
    return avg.toFixed(2);
  }

  function avgBPM() {
    const filteredReplays = filterReplays();

    const sum = filteredReplays.reduce(
      (sum, replay) => sum + wrappedUtils.getBPM(replay, playerName),
      0
    );
    const avg = sum / filteredReplays.length;
    return avg.toFixed(2);
  }

  function avgBCPM() {
    const filteredReplays = filterReplays();

    const sum = filteredReplays.reduce(
      (sum, replay) => sum + wrappedUtils.getBCPM(replay, playerName),
      0
    );
    const avg = sum / filteredReplays.length;
    return avg.toFixed(2);
  }

  function avgOfAvgSpeed() {
    const filteredReplays = filterReplays();

    const sum = filteredReplays.reduce(
      (sum, replay) => sum + wrappedUtils.getAvgSpeed(replay, playerName),
      0
    );
    return sum / filteredReplays.length;
  }

  function formatAvgOfAvgSpeed() {
    const avg = avgOfAvgSpeed();

    const avgAsPercent = (avg / 2300) * 100;
    return avgAsPercent.toFixed(2) + "%" + " (" + Math.trunc(avg) + "uu/s)";
  }

  // default should be the initial replays array
  function sumTotalDistance(replaysArr = replays) {
    return replaysArr.reduce(
      (sum, replay) => sum + wrappedUtils.getTotalDistance(replay, playerName),
      0
    );
  }

  function avgDistance() {
    const filteredReplays = filterReplays();
    const sum = sumTotalDistance(filteredReplays);
    const avg = sum / filteredReplays.length;
    return avg.toFixed(2);
  }

  // figure out a better system for the buttons, maybe just set up an object with button names and their associated playlist names, and only display replays under played playlists, as i did with the car stats
  return (
    <div>
      <br />
      <br />
      <h2>Movement/Speed Stats</h2>
      <br />
      <button onClick={() => setPlaylist(null)}>All</button>
      <button onClick={() => setPlaylist("ranked-duels")}>1v1</button>
      <button onClick={() => setPlaylist("ranked-doubles")}>2v2</button>
      <button onClick={() => setPlaylist("ranked-standard")}>3v3</button>
      <br />
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
