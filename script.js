"use strict"

function changeClock(idb, idn) {
    document.getElementById(idb).style.display = 'block';
    document.getElementById(idn).style.display = 'none';
}

let total_minutes = 0;

let hour = 0;
let minute = 0;
let second = 0;

let time = 1000;

let cron;


function startFlow() {
    cron = setInterval(() => { timer(); }, time);
}

function pauseFlow() {
    clearInterval(cron);
}

function resetFlow() {
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


    let format = `${hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
    document.getElementById('cronom').innerText = format;
}

function breakFlow(type) {
    clearInterval(cron);
    hour = 0;
    minute = 0;
    second = 0;
    if (type == 'normal') {
        let break_time = (total_minutes * 5) / 25;
        document.getElementById('cronom').innerText = break_time + ' minutos de descanço';
    }
    if (type == 'long') {
        if (total_minutes < 100) {
            let break_time = (total_minutes * 5) / 25;
            document.getElementById('cronom').innerText = break_time + ' minutos de descanço';
        }else{
            let break_time = (total_minutes * 15)/100;
            document.getElementById('cronom').innerText = break_time + ' minutos de descanço';
        }
    }
}
