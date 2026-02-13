// pomodoro
let isRunning = false;
// elements
const pomodoroStartBtn = document.getElementById("start_btn");
const pomodoroPauseBtn = document.getElementById("pause_btn");
let timerMode = 'focus';
let pomodoroFocusTime = document.getElementById("focus_time").value;

const timerText = document.getElementById("timer_text");
timerText.innerHTML = `${pomodoroFocusTime}:00`;

let pomodoroBreakTime = document.getElementById("break_time").value;
let pomodoroLongBreakTime = document.getElementById("long_break_time").value;

let timer = minutesToSeconds(pomodoroFocusTime);
let clock = null;

function minutesToSeconds(t) {
    return t * 60
}

function loadSettings() {
    pomodoroFocusTime = document.getElementById("focus_time").value;
    pomodoroBreakTime = document.getElementById("break_time").value;
    pomodoroLongBreakTime = document.getElementById("long_break_time").value;
}

window.addEventListener("settings-updated", () => {
    loadSettings();

    if (!isRunning) {
        changeMode(timerMode);
    }
});


function displayTimer(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    timerText.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
}


// modes
function changeMode(mode) {
    if (mode === 'focus') {
        timerMode = 'focus';
        timer = minutesToSeconds(pomodoroFocusTime);
        displayTimer(timer);
    }
    if (mode === 'break') {
        timerMode = 'break';
        timer = minutesToSeconds(pomodoroBreakTime);
        displayTimer(timer);
    }
    if (mode === 'long_break') {
        timerMode = 'long_break';
        timer = minutesToSeconds(pomodoroLongBreakTime);
        displayTimer(timer);
    }
}

// clock control
function start() {
    if (isRunning) return;
    pomodoroStartBtn.style.display = "none";
    pomodoroPauseBtn.style.display = "inline";
    isRunning = true;
    clock = setInterval(() => {
        if (timer<=1) {
            clearInterval(clock);
            isRunning = false;
            
        }
        timer--;
        displayTimer(timer);
    }, 1000);
}
function pause() {
    pomodoroStartBtn.style.display = "inline";
    pomodoroPauseBtn.style.display = "none";
    if (!isRunning) return;

    clearInterval(clock);
    isRunning = false;
}
function reset() {
    pomodoroStartBtn.style.display = "inline";
    pomodoroPauseBtn.style.display = "none";
    clearInterval(clock);
    isRunning = false;
    changeMode(timerMode);

}
