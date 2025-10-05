const timeDisplay = document.getElementById("time");
const dateDisplay = document.getElementById("date");
const alarmStatus = document.getElementById("alarmStatus");
const alarmSound = document.getElementById("alarmSound");

let alarmTime = null;
let alarmTimeout = null;

// 🕒 Update clock every second
setInterval(() => {
  const now = new Date();
  const hours = now.getHours();
  const mins = now.getMinutes();
  const secs = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  timeDisplay.textContent = `${pad(displayHours)}:${pad(mins)}:${pad(secs)} ${ampm}`;
  dateDisplay.textContent = now.toDateString();

  if (alarmTime === `${pad(displayHours)}:${pad(mins)}:${pad(secs)} ${ampm}`) {
    alarmSound.play();
    alarmSound.loop = true;
  }
}, 1000);

// 🔢 Fill dropdowns
function populateDropdowns() {
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  for (let i = 1; i <= 12; i++) hours.innerHTML += `<option>${pad(i)}</option>`;
  for (let i = 0; i < 60; i++) {
    minutes.innerHTML += `<option>${pad(i)}</option>`;
    seconds.innerHTML += `<option>${pad(i)}</option>`;
  }
}
populateDropdowns();

// Helper function
function pad(num) {
  return num < 10 ? "0" + num : num;
}

// 🎯 Set Alarm
document.getElementById("setAlarm").addEventListener("click", () => {
  const h = document.getElementById("hours").value;
  const m = document.getElementById("minutes").value;
  const s = document.getElementById("seconds").value;
  const ampm = document.getElementById("ampm").value;

  alarmTime = `${h}:${m}:${s} ${ampm}`;
  alarmStatus.textContent = `Alarm set for ${alarmTime}`;
});

// ❌ Clear Alarm
document.getElementById("clearAlarm").addEventListener("click", () => {
  alarmTime = null;
  alarmSound.pause();
  alarmSound.currentTime = 0;
  alarmStatus.textContent = "No alarm set.";
});
