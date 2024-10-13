import { useState, useEffect, useRef } from "react";
import { useReplays } from "./ReplaysContext";
import { wrappedUtils } from "../utils";
import Stats from "./Stats";
import AdminLoginBtn from "./AdminLoginBtn";
import styles from "../styles/App.module.css";
import Sidebar from "./Sidebar";
import { openDB } from "idb";

function App() {
  const {
    setPrefilteredReplays,
    playlist,
    setPlaylist,
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

  const initDB = async () => {
    return openDB("ReplayDB", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("replays")) {
          db.createObjectStore("replays", { keyPath: "playerId" });
        }
      },
    });
  };

  const saveReplaysToIndexedDB = async (playerId, replays, name) => {
    const db = await initDB();
    await db.put("replays", { playerId, replays, name });
  };

  const getReplaysFromIndexedDB = async (playerId) => {
    const db = await initDB();
    return (await db.get("replays", playerId)) || "";
  };

  useEffect(() => {
    const fetchCachedPlayer = async () => {
      const cachedPlayerId = localStorage.getItem("cachedPlayerId");

      console.log("fetch cached player, playerID:", cachedPlayerId);

      if (cachedPlayerId) {
        try {
          const db = await initDB();
          const cachedPlayer = await db.get("replays", cachedPlayerId);
          console.log(
            "cached player ID exists, this is the cached player:",
            cachedPlayer
          );
          if (cachedPlayer && cachedPlayer.replays) {
            console.log(
              "cached player has replays, here they are:",
              cachedPlayer.replays
            );
            setPrefilteredReplays(cachedPlayer.replays);
            setPlayerId(cachedPlayerId);
            setLastPlayerId(cachedPlayerId);
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
  }, [setPrefilteredReplays, setPlayerName, setPlayerId]);

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
      const response = await fetch("http://localhost:3000/api/v1/check_admin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

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

  const fetchReplays = async (
    playerId,
    afterDate = null,
    sync = false,
    fetchNewReplays = false
  ) => {
    if (!sync && !fetchNewReplays) {
      const cachedPlayerId =
        playerId || localStorage.getItem("cachedPlayerId") || "";
      // console.log(`looking for data from playerID: ${cachedPlayerId}`);

      const cachedReplays = await getReplaysFromIndexedDB(cachedPlayerId);

      if (cachedReplays) {
        // console.log(`found cached replays for playerId: ${playerId}`);
        // console.log("here are the replays:", cachedReplays.replays);
        setPrefilteredReplays(cachedReplays.replays);
        setPlayerName(cachedReplays.name);
        localStorage.setItem("cachedPlayerId", playerId);
        setLastPlayerId(playerId);
        setLoading(false);
        return;
      }
    }

    try {
      const startTime = new Date().getTime();

      const requestBody = { player_id: playerId };
      if (afterDate) {
        requestBody.after_date = afterDate;
      }
      if (sync) {
        requestBody.sync = true;
      }

      const response = await fetch(
        `http://localhost:3000/${
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

      const uniqueReplays = data.filter((replay) => {
        if (matchGuids.has(replay["replay_stats"][0]["stats"]["match_guid"])) {
          return false;
        } else {
          matchGuids.add(replay["replay_stats"][0]["stats"]["match_guid"]);
          return true;
        }
      });

      // refactor this?
      if (uniqueReplays.length > 0) {
        setPrefilteredReplays((prevReplays) => {
          matchGuids.clear();

          // console.log("match guids set:", matchGuids);
          // console.log("prev replays:", prevReplays);
          console.log("unique replays:", uniqueReplays);

          const combinedReplays = [...prevReplays, ...uniqueReplays].filter(
            (replay) => {
              // console.log("Checking replay:", replay);
              // console.log(
              //   "match guid:",
              //   replay["replay_stats"][0]["stats"]["match_guid"]
              // );
              if (
                matchGuids.has(replay["replay_stats"][0]["stats"]["match_guid"])
              ) {
                return false;
              } else {
                matchGuids.add(
                  replay["replay_stats"][0]["stats"]["match_guid"]
                );
                return true;
              }
            }
          );
          const sortedReplaysArr = combinedReplays.sort(
            (a, b) => new Date(a["data"]["date"] - new Date(b["data"]["date"]))
          );

          // console.log(
          //   "replays, sorted:",
          //   sortedReplaysArr.forEach((replay) => {
          //     console.log(replay);
          //   })
          // );
          return sortedReplaysArr;
        });

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
    setInputError(null);

    if (unprocessedPlayerId !== lastPlayerId) {
      setPrefilteredReplays([]);
      setLastPlayerId(unprocessedPlayerId);
      localStorage.removeItem("cachedPlayerId");
    }

    const urlPattern =
      /^https:\/\/ballchasing\.com\/player\/([^/]+\/[a-zA-Z0-9_]+)$/;
    const match = unprocessedPlayerId.match(urlPattern);

    if (!match) {
      setInputError(
        "Invalid URL format. The URL should look like the one displayed above"
      );
      setLoading(false);
      return;
    }

    const trimmedPlayerId = match[1].replace("/", ":");
    setPlayerId(trimmedPlayerId);

    const afterDate = isAdmin
      ? customDate.toISOString().split(".")[0] + "Z"
      : null;

    if (sync) {
      fetchReplays(trimmedPlayerId, null, true);
    } else if (fetchNewReplays) {
      fetchReplays(trimmedPlayerId, afterDate, false, true);
    } else {
      fetchReplays(trimmedPlayerId, afterDate);
    }
  };

  useEffect(() => {
    if (initialFetch.current) {
      initialFetch.current = false;
      fetchReplays(playerId);
    }
  }, []);

  if (loading) return <div className="loading">LOADING...</div>;
  if (error)
    return (
      <p className="error">
        A network error was encountered. Check your internet connection and try
        again.
      </p>
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
              Find some interesting stats based on players' ballchasing.com
              profiles. Currently, this only fetches replays from the last 30
              days.
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
            {/* remove copy URL button for production */}
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  "https://ballchasing.com/player/steam/76561198136291441"
                )
              }
            >
              Copy BijouBug's URL
            </button>

            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  "https://ballchasing.com/player/steam/76561198835242233"
                )
              }
            >
              Copy Tofu's URL
            </button>

            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  "https://ballchasing.com/player/epic/b843b77c31e74c6fa970db08f5796805"
                )
              }
            >
              Copy Andre's URL
            </button>

            <form className={styles.playerSearchForm} onSubmit={handleSubmit}>
              <p>
                Start by copying a player's entire ballchasing profile URL, the
                one shown in the image below:
                {/* replace link with example image */}
                {/* (https://ballchasing.com/player/steam/76561198136291441) */}
              </p>
              <img
                src="../../assets/player-profile-url.png"
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
              <div>
                <label htmlFor="playerURL">
                  Paste player's profile URL here:
                  <input
                    className={styles.playerProfileInput}
                    type="text"
                    id="playerURL"
                    value={unprocessedPlayerId}
                    onChange={(e) => setUnprocessedPlayerId(e.target.value)}
                    placeholder="Enter player's ballchasing URL"
                  />
                </label>
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
            {inputError && <p className="error">{inputError}</p>}
          </section>
        </div>
        <div className={styles.statsSection}>
          <div className={styles.leftCol}>
            <section>
              {/* would like to display a message when a player wasn't found vs when player just has no replays available */}
              {playerName && (
                <div className={styles.playerStatsContainer}>
                  <div ref={sentinelRef} className={styles.sentinel}></div>
                  <div
                    id="sticky"
                    className={`${styles.playlistFilterSection} ${
                      isSticky ? styles.sticky : ""
                    }`}
                  >
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
                        className={
                          playlist === "ranked-doubles" ? "focused" : ""
                        }
                      >
                        2v2
                      </button>
                      <button
                        onClick={() => setPlaylist("ranked-standard")}
                        className={
                          playlist === "ranked-standard" ? "focused" : ""
                        }
                      >
                        3v3
                      </button>
                    </div>
                  </div>

                  <Stats />
                </div>
              )}
            </section>
          </div>

          {playerName && (
            <div className={styles.rightCol}>
              {/* <div className={styles.rightColSpacer}></div> */}
              <Sidebar />
            </div>
          )}
        </div>
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
