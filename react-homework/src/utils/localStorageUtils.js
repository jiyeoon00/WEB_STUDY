const saveStateToLocalStorage = (key, state) => {
  localStorage.setItem(key, JSON.stringify(state));
};

const getStateFromLocalStorage = (key) => {
  const savedState = localStorage.getItem(key);
  return savedState ? JSON.parse(savedState) : {};
};

export { saveStateToLocalStorage, getStateFromLocalStorage };
