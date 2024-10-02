const withReplayStats =
  (fn) =>
  (replay, ...args) => {
    const replayStats = replay["replay_stats"][0]["stats"];
    return fn(replayStats, ...args);
  };

// const findPlayer = (team, playerName) => {
//   return team ? team.find((player) => player["name"] === playerName) : null;
// };

const findPlayerById = (team, playerId) => {
  // split playerId
  const splitId = playerId.split(":")[1];
  return team ? team.find((player) => player["id"]["id"] === splitId) : null;
};

const inPlaylist = (replayStats, playlist) => {
  return replayStats["playlist_id"] === playlist ? true : false;
};

const withUsedCar = (replayStats, playerId, carName) => {
  const usedCar = getUsedCar(replayStats, playerId);
  return usedCar === carName ? true : false;
};

// keep an eye on this, sometimes car_name is undefined unexpectedly? maybe similar to the map name returning undefined for the newest map, maybe was a newer car that wasn't updated in balllchasing
const getUsedCar = (replayStats, playerId) => {
  const { blueTeam, orangeTeam } = getTeams(replayStats);

  const player =
    findPlayerById(blueTeam, playerId) || findPlayerById(orangeTeam, playerId);

  // console.log("player", player);

  if (player) {
    return player["car_name"] ? player["car_name"] : null;
  }
};

const getTeams = (replayStats) => {
  const blueTeam = replayStats["blue"] ? replayStats["blue"]["players"] : [];
  const orangeTeam = replayStats["orange"]
    ? replayStats["orange"]["players"]
    : [];

  // console.log("replay stats blue:", replayStats["blue"]);
  // console.log("orange team:", orangeTeam);
  return { blueTeam, orangeTeam };
};

const joinNamesWithLinks = (players) => {
  if (players.length === 0) return "";
  if (players.length === 1)
    return `<a href="${players[0].profileLink}">${players[0].name}</a>`;
  if (players.length === 2)
    return players
      .map((player) => `<a href="${player.profileLink}">${player.name}</a>`)
      .join(" and ");

  return (
    players
      .slice(0, -1)
      .map((player) => `<a href="${player.profileLink}">${player.name}</a>`)
      .join(", ") +
    ", and " +
    `<a href="${players[players.length - 1].profileLink}">${
      players[players.length - 1].name
    }</a>`
  );
};

const getOpposingPlayerNamesWithLinks = (replayStats, playerId) => {
  const opposingTeam = getOpposingTeam(replayStats, playerId);
  const opposingPlayers = getOpposingPlayers(opposingTeam);

  return joinNamesWithLinks(opposingPlayers);
};

const getOpposingTeam = (replayStats, playerId) => {
  const { blueTeam, orangeTeam } = getTeams(replayStats);

  let opposingTeam;

  findPlayerById(blueTeam, playerId)
    ? (opposingTeam = orangeTeam)
    : (opposingTeam = blueTeam);

  return opposingTeam;
};

const getOpposingPlayers = (opposingTeam) => {
  let players = [];

  for (let player = 0; player < opposingTeam.length; player++) {
    // console.log("curr player: ", opposingTeam[player]);
    players.push({
      id: player,
      name: opposingTeam[player]["name"],
      profileLink: `https://ballchasing.com/player/${opposingTeam[player]["id"]["platform"]}/${opposingTeam[player]["id"]["id"]}`,
    });
  }

  // console.log("array of player profile objs", players);
  return players;
};

const getPlayerStats = (replayStats, playerId) => {
  const { blueTeam, orangeTeam } = getTeams(replayStats);

  const player =
    findPlayerById(blueTeam, playerId) || findPlayerById(orangeTeam, playerId);

  return player ? player["stats"] : null;
};

const getPlayerNameById = (replayStats, playerId) => {
  const { blueTeam, orangeTeam } = getTeams(replayStats);

  const player =
    findPlayerById(blueTeam, playerId) || findPlayerById(orangeTeam, playerId);

  return player ? player["name"] : "";
};

const splitReplayDate = (replayStats) => {
  return replayStats["date"].split("T")[0];
};

const getMapName = (replayStats) => {
  return replayStats["map_name"]
    ? replayStats["map_name"]
    : replayStats["map_code"];
};

const isPlayerWinner = (replayStats, playerId) => {
  // console.log(replayStats);

  const splitId = playerId.split(":")[1];
  const { blueTeam, orangeTeam } = getTeams(replayStats);
  const winningTeam = getWinningTeam(replayStats);

  // console.log("split id:", splitId);
  // console.log("blue team players:", blueTeam);
  // console.log("orange team players:", orangeTeam);

  // true if player name is on winning team
  return (
    (blueTeam.some((player) => player["id"]["id"] === splitId) &&
      winningTeam === "blue") ||
    (orangeTeam.some((player) => player["id"]["id"] === splitId) &&
      winningTeam === "orange")
  );
};

const getPercentSupersonicSpeed = (replayStats, playerId) => {
  const playerStats = getPlayerStats(replayStats, playerId);
  return playerStats ? playerStats["movement"]["percent_supersonic_speed"] : 0;
};

const getPercentBoostSpeed = (replayStats, playerId) => {
  const playerStats = getPlayerStats(replayStats, playerId);
  return playerStats ? playerStats["movement"]["percent_boost_speed"] : 0;
};

const getPercentSlowSpeed = (replayStats, playerId) => {
  const playerStats = getPlayerStats(replayStats, playerId);
  return playerStats ? playerStats["movement"]["percent_slow_speed"] : 0;
};

const getAvgSpeed = (replayStats, playerId) => {
  const playerStats = getPlayerStats(replayStats, playerId);
  return playerStats ? playerStats["movement"]["avg_speed"] : 0;
};

const getBPM = (replayStats, playerId) => {
  const playerStats = getPlayerStats(replayStats, playerId);
  return playerStats ? playerStats["boost"]["bpm"] : 0;
};

const getBCPM = (replayStats, playerId) => {
  const playerStats = getPlayerStats(replayStats, playerId);
  return playerStats ? playerStats["boost"]["bcpm"] : 0;
};

const getDemosInflicted = (replayStats, playerId) => {
  const playerStats = getPlayerStats(replayStats, playerId);
  return playerStats ? playerStats["demo"]["inflicted"] : 0;
};

const getDemosTaken = (replayStats, playerId) => {
  const playerStats = getPlayerStats(replayStats, playerId);
  return playerStats ? playerStats["demo"]["taken"] : 0;
};

const getWinningTeam = (replayStats) => {
  const { blueTeam, orangeTeam } = getTeams(replayStats);
  // console.log("orange goals:", blueTeam[0]["stats"]["core"]["goals_against"]);
  const blueGoals = orangeTeam[0]["stats"]["core"]["goals_against"];
  const orangeGoals = blueTeam[0]["stats"]["core"]["goals_against"];

  return blueGoals > orangeGoals ? "blue" : "orange";
};

// for use with goal differential bar chart, remove 5+ conditional for other purposes
const isGoalDifference = (replayStats, desiredDifference) => {
  if (desiredDifference === 5) {
    return getGoalDifference(replayStats) >= desiredDifference ? true : false;
  } else {
    return getGoalDifference(replayStats) === desiredDifference ? true : false;
  }
};

const getGoalDifference = (replayStats) => {
  const { blueTeam, orangeTeam } = getTeams(replayStats);

  const blueGoals = orangeTeam[0]["stats"]["core"]["goals_against"];
  const orangeGoals = blueTeam[0]["stats"]["core"]["goals_against"];

  return Math.abs(blueGoals - orangeGoals);
};

const getTotalDistance = (replayStats, playerId) => {
  const playerStats = getPlayerStats(replayStats, playerId);
  return playerStats ? playerStats["movement"]["total_distance"] : 0;
};

const getOvertimeSeconds = (replayStats) => {
  return replayStats["overtime_seconds"];
};

const getMainCoreStats = (replayStats, playerId) => {
  const playerStats = getPlayerStats(replayStats, playerId);
  // console.log("replay stats:", replayStats);
  // console.log("player id:", playerId);
  // console.log("player:", playerStats);
  if (!playerStats || !playerStats["core"]) {
    console.error("Invalid player stats");
    return {};
  }

  const corePlayerStats = playerStats["core"];
  // console.log(corePlayerStats);

  const stats = [
    "shots",
    "goals",
    "saves",
    "assists",
    "score",
    "shooting_percentage",
  ];
  const coreStats = {};

  stats.forEach((stat) => {
    coreStats[stat] = corePlayerStats[stat] || 0;
  });

  return coreStats;
};

const isPlayerMVP = (replayStats, playerId) => {
  const playerStats = getPlayerStats(replayStats, playerId);
  console.log("player:", playerStats);
  return playerStats ? playerStats["core"]["mvp"] : null;
};

export const wrappedUtils = {
  isPlayerWinner: withReplayStats(isPlayerWinner),
  isGoalDifference: withReplayStats(isGoalDifference),
  getDemosInflicted: withReplayStats(getDemosInflicted),
  getDemosTaken: withReplayStats(getDemosTaken),
  getTotalDistance: withReplayStats(getTotalDistance),
  getPercentSupersonicSpeed: withReplayStats(getPercentSupersonicSpeed),
  getPercentBoostSpeed: withReplayStats(getPercentBoostSpeed),
  getPercentSlowSpeed: withReplayStats(getPercentSlowSpeed),
  getMapName: withReplayStats(getMapName),
  getOvertimeSeconds: withReplayStats(getOvertimeSeconds),
  getGoalDifference: withReplayStats(getGoalDifference),
  getOpposingPlayerNamesWithLinks: withReplayStats(
    getOpposingPlayerNamesWithLinks
  ),
  getAvgSpeed: withReplayStats(getAvgSpeed),
  getBPM: withReplayStats(getBPM),
  getBCPM: withReplayStats(getBCPM),
  inPlaylist: withReplayStats(inPlaylist),
  splitReplayDate: withReplayStats(splitReplayDate),
  isPlayerMVP: withReplayStats(isPlayerMVP),
  getPlayerNameById: withReplayStats(getPlayerNameById),
  getUsedCar: withReplayStats(getUsedCar),
  withUsedCar: withReplayStats(withUsedCar),
  getMainCoreStats: withReplayStats(getMainCoreStats),
};
