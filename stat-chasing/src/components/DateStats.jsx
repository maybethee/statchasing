import { useReplays } from "./ReplaysContext";
import { useState, useEffect } from "react";
import { wrappedUtils } from "../utils";
import pluralize from "pluralize";

function DateStats({ id, className }) {
  const { replays, playerId } = useReplays();
  const [biggestWin, setBiggestWin] = useState(null);

  useEffect(() => {
    if (replays.length > 0) {
      setBiggestWin(highestGoalDifferenceGame());
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

  // there may be a bug with biggestWin where it returns the playerId's team's players as opponents names (maybe only when there are very few replays? or maybe i mistook this when looking at some other player i'd played against and it showed my name as an opposing player?)
  function formatBiggestWin() {
    // const biggestWin = highestGoalDifferenceGame();

    if (biggestWin) {
      const opponentsWithLinks = wrappedUtils.getOpposingPlayerNamesWithLinks(
        biggestWin,
        playerId
      );
      const date = new Date(
        biggestWin["replay_stats"][0]["stats"]["date"]
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const biggestWinLink = wrappedUtils.getLinkToReplay(biggestWin, date);

      // console.log(biggestWin["replay_stats"][0]["stats"]);
      return (
        "Biggest win: " +
        wrappedUtils.getGoalDifference(biggestWin) +
        " " +
        "goal lead against " +
        opponentsWithLinks +
        " " +
        "on " +
        // eventually: link to replay on ballchasing?
        biggestWinLink +
        "."
      );
    } else {
      return "Biggest win: No wins :( keep trying";
    }
  }

  function sortReplaysByDate(replays) {
    return replays.sort(
      (a, b) => new Date(a.data.date) - new Date(b.data.date)
    );
  }

  function groupReplaysByDate() {
    const dateGroups = {};
    replays.forEach((replay) => {
      const date = wrappedUtils.splitReplayDate(replay);
      if (!dateGroups[date]) {
        dateGroups[date] = [];
      }
      dateGroups[date].push(replay);
    });
    return dateGroups;
  }

  function groupWinsByDate(dateGroups) {
    const winsByDate = {};
    for (const date in dateGroups) {
      winsByDate[date] = dateGroups[date].reduce((count, replay) => {
        return count + (wrappedUtils.isPlayerWinner(replay, playerId) ? 1 : 0);
      }, 0);
    }
    return winsByDate;
  }

  function dateWithMostWins(winsByDate) {
    return Object.entries(winsByDate).reduce(
      (acc, [date, wins]) => {
        if (wins > acc.maxVal) {
          acc.maxVal = wins;
          acc.maxKeys = [date];
        } else if (wins === acc.maxVal) {
          acc.maxKeys.push(date);
        }
        return acc;
      },
      { maxVal: 0, maxKeys: [] }
    );
  }

  const dateWithMostReplays = (dateGroups) => {
    return Object.entries(dateGroups).reduce(
      (acc, [date, replays]) => {
        // console.log("acc:", acc);
        // console.log("date:", date);
        // console.log("acc:", replays);
        const count = replays.length;
        if (count > acc.maxVal) {
          acc.maxVal = count;
          acc.maxKeys = [date];
        } else if (count === acc.maxVal) {
          acc.maxKeys.push(date);
        }
        return acc;
      },
      { maxVal: 0, maxKeys: [] }
    );
  };

  function formatDateWithMostWins() {
    const dateGroups = groupReplaysByDate(replays);
    const winsByDate = groupWinsByDate(dateGroups);
    const { maxVal, maxKeys } = dateWithMostWins(winsByDate);

    const formattedDates = maxKeys
      .map((key, index) => {
        const keyDate = new Date(key + "T00:00:00").toLocaleDateString(
          "en-US",
          {
            timeZone: "UTC",
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        );
        if (index === maxKeys.length - 1 && maxKeys.length > 1) {
          return `and ${keyDate}`;
        }
        return keyDate;
      })
      .join(maxKeys.length > 2 ? ", " : " ");

    return `${pluralize(
      "Date",
      maxKeys.length
    )} with most wins: ${formattedDates}, with ${maxVal} ${pluralize(
      "win",
      maxVal
    )}`;
  }

  function getAllWinStreaks() {
    let currentStreak = 0;
    const streaks = {};
    let id = 0;

    const sortedReplays = sortReplaysByDate(replays);
    sortedReplays.forEach((replay) => {
      const date = wrappedUtils.splitReplayDate(replay);
      // console.log(replay.data.date);
      if (!wrappedUtils.isPlayerWinner(replay, playerId)) {
        // if loss

        // record streak before resetting
        if (`${id}` in streaks) {
          // if loss is the end of a streak

          // streaks[`${id}`].endDate = replay.data.date;
          streaks[`${id}`].endDate = date;
          streaks[`${id}`].winStreak = currentStreak;
        } else {
          // first game is loss or first game after end of streak is another loss

          streaks[`${id}`] = {};
          // streaks[`${id}`].endDate = replay.data.date;
          streaks[`${id}`].endDate = date;
          streaks[`${id}`].winStreak = currentStreak;
        }

        // reset streak counter
        currentStreak = 0;
        id++;
      } else {
        // if a win

        if (currentStreak < 1) {
          // on first win of win streak

          // will always need new obj created for id in this case
          streaks[`${id}`] = {};

          // record start date
          streaks[`${id}`].startDate = date;

          // prevents missing key for edge cases
          if (!("winStreak" in streaks[`${id}`])) {
            streaks[`${id}`].winStreak = 0;
          }
        }
        // increase streak
        currentStreak++;
      }
    });
    // console.log("all streaks:", streaks);
    return streaks;
  }

  function getHighestWinStreak(winStreaks) {
    let maxWinStreak = -Infinity;
    let objectsWithMaxWinStreak = [];

    for (const id in winStreaks) {
      if (winStreaks[id].winStreak > maxWinStreak) {
        maxWinStreak = winStreaks[id].winStreak;
        objectsWithMaxWinStreak = [winStreaks[id]];
      } else if (winStreaks[id].winStreak === maxWinStreak) {
        objectsWithMaxWinStreak.push(winStreaks[id]);
      }
    }
    // console.log(maxWinStreak);
    return { maxWinStreak, objectsWithMaxWinStreak };
  }

  function formatHighestWinStreak() {
    const winStreaks = getAllWinStreaks();
    const { maxWinStreak, objectsWithMaxWinStreak } =
      getHighestWinStreak(winStreaks);

    if (maxWinStreak < 1) {
      return "Largest win streak: No win streak yet";
    }

    const formattedStreaks = objectsWithMaxWinStreak
      .map((obj, index) => {
        const startDate = new Date(obj.startDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        const endDate = new Date(obj.endDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        if (
          index === objectsWithMaxWinStreak.length - 1 &&
          objectsWithMaxWinStreak.length > 1
        ) {
          return `and from ${startDate} to ${endDate}`;
        }
        return `from ${startDate} to ${endDate}`;
      })
      .join(objectsWithMaxWinStreak.length > 2 ? ", " : " ");

    // if (maxWinStreak === -Infinity) {
    //   return "Win more than one game in a row to see your largest win streak!";
    // }

    return `Largest win ${pluralize(
      "streak",
      objectsWithMaxWinStreak.length
    )}: ${maxWinStreak} ${pluralize("win", maxWinStreak)} ${formattedStreaks}.`;
  }

  function avgGamesPlayedPerSession() {
    const dateGroups = groupReplaysByDate(replays);
    // console.log("date groups arr:", dateGroups);

    let gamesPlayed = [];
    Object.entries(dateGroups).forEach((date) => {
      // console.log("date", date[1].length);
      gamesPlayed.push(date[1].length);
    });

    // console.log("games played:", gamesPlayed);

    const sum = gamesPlayed.reduce((sum, date) => sum + date, 0);
    const avg = sum / gamesPlayed.length;
    return avg.toFixed(2);
  }

  function avgGamesPlayedPerDay() {
    const dateGroups = groupReplaysByDate(replays);
    // console.log("date groups arr:", dateGroups);

    const dates = Object.keys(dateGroups).sort();
    const firstDate = new Date(dates[0]);
    const lastDate = new Date(dates[dates.length - 1]);

    let currentDate = new Date(firstDate);
    let gamesPlayed = [];

    while (currentDate <= lastDate) {
      const dateString = currentDate.toISOString().split("T")[0];
      if (dateGroups[dateString]) {
        gamesPlayed.push(dateGroups[dateString].length);
      } else {
        gamesPlayed.push(0);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // console.log("games played:", gamesPlayed);

    const sum = gamesPlayed.reduce((sum, games) => sum + games, 0);
    const avg = sum / gamesPlayed.length;
    return avg.toFixed(2);
  }

  function formatDateWithMostReplays() {
    const dateGroups = groupReplaysByDate(replays);
    const { maxVal, maxKeys } = dateWithMostReplays(dateGroups);

    const formattedDates = maxKeys
      .map((key, index) => {
        const keyDate = new Date(key + "T00:00:00").toLocaleDateString(
          "en-US",
          {
            timeZone: "UTC",
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        );
        if (index === maxKeys.length - 1 && maxKeys.length > 1) {
          return `and ${keyDate}`;
        }
        return keyDate;
      })
      .join(maxKeys.length > 2 ? ", " : " ");

    return `${pluralize(
      "Date",
      maxKeys.length
    )} with most played games: ${formattedDates}, with ${maxVal} ${pluralize(
      "game",
      maxVal
    )}`;
  }

  return (
    <div id={id} className={className}>
      <h3>Date Stats</h3>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: formatBiggestWin() }}></li>
        <li>{formatHighestWinStreak()}</li>
        <li>
          Average ranked games played per session: {avgGamesPlayedPerSession()}
        </li>
        <li>Average ranked games played per day: {avgGamesPlayedPerDay()}</li>
        <li>{formatDateWithMostReplays()}</li>
        <li>{formatDateWithMostWins()}</li>
      </ul>
    </div>
  );
}

export default DateStats;
