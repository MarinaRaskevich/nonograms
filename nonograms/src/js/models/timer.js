let timerInterval;
let elapsedTime = 0;

export function startTimer(savedTime = 0) {
  clearInterval(timerInterval);
  elapsedTime = savedTime;
  timerInterval = setInterval(() => {
    elapsedTime++;
    document.querySelector(".timer").textContent = formatTime(elapsedTime);
  }, 1000);
}

export function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  document.querySelector(".timer").textContent = "00:00";
}

export function stopTimer() {
  clearInterval(timerInterval);
}

export function getElapsedTime() {
  return elapsedTime;
}

export function getTime() {
  return formatTime(elapsedTime);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}
