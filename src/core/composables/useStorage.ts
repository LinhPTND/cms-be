import { customRef } from "vue";

type StorageType = "session" | "local";

const getItem = (key: string, storage: Storage) => {
  const value = storage.getItem(key);
  if (!value) {
    return null;
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

export default function useStorage(key: string, type: StorageType = "session") {
  let storage: Storage;
  switch (type) {
    case "local":
      storage = localStorage;
      break;
    case "session":
      storage = sessionStorage;
      break;
  }

  if (!type) {
    throw new Error("type must be 'session' or 'local'");
  }

  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return getItem(key, storage);
      },
      set(newVal) {
        storage.setItem(key, JSON.stringify(newVal));
        trigger();
      },
    };
  });
}
