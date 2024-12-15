

export const persistStore = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);

  if (storedValue === null) {
    return defaultValue;
  }

  try {
    return JSON.parse(storedValue);
  } catch (error) {
    console.error("Error parsing stored value", error);
    return defaultValue; 
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};
