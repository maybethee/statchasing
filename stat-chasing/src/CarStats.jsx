import { useReplays } from "./ReplaysContext";
import { useEffect, useState } from "react";
import { wrappedUtils } from "./utils";

function CarStats() {
  const { replays, playerName } = useReplays();
  const [usedCar, setUsedCar] = useState(null);
  const [usedCarArr, setUsedCarArr] = useState([]);

  useEffect(() => {
    if (replays.length > 0) {
      let usedCars = [];

      replays.forEach((replay) => {
        const carName = wrappedUtils.getUsedCar(replay, playerName);

        if (carName) {
          usedCars.push(carName);
        }
      });
      let usedCarUniqueArr = usedCars.filter(function (value, id, self) {
        return id == self.indexOf(value) && value != null;
      });

      setUsedCarArr(usedCarUniqueArr);
    }
  }, [replays]);

  function filterReplaysByUsedCar() {
    let replaysWithUsedCar = replays;

    if (usedCar) {
      replaysWithUsedCar = replays.filter((replay) => {
        const hasUsedCar = wrappedUtils.withUsedCar(
          replay,
          playerName,
          usedCar
        );
        return hasUsedCar;
      });
    }

    return replaysWithUsedCar || [];
  }

  function avgMainCoreStats() {
    const filteredReplays = filterReplaysByUsedCar();

    let statsArr = filteredReplays.map((replay) =>
      wrappedUtils.getMainCoreStats(replay, playerName)
    );

    const coreStatAvgs = {
      numberOfGames: statsArr.length,
    };
    const stats = [
      "goals",
      "shots",
      "saves",
      "assists",
      "score",
      "shooting_percentage",
    ];

    stats.forEach((stat) => {
      const statSum = statsArr.reduce((sum, obj) => sum + obj[stat], 0);
      coreStatAvgs[stat] = (statSum / statsArr.length).toFixed(2);
    });

    return coreStatAvgs;
  }

  const coreStatAvgs = avgMainCoreStats();

  // don't display if only one car

  if (usedCarArr.length <= 1) {
    // console.log("used carr arr:", usedCarArr);
    return (
      <div>
        <br />
        <br />
        <h2>Car Stats</h2>
        <br />
        <p>Only one car used, nothing to compare against.</p>
        <br />
      </div>
    );
  }

  return (
    <div>
      <br />
      <br />
      <h2>Car Stats</h2>
      <br />
      <button onClick={() => setUsedCar(null)}>All</button>
      {usedCarArr.map((car) => {
        return (
          <button onClick={() => setUsedCar(car)} key={car}>
            {car}
          </button>
        );
      })}
      <br />
      <br />
      <table>
        <caption>Averages ({coreStatAvgs.numberOfGames} game(s)) </caption>
        <tbody>
          <tr>
            <th>Score</th>
            <th>Goals</th>
            <th>Assists</th>
            <th>Shots</th>
            <th>Saves</th>
            <th>Shooting Percentage</th>
          </tr>
          <tr>
            <td>{coreStatAvgs.score}</td>
            <td>{coreStatAvgs.goals}</td>
            <td>{coreStatAvgs.assists}</td>
            <td>{coreStatAvgs.shots}</td>
            <td>{coreStatAvgs.saves}</td>
            <td>{coreStatAvgs.shooting_percentage}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CarStats;
