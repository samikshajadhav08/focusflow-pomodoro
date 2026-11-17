
export function getData(key, fallback) {
  try {
    const storedData = localStorage.getItem(key);

    return storedData
      ? JSON.parse(storedData)
      : fallback;

  } catch (error) {
    console.error("Error reading storage:", error);
    return fallback;
  }
}

export function saveData(key, value) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  } catch (error) {
    console.error("Error saving storage:", error);
  }
}
