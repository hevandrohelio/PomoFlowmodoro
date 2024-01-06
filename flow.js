function changeClock(idb, idn) {
    document.getElementById(idb).style.display = 'block';
    document.getElementById(idn).style.display = 'none';
}

let total_minutes = 0;
let break_time = 0;
let hour = 0;
let minute = 0;
let second = 0;

let time = 1000;

let cron;
let break_cron;


function startFlow() {
    cron = setInterval(() => { timer(); }, time);
    document.getElementById('flow-start').style.display = 'none';
    document.getElementById('flow-pause').style.display = 'block';
}

function pauseFlow() {
    clearInterval(cron);
    document.getElementById('flow-start').style.display = 'block';
    document.getElementById('flow-pause').style.display = 'none';
}

function resetFlow() {
    document.getElementById('flow-break-buttons').style.display = 'none';
    document.getElementById('flow-start-buttons').style.display = 'block';

    clearInterval(cron);
    hour = 0;
    minute = 0;
    second = 0;
    total_minutes = 0;

    document.getElementById('cronom').innerText = '0:00:00';
}

function timer() {
    second++;

    if (second == 60) {
        second = 0;
        minute++;
        total_minutes++;
        if (minute == 60) {
            minute = 0;
            hour++;
        }
    }


    let format = `${hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`;
    document.getElementById('cronom').innerText = format;
}

function temp() {
    second--;
    
    if (second < 0) {
        second = 59;
        break_time--;
    }
    if (break_time < 0) {
        clearInterval(break_cron);
        window.alert('Tempo de descanso acabou o(*￣▽￣*)o');
        hour = 0;
        minute = 0;
        second = 0;
        break_time = 0.1;
    }
    let format = `${hour}:${minute < 10 ? '0' + break_time : break_time}:${second < 10 ? '0' + second : second}`;
    document.getElementById('cronom').innerText = format;
}

function startBreak() {
    break_cron = setInterval(() => { temp(); }, time);
    document.getElementById('break-start').style.display = 'none';
    document.getElementById('break-pause').style.display = 'block';

}
function pauseBreak() {
    clearInterval(break_cron);
    document.getElementById('break-start').style.display = 'block';
    document.getElementById('break-pause').style.display = 'none';
}
function resetBreak() {
    breakFlow()
}

function breakFlow() {
    clearInterval(break_cron);
    document.getElementById('flow-break-buttons').style.display = 'block';
    document.getElementById('flow-start-buttons').style.display = 'none';
    clearInterval(cron);
    hour = 0;
    minute = 0;
    second = 0;
    break_time = Math.round((total_minutes * 5) / 25);
    document.getElementById('cronom').innerText = break_time + ' minutos de descanço';
}
