import { useReplays } from "./ReplaysContext";
import { wrappedUtils } from "./utils";
import pluralize from "pluralize";

function MapStats() {
  const { replays, playerId } = useReplays();

  function groupReplaysByMap() {
    const mapGroups = {};
    replays.forEach((replay) => {
      const mapName = wrappedUtils.getMapName(replay);
      if (!mapGroups[mapName]) {
        mapGroups[mapName] = [];
      }
      mapGroups[mapName].push(replay);
    });
    return mapGroups;
  }

  function groupWinsByMap(mapGroups) {
    const winsByMap = {};
    for (const mapName in mapGroups) {
      winsByMap[mapName] = mapGroups[mapName].reduce((count, replay) => {
        return count + (wrappedUtils.isPlayerWinner(replay, playerId) ? 1 : 0);
      }, 0);
    }
    return winsByMap;
  }

  function mapWithMostWins(winsByMap) {
    return Object.entries(winsByMap).reduce(
      (acc, [mapName, wins]) => {
        if (wins > acc.maxVal) {
          acc.maxVal = wins;
          acc.maxKeys = [mapName];
        } else if (wins === acc.maxVal) {
          acc.maxKeys.push(mapName);
        }
        return acc;
      },
      { maxVal: 0, maxKeys: [] }
    );
  }

  const mapWithMostReplays = (mapGroups) => {
    return Object.entries(mapGroups).reduce(
      (acc, [mapName, replays]) => {
        const count = replays.length;
        if (count > acc.maxVal) {
          acc.maxVal = count;
          acc.maxKeys = [mapName];
        } else if (count === acc.maxVal) {
          acc.maxKeys.push(mapName);
        }
        return acc;
      },
      { maxVal: 0, maxKeys: [] }
    );
  };

  function formatMapWithMostWins() {
    // console.log(mapWithMostWins(addWinsPerMap()));
    const mapGroups = groupReplaysByMap(replays);
    const winsByMap = groupWinsByMap(mapGroups);
    const { maxVal, maxKeys } = mapWithMostWins(winsByMap);

    const formattedDates = maxKeys
      .map((key, index) => {
        if (index === maxKeys.length - 1 && maxKeys.length > 1) {
          return `and ${key}`;
        }
        return key;
      })
      .join(maxKeys.length > 2 ? ", " : " ");

    return `${pluralize(
      "Map",
      maxKeys.length
    )} with most wins: ${formattedDates}, with ${maxVal} ${pluralize(
      "win",
      maxVal
    )}`;
  }

  function formatMapWithMostReplays() {
    // console.log(mapWithMostWins(addWinsPerMap()));
    const mapGroups = groupReplaysByMap(replays);
    const { maxVal, maxKeys } = mapWithMostReplays(mapGroups);

    const formattedDates = maxKeys
      .map((key, index) => {
        if (index === maxKeys.length - 1 && maxKeys.length > 1) {
          return `and ${key}`;
        }
        return key;
      })
      .join(maxKeys.length > 2 ? ", " : " ");

    return `${pluralize(
      "Map",
      maxKeys.length
    )} with most played games: ${formattedDates}, with ${maxVal} ${pluralize(
      "game",
      maxVal
    )}`;
  }

  return (
    <div>
      <br />
      <br />
      <h3>Map Stats</h3>
      <br />
      <ul>
        <li>{formatMapWithMostReplays()}</li>
        <li>{formatMapWithMostWins()}</li>
      </ul>
      <br />
    </div>
  );
}

export default MapStats;
