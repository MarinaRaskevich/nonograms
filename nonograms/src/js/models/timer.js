let timerInterval;
let elapsedTime = 0;

export const startTimer = (savedTime = 0) => {
  clearInterval(timerInterval);
  elapsedTime = savedTime;
  timerInterval = setInterval(() => {
    elapsedTime++;
    document.querySelector(".timer").textContent = formatTime(elapsedTime);
  }, 1000);
};

export const resetTimer = () => {
  clearInterval(timerInterval);
  elapsedTime = 0;
  document.querySelector(".timer").textContent = "00:00";
};

export const stopTimer = () => {
  clearInterval(timerInterval);
};

export const getElapsedTime = () => {
  return elapsedTime;
};

export const getTime = () => {
  return formatTime(elapsedTime);
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};
