import { useReplays } from "./ReplaysContext";
import { useState, useEffect, useRef } from "react";
import WinLossStats from "./WinLossStats";
import DateStats from "./DateStats";
import OvertimeStats from "./OvertimeStats";
import DemoStats from "./DemoStats";
import MovementStats from "./MovementStats";
import CarStats from "./CarStats";
import MapStats from "./MapStats";
import pluralize from "pluralize";

import styles from "../styles/Stats.module.css";
// import Sidebar from "./Sidebar";

function Stats() {
  const { replays, playerName } = useReplays();
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sentinelRef.current) {
        const offset = sentinelRef.current.getBoundingClientRect().top;
        if (offset <= -50) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (replays.length < 1) {
    return (
      <div className={styles.statsContainerHeader}>
        <div>
          <h2>{playerName}'s Stats:</h2>
          <h3>No replays found for the selected playlist</h3>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.statsContainerHeader}>
        <h2>{playerName}'s Stats:</h2>
      </div>

      {/* <div> */}
      <div ref={sentinelRef} className={styles.sentinel}></div>
      <h3
        id="sticky"
        className={`${styles.gameCount} ${isSticky ? styles.sticky : ""}`}
      >
        (based on {replays.length} fetched {pluralize("replay", replays.length)}
        )
      </h3>

      {/* </div> */}
      <div className={styles.statsContainer}>
        <CarStats id="carSection" className={styles.component} />
        <WinLossStats id="winLossSection" className={styles.component} />
        <MovementStats id="movementSection" className={styles.component} />
        <OvertimeStats id="overtimeSection" className={styles.component} />
        <DemoStats id="demoSection" className={styles.component} />
        <MapStats id="mapSection" className={styles.component} />
        <DateStats id="dateSection" className={styles.component} />
      </div>
    </div>
  );
}

export default Stats;
