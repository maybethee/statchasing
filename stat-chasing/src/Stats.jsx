import { useReplays } from "./ReplaysContext";
import WinLossStats from "./WinLossStats";
import DateStats from "./DateStats";
import OvertimeStats from "./OvertimeStats";
import DemoStats from "./DemoStats";
import MovementStats from "./MovementStats";
import CarStats from "./CarStats";
import MapStats from "./MapStats";
import pluralize from "pluralize";

function Stats() {
  const { replays, playerName } = useReplays();

  if (replays.length < 1) {
    return (
      <div>
        <h2>{playerName}'s Stats:</h2>
        <br />
        <br />
        <h3>No replays found for the selected playlist</h3>
      </div>
    );
  }

  return (
    <div>
      <h2>{playerName}'s Stats:</h2>
      <br />
      <br />
      <h3>
        (based on {replays.length} fetched {pluralize("replay", replays.length)}
        )
      </h3>
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
