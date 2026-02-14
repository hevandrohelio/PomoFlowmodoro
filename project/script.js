// pomodoro
let isRunning = false;
// elements
const pomodoroStartBtn = document.getElementById("start_btn");
const pomodoroPauseBtn = document.getElementById("pause_btn");
let timerMode = 'focus';
let pomodoroFocusTime = document.getElementById("focus_time").value;

const timerText = document.getElementById("timer_text");
let pomodoroLongBreakInterval = document.getElementById("long_break_interval").value;

document.getElementById('interval_alert').innerHTML = `Timers to long break: ${pomodoroLongBreakInterval}`;


let pomodoroBreakTime = document.getElementById("break_time").value;
let pomodoroLongBreakTime = document.getElementById("long_break_time").value;

const alarmSound = new Audio("song/alarm.mp3")

let timer = minutesToSeconds(pomodoroFocusTime);
let clock = null;

changeMode('focus');

displayTimer(timer)

function minutesToSeconds(t) {
    return t * 60
}

function loadSettings() {
    pomodoroFocusTime = Number(document.getElementById("focus_time").value);
    pomodoroBreakTime = Number(document.getElementById("break_time").value);
    pomodoroLongBreakTime = Number(document.getElementById("long_break_time").value);
    pomodoroLongBreakInterval = Number(document.getElementById("long_break_interval").value);
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
    clearInterval(clock);
    pomodoroStartBtn.style.display = "inline";
    pomodoroPauseBtn.style.display = "none";
    if (mode === 'focus') {
        document.getElementById('focus_btn').style = 'box-shadow: inset 0 -8px 6px -6px white;';
        document.getElementById('break_btn').style = 'box-shadow: none;';
        document.getElementById('long_break_btn').style = 'box-shadow: none;';
        timerMode = 'focus';
        timer = minutesToSeconds(pomodoroFocusTime);
        displayTimer(timer);
    }
    if (mode === 'break') {
        document.getElementById('break_btn').style = 'box-shadow: inset 0 -8px 6px -6px white;';
        document.getElementById('focus_btn').style = 'box-shadow: none;';
        document.getElementById('long_break_btn').style = 'box-shadow: none;';
        timerMode = 'focus';
        timerMode = 'break';
        timer = minutesToSeconds(pomodoroBreakTime);
        displayTimer(timer);
    }
    if (mode === 'long_break') {
        document.getElementById('long_break_btn').style = 'box-shadow: inset 0 -8px 6px -6px white;';
        document.getElementById('focus_btn').style = 'box-shadow: none;';
        document.getElementById('break_btn').style = 'box-shadow: none;';
        timerMode = 'long_break';
        timer = minutesToSeconds(pomodoroLongBreakTime);
        displayTimer(timer);
    }
}

// clock control
function start() {
    document.getElementById('interval_alert').innerHTML = `Timers to long break: ${pomodoroLongBreakInterval}`;
    if (isRunning) return;
    pomodoroStartBtn.style.display = "none";
    pomodoroPauseBtn.style.display = "inline";
    isRunning = true;
    clock = setInterval(() => {
        if (timer <= 0) {
            alarmSound.currentTime = 0;
            alarmSound.play();
            clearInterval(clock);
            isRunning = false;

            if (timerMode === 'focus') {
                pomodoroLongBreakInterval--;
                if (pomodoroLongBreakInterval !== 0) {
                    changeMode('break');
                }
                else {
                    changeMode('long_break');
                    loadSettings();
                }
            } else {
                changeMode('focus');
            }


            return;
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
