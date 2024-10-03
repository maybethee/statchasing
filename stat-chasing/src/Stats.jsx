import { useReplays } from "./ReplaysContext";
import WinLossStats from "./WinLossStats";
import DateStats from "./DateStats";
import OvertimeStats from "./OvertimeStats";
import DemoStats from "./DemoStats";
import MovementStats from "./MovementStats";
import CarStats from "./CarStats";
import MapStats from "./MapStats";
function Stats() {
  const { replays, playerName } = useReplays();

  if (replays.length < 1) {
    return (
      <div>
        <h1>{playerName}'s Stats:</h1>
        <br />
        <br />
        <h2>No replays found for the selected playlist</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>{playerName}'s Stats:</h1>
      <br />
      <br />
      <h2>(based on {replays.length} fetched replays)</h2>
      <div style={{ fontSize: "1.1rem" }}>
        <br />
        <MapStats />
        <CarStats />
        <WinLossStats />
        <DateStats />
        <OvertimeStats />
        <DemoStats />
        <MovementStats />
      </div>
    </div>
  );
}

export default Stats;
