import { createContext, useContext, useState, useEffect } from "react";
import { wrappedUtils } from "./utils";

const ReplaysContext = createContext();

const useReplays = () => useContext(ReplaysContext);

const ReplaysProvider = ({ children }) => {
  const [replays, setReplays] = useState([]);
  const [playlist, setPlaylist] = useState(null);
  const [prefilteredReplays, setPrefilteredReplays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerName, setPlayerName] = useState(null);

  useEffect(() => {
    let replaysArr = prefilteredReplays;

    if (playlist) {
      replaysArr = prefilteredReplays.filter((replay) => {
        const inPlaylist = wrappedUtils.inPlaylist(replay, playlist);
        return inPlaylist;
      });
    }

    setReplays(replaysArr);
  }, [prefilteredReplays, playlist]);

  return (
    <ReplaysContext.Provider
      value={{
        prefilteredReplays,
        setPrefilteredReplays,
        replays,
        // setReplays,
        playlist,
        setPlaylist,
        loading,
        setLoading,
        error,
        setError,
        playerName,
        setPlayerName,
      }}
    >
      {children}
    </ReplaysContext.Provider>
  );
};

export { useReplays, ReplaysProvider };
