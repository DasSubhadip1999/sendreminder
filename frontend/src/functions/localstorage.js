export const setItemToStorage = (key, value) => {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(`${key}`, JSON.stringify(value));
  }
};

export const getItemFromStorage = (key) => {
  if (typeof window !== "undefined") {
    return JSON.parse(window.sessionStorage.getItem(key));
  }
};

export const removeItemFromStorage = (key) => {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(key);
  }
};
