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



let timer = minutesToSeconds(pomodoroFocusTime);
let clock = null;

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
    document.getElementById('interval_alert').innerHTML = `Timers to long break: ${pomodoroLongBreakInterval}`;
    if (isRunning) return;
    pomodoroStartBtn.style.display = "none";
    pomodoroPauseBtn.style.display = "inline";
    isRunning = true;
    clock = setInterval(() => {

        if (timer <= 0) {
            clearInterval(clock);
            isRunning = false;

            if (timerMode ==='focus'){
                pomodoroLongBreakInterval--;
                if (pomodoroLongBreakInterval!==0) {
                    changeMode('break');
                }
                else{
                    changeMode('long_break');
                    loadSettings();
                }
            } else{
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
