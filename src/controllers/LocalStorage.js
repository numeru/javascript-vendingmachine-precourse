class LocalStorage {
  getStorageItem = (key) => {
    const item = window.localStorage.getItem(key);
    return JSON.parse(item);
  };

  setStorageItem = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  removeStorageItem = (key) => {
    window.localStorage.removeItem(key);
  };
}

export default LocalStorage;
