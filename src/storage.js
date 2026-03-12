// Storage adapter — works in both Claude artifacts (window.storage) and standalone (localStorage)
const storage = {
  async get(key) {
    if (window.storage?.get) {
      return window.storage.get(key);
    }
    const val = localStorage.getItem(key);
    return val ? { key, value: val } : null;
  },
  async set(key, value) {
    if (window.storage?.set) {
      return window.storage.set(key, value);
    }
    localStorage.setItem(key, value);
    return { key, value };
  },
  async delete(key) {
    if (window.storage?.delete) {
      return window.storage.delete(key);
    }
    localStorage.removeItem(key);
    return { key, deleted: true };
  },
};

export default storage;
