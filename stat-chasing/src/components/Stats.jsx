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
  const sectionRefs = useRef([]);

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, 7);
  }, []);

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

      <div>
        <div ref={sentinelRef} className={styles.sentinel}></div>
        <h3
          id="sticky"
          className={`${styles.gameCount} ${isSticky ? styles.sticky : ""}`}
        >
          (based on {replays.length} fetched{" "}
          {pluralize("replay", replays.length)})
        </h3>

        {/* </div> */}
        <CarStats
          ref={(el) => (sectionRefs.current[0] = el)}
          id="carSection"
          className={styles.component}
        />
        <WinLossStats
          ref={(el) => (sectionRefs.current[0] = el)}
          id="winLossSection"
          className={styles.component}
        />
        <MovementStats
          ref={(el) => (sectionRefs.current[0] = el)}
          id="movementSection"
          className={styles.component}
        />
        <OvertimeStats
          ref={(el) => (sectionRefs.current[0] = el)}
          id="overtimeSection"
          className={styles.component}
        />
        <DemoStats
          ref={(el) => (sectionRefs.current[0] = el)}
          id="demoSection"
          className={styles.component}
        />
        <MapStats
          ref={(el) => (sectionRefs.current[0] = el)}
          id="mapSection"
          className={styles.component}
        />
        <DateStats
          ref={(el) => (sectionRefs.current[0] = el)}
          id="dateSection"
          className={styles.component}
        />
      </div>
    </div>
  );
}

export default Stats;
