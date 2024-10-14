import { openDB } from "idb";

export const initDB = async () => {
  return openDB("ReplayDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("replays")) {
        db.createObjectStore("replays", { keyPath: "playerId" });
      }
    },
  });
};

export const saveReplaysToIndexedDB = async (playerId, replays, name) => {
  const db = await initDB();
  await db.put("replays", { playerId, replays, name });
};

export const getReplaysFromIndexedDB = async (playerId) => {
  const db = await initDB();
  return (await db.get("replays", playerId)) || "";
};
