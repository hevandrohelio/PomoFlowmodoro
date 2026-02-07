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

function displayTimer(time) {
    if (time < 600 && time > 10) {
        (time % 60 == 0) ? timerText.innerHTML = `0${Math.floor(time / 60)}:0${time % 60}` : timerText.innerHTML = `0${Math.floor(time / 60)}:${time % 60}`;
    }
    else if (time < 10) {
        (time % 60 == 0) ? timerText.innerHTML = `0${Math.floor(time / 60)}:0${time % 60}` : timerText.innerHTML = `0${Math.floor(time / 60)}:0${time % 60}`;
    }
    else {
        (time % 60 == 0) ? timerText.innerHTML = `${Math.floor(time / 60)}:0${time % 60}` : timerText.innerHTML = `0${Math.floor(time / 60)}:${time % 60}`;
    }
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
        if (timer === 0) {
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
