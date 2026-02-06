// pomodoro

// define pomodoro focus time
let isPomoStarted = false;

const focus_time = document.getElementById("focus_time").value; // focus time on setting

const timer_text = document.getElementById("timer_text");
timer_text.innerHTML  = `${focus_time}:00`;

let mode = "focus"; // focus | break | long_break
let focus_sessions = document.getElementById("long_break_interval").value;
let remainingSeconds = 0;


function minutesToSeconds(minutes) {
  return minutes * 60;
}

function formatTime(seconds) {
    const min = String(Math.floor(seconds/60)).padStart(2, "0");
    const sec = String(seconds%60).padStart(2,"0");
    return `${min}:${sec}`
}

function updateDisplay() {
    timer_text.innerHTML = formatTime(remainingSeconds);
}



// start pomodoro

function startFocus() {
    isPomoStarted = true;

}


// pause pomodoro

// reset pomodoro