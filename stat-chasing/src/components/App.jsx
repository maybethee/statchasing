import { useState, useEffect, useRef } from "react";
import { useReplays } from "./ReplaysContext";
import { wrappedUtils } from "../utils/utils";
import AdminLoginBtn from "./admin/AdminLoginBtn";
import AdminAuxBtns from "./admin/AdminAuxBtns";
import PlaylistFilter from "./PlaylistFilter";
import Sidebar from "./Sidebar";
import Stats from "./stats/Stats";
import {
  saveReplaysToIndexedDB,
  getReplaysFromIndexedDB,
} from "../helpers/dbHelpers";
import styles from "../styles/App.module.css";

function App() {
  const {
    setPrefilteredReplays,
    loading,
    setLoading,
    error,
    setError,
    playerName,
    setPlayerName,
    playerId,
    setPlayerId,
    unprocessedPlayerId,
    setUnprocessedPlayerId,
  } = useReplays();

  const [inputError, setInputError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [customDate, setCustomDate] = useState(new Date());
  const [lastPlayerId, setLastPlayerId] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef(null);
  const [fetchNewReplays, setFetchNewReplays] = useState(false);

  useEffect(() => {
    const fetchCachedPlayer = async () => {
      const cachedPlayerId = localStorage.getItem("cachedPlayerId");
      console.log("fetch cached player, playerID:", cachedPlayerId);

      if (cachedPlayerId) {
        try {
          const cachedPlayer = await getReplaysFromIndexedDB(cachedPlayerId);
          console.log(
            "cached player ID exists, this is the cached player:",
            cachedPlayer
          );
          if (cachedPlayer?.replays) {
            console.log(
              "cached player has replays, here they are:",
              cachedPlayer.replays
            );
            renderCachedReplays(cachedPlayerId, cachedPlayer);
            setPlayerId(cachedPlayerId);
          }
        } catch (error) {
          console.error(
            "Error fetching cached player data from IndexedDB:",
            error
          );
        }
      }
    };
    fetchCachedPlayer();
  }, [setPrefilteredReplays]);

  useEffect(() => {
    const handleScroll = () => {
      if (sentinelRef.current) {
        const offset = sentinelRef.current.getBoundingClientRect().top;
        if (offset <= 10) {
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

  const matchGuids = new Set();
  const initialFetch = useRef(true);

  const checkAdminStatus = async () => {
    try {
      const response = await fetch(
        "https://statchasing.fly.dev/api/v1/check_admin",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setIsAdmin(data.is_admin);
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const renderCachedReplays = (cachedPlayerId, cachedReplays) => {
    console.log(`found cached replays for playerId: ${cachedPlayerId}`);
    console.log("here are the replays:", cachedReplays.replays);
    setPrefilteredReplays(cachedReplays.replays);
    setPlayerName(cachedReplays.name);
    localStorage.setItem("cachedPlayerId", cachedPlayerId);
    setLastPlayerId(cachedPlayerId);
    // console.log("playerId value:", playerId);
    setLoading(false);
  };

  const getUniqueReplays = (data) => {
    return data.filter((replay) => {
      const matchGuid = replay["replay_stats"][0]["stats"]["match_guid"];
      if (matchGuids.has(matchGuid)) return false;

      matchGuids.add(matchGuid);
      return true;
    });
  };

  const fetchReplays = async (
    playerId,
    afterDate = null,
    sync = false,
    fetchNewReplays
  ) => {
    console.log("playerId at start of fetchReplays:", playerId);
    console.log("fetchnewreplays:", fetchNewReplays);
    if (!sync && !fetchNewReplays) {
      const cachedPlayerId = localStorage.getItem("cachedPlayerId") || "";
      console.log(`looking for data from playerID: ${cachedPlayerId}`);
      const cachedReplays = await getReplaysFromIndexedDB(cachedPlayerId);
      if (cachedReplays)
        return renderCachedReplays(cachedPlayerId, cachedReplays);
    }

    try {
      const startTime = new Date().getTime();
      console.log("playerID value right before fetch:", playerId);
      const response = await fetch(
        `https://statchasing.fly.dev/${
          isAdmin ? "fetch_replays_admin" : "fetch_replays"
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            player_id: playerId,
            after_date: afterDate,
            sync: sync,
          }),
        }
      );

      if (response.status >= 400) {
        throw new Error("server error");
      }

      const data = await response.json();
      console.log("fetched replays:", data);
      const uniqueReplays = getUniqueReplays(data);

      if (uniqueReplays.length) {
        const sortedReplays = [...uniqueReplays].sort(
          (a, b) => new Date(a.data.date) - new Date(b.data.date)
        );
        setPrefilteredReplays(sortedReplays);

        const fetchedPlayerName = wrappedUtils.getPlayerNameById(
          uniqueReplays[0],
          playerId
        );

        setPlayerName(fetchedPlayerName);

        await saveReplaysToIndexedDB(
          playerId,
          uniqueReplays,
          fetchedPlayerName
        );

        localStorage.setItem("cachedPlayerId", playerId);

        if (playerId !== lastPlayerId) {
          setPrefilteredReplays([...uniqueReplays]);
          setLastPlayerId(playerId);
        }
      } else {
        console.log("No replays found for this player.");
      }

      const endTime = new Date().getTime();
      const apiResponseTime = endTime - startTime;
      console.log("result:", apiResponseTime, "ms");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e, sync = false) => {
    e.preventDefault();

    setLoading(true);
    if (!unprocessedPlayerId)
      return setInputError("Please enter a valid player URL");
    setInputError(null);

    const trimmedPlayerId = unprocessedPlayerId
      .match(
        /^https:\/\/ballchasing\.com\/player\/([^/]+\/[a-zA-Z0-9_]+)$/
      )?.[1]
      .replace("/", ":");

    if (!trimmedPlayerId)
      return setInputError(
        "Invalid URL format. The URL should look like the one displayed above"
      );

    if (unprocessedPlayerId !== lastPlayerId) {
      // localStorage.removeItem("cachedPlayerId");
      setLastPlayerId(unprocessedPlayerId);
      // setPrefilteredReplays([]);
    }

    setPlayerId(trimmedPlayerId);
    localStorage.setItem("cachedPlayerId", trimmedPlayerId);

    fetchReplays(
      trimmedPlayerId,
      isAdmin ? customDate.toISOString().split(".")[0] + "Z" : null,
      sync,
      fetchNewReplays
    );
  };

  useEffect(() => {
    if (initialFetch.current) {
      initialFetch.current = false;
      fetchReplays(playerId);
    }
  }, []);

  if (error)
    return (
      <div className="error-container">
        <div className="error">
          <p>
            An error was encountered. Check your internet connection and try
            again.
          </p>
          <p>
            If the error persists, it is likely a bug. I would appreciate if you
            reported it as an issue on{" "}
            <a href="https://github.com/maybethee/stat-chasing-rails/issues">
              Github
            </a>{" "}
            with info about what happened right before seeing the error and I'll
            do my best to fix it 🫡.
          </p>
        </div>
      </div>
    );

  return (
    <div className={styles.mainPageContent}>
      <div className={styles.topRow}>
        <div className={styles.headerSection}>
          <header className={styles.mainHeader}>
            <h1>Statchasing</h1>
            {/* remove admin login button for production */}
            <AdminLoginBtn />
          </header>
          <section className={styles.welcomeSection}>
            <h2>Welcome</h2>
            <p>
              Find some interesting stats based on players'{" "}
              <a href="https://ballchasing.com/">ballchasing.com</a> profiles.
              Currently, this only fetches replays from the last 30 days.
            </p>
            <p>
              Note: due to the API rate limitations set by ballchasing, this
              process can be *very* slow, especially if the searched for player
              has many replays associated with them from the last 30 days.
            </p>
            <p>
              Consider supporting ballchasing.com by becoming a{" "}
              <a href="https://www.patreon.com/ballchasing">Patreon patron</a>.
            </p>
            <hr />
          </section>

          <section className={styles.playerSearchSection}>
            {isAdmin && <AdminAuxBtns className={styles.adminAuxBtns} />}

            <form className={styles.playerSearchForm} onSubmit={handleSubmit}>
              <p>
                Start by copying a player's entire ballchasing profile URL, the
                one shown in the image below:
              </p>
              <img
                src="/player-profile-url.png"
                alt="Paste the URL copied from the address bar on a player's profile on ballchasing.com. The URL should follow this pattern: https://ballchasing.com/player/platform/id, where 'platform' can be 'steam', 'epic', 'psn', 'xbox', or 'switch', and 'id' will be a numeric or alphanumeric string, or otherwise may be the player's in-game name, depending on the platform."
              />
              {isAdmin && (
                <div className={styles.adminFormSection}>
                  <div>
                    <label>
                      Fetch new replays (if unchecked, chached data will be
                      used):
                      <input
                        type="checkbox"
                        checked={fetchNewReplays}
                        onChange={(e) => setFetchNewReplays(e.target.checked)}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Select date to fetch older replays (admins only):
                    </label>
                    <input
                      type="date"
                      value={
                        customDate ? customDate.toISOString().split("T")[0] : ""
                      }
                      onChange={(e) => setCustomDate(new Date(e.target.value))}
                    />
                  </div>
                </div>
              )}
              <div className={styles.playerInputFormSection}>
                <label htmlFor="playerURL">
                  Paste player's profile URL here:
                  <input
                    className={
                      inputError
                        ? `${styles.playerProfileInput} bad-input`
                        : `${styles.playerProfileInput}`
                    }
                    type="text"
                    id="playerURL"
                    value={unprocessedPlayerId}
                    onChange={(e) => setUnprocessedPlayerId(e.target.value)}
                    placeholder="Enter player's ballchasing URL"
                  />
                </label>
                {inputError && <p className="input-error">{inputError}</p>}
              </div>
              <div className={styles.formBtnsContainer}>
                <button type="submit">Get Replays</button>
                {isAdmin && (
                  <button onClick={(e) => handleSubmit(e, true)}>
                    Sync Replays
                  </button>
                )}
              </div>
            </form>
          </section>
        </div>
        {loading ? (
          <div className="loading"></div>
        ) : inputError ? null : (
          <div>
            {playerName && (
              <div className={styles.statsSection}>
                <div className={styles.leftCol}>
                  <section>
                    {/* would like to display a message when a player wasn't found vs when player just has no replays available */}
                    <div className={styles.playerStatsContainer}>
                      <div ref={sentinelRef} className={styles.sentinel}></div>
                      <div
                        id="sticky"
                        className={`${styles.playlistFilterSection} ${
                          isSticky ? styles.sticky : ""
                        }`}
                      >
                        <PlaylistFilter />
                      </div>
                      <Stats />
                    </div>
                  </section>
                </div>

                {playerName && (
                  <div className={styles.rightCol}>
                    <Sidebar />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <footer>
        <p>
          Source code available on{" "}
          <a href="https://github.com/maybethee/stat-chasing-rails">Github</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
