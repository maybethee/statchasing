import { useReplays } from "./ReplaysContext";
import styles from "../styles/App.module.css";

const PlaylistFilter = () => {
  const { playlist, setPlaylist } = useReplays();
  return (
    <>
      <div className={styles.filterMessage}>
        <div></div>
        <h4>Filter by playlist:</h4>
      </div>
      <div className={styles.playlistBtnsContainer}>
        <button
          onClick={() => setPlaylist(null)}
          className={playlist === null ? "focused" : ""}
        >
          All
        </button>
        <button
          onClick={() => setPlaylist("ranked-duels")}
          className={playlist === "ranked-duels" ? "focused" : ""}
        >
          1v1
        </button>
        <button
          onClick={() => setPlaylist("ranked-doubles")}
          className={playlist === "ranked-doubles" ? "focused" : ""}
        >
          2v2
        </button>
        <button
          onClick={() => setPlaylist("ranked-standard")}
          className={playlist === "ranked-standard" ? "focused" : ""}
        >
          3v3
        </button>
      </div>
    </>
  );
};

export default PlaylistFilter;
