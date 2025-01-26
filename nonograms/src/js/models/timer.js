let timerInterval;
let elapsedTime = 0;

export function startTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  timerInterval = setInterval(() => {
    elapsedTime++;
    document.querySelector(".timer").textContent = formatTime(elapsedTime);
  }, 1000);
}

export function resetTimer() {
  clearInterval(timerInterval);
  document.querySelector(".timer").textContent = "00:00";
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}
