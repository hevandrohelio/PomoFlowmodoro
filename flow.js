//Pomodoro
let isPomoStarted = false;
let isFlowStarted = false;
{
    let pomo_minute = 25;
    let pomo_second = 0;
    let pomo_format;

    const pomo_time = 1000;

    let pomo_cron;

    function startPomo() {
        isPomoStarted = true;
        pomo_cron = setInterval(() => { pomoTimer(); }, pomo_time);
        document.getElementById('pomo-start').style.display = 'none';
        document.getElementById('pomo-pause').style.display = 'block';
    }
    function pausePomo() {
        isPomoStarted = false;
        clearInterval(pomo_cron);
        document.getElementById('pomo-start').style.display = 'block';
        document.getElementById('pomo-pause').style.display = 'none';
    }

    function resetPomo() {
        isPomoStarted = false;
        clearInterval(pomo_cron);
        document.getElementById('pomo-break-buttons').style.display = 'none';
        document.getElementById('pomo-focus-buttons').style.display = 'block';
        document.getElementById('pomo-pause').style.display = 'none';
        document.getElementById('pomo-start').style.display = 'block';
        pomo_hour = 0;
        pomo_minute = 25;
        pomo_second = 0;
        pomo_format = `${pomo_minute < 10 ? '0' + pomo_minute : pomo_minute}:${pomo_second < 10 ? '0' + pomo_second : pomo_second}`
        document.getElementById('cronos').innerText = pomo_format;
    }

    function pomoTimer() {
        pomo_second--;
        if (document.getElementById('pomo-break-buttons').style.display == 'none') {
            if (pomo_minute <= 0 && pomo_second == 0) {
                clearInterval(pomo_cron);
                window.alert('Hora de fazer uma pausa ￣ω￣');
            }
        }
        if (document.getElementById('pomo-break-buttons').style.display == 'block') {
            if (pomo_minute <= 0 && pomo_second == 0) {
                clearInterval(pomo_cron);
                window.alert('Hora de voltar ao trabalho ~(￣▽￣)~');
            }
        }
        if (pomo_second < 0) {
            pomo_minute--;
            pomo_second = 59;
        }
        pomo_format = `${pomo_minute < 10 ? '0' + pomo_minute : pomo_minute}:${pomo_second < 10 ? '0' + pomo_second : pomo_second}`;
        document.getElementById('cronos').innerText = pomo_format;
    }

    function pomoBreak() {
        document.getElementById('pomo-break-buttons').style.display = 'block';
        document.getElementById('pomo-focus-buttons').style.display = 'none';
        document.getElementById('pomo-pause-break').style.display = 'none';
        document.getElementById('pomo-start-break').style.display = 'block';
        document.getElementById("pomo-reset-long-break").style.display = 'none';
        document.getElementById("pomo-reset-break").style.display = 'block';

        pomo_minute = 5;
        pomo_second = 0;
        document.getElementById('cronos').innerText = `${pomo_minute < 10 ? '0' + pomo_minute : pomo_minute}:${pomo_second < 10 ? '0' + pomo_second : pomo_second}`
        clearInterval(pomo_cron)
    }
    function pomoLongBreak() {
        document.getElementById('pomo-break-buttons').style.display = 'block';
        document.getElementById('pomo-focus-buttons').style.display = 'none';
        document.getElementById('pomo-pause-break').style.display = 'none';
        document.getElementById('pomo-start-break').style.display = 'block';
        document.getElementById("pomo-reset-long-break").style.display = 'block';
        document.getElementById("pomo-reset-break").style.display = 'none';

        pomo_minute = 15;
        pomo_second = 0;
        document.getElementById('cronos').innerText = `${pomo_minute < 10 ? '0' + pomo_minute : pomo_minute}:${pomo_second < 10 ? '0' + pomo_second : pomo_second}`
        clearInterval(pomo_cron)
    }
    function startPomoBreak() {
        pomo_cron = setInterval(() => { pomoTimer(); }, pomo_time);
        document.getElementById('pomo-start-break').style.display = 'none';
        document.getElementById('pomo-pause-break').style.display = 'block';
    }
    function pausePomoBreak() {
        clearInterval(pomo_cron);
        document.getElementById('pomo-start-break').style.display = 'block';
        document.getElementById('pomo-pause-break').style.display = 'none';
    }
    function resetPomoBreak() {
        clearInterval(pomo_cron);
        document.getElementById('pomo-pause-break').style.display = 'none';
        document.getElementById('pomo-start-break').style.display = 'block';

        pomo_hour = 0;
        pomo_minute = 5;
        pomo_second = 0;
        pomo_format = `${pomo_minute < 10 ? '0' + pomo_minute : pomo_minute}:${pomo_second < 10 ? '0' + pomo_second : pomo_second}`
        document.getElementById('cronos').innerText = pomo_format;
    }
    function resetPomoLongBreak() {
        clearInterval(pomo_cron);
        document.getElementById('pomo-pause-break').style.display = 'none';
        document.getElementById('pomo-start-break').style.display = 'block';

        pomo_hour = 0;
        pomo_minute = 15;
        pomo_second = 0;
        pomo_format = `${pomo_minute < 10 ? '0' + pomo_minute : pomo_minute}:${pomo_second < 10 ? '0' + pomo_second : pomo_second}`
        document.getElementById('cronos').innerText = pomo_format;
    }

}


//Flowmodoro
{
    let total_minutes = 0;
    let break_time = 0;
    let hour = 0;
    let minute = 0;
    let second = 0;

    const time = 1000;

    let cron;
    let break_cron;


    function startFlow() {
        isFlowStarted = true;
        cron = setInterval(() => { timer(); }, time);
        document.getElementById('flow-start').style.display = 'none';
        document.getElementById('flow-pause').style.display = 'block';
    }

    function pauseFlow() {
        isFlowStarted = false;
        clearInterval(cron);
        document.getElementById('flow-start').style.display = 'block';
        document.getElementById('flow-pause').style.display = 'none';
    }

    function resetFlow() {
        isFlowStarted = false;
        document.getElementById('flow-start').style.display = 'block';
        document.getElementById('flow-pause').style.display = 'none';
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
            break_time = 0;
            document.getElementById('break-start').style.display = 'block';
            document.getElementById('break-pause').style.display = 'none';
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
}

function changeColor(mode) {
    let body = document.getElementById("body");
    var text = document.querySelectorAll('.text');
    if (mode == 'dark') {
        body.style.backgroundColor = "#1C1C1C";
        for (let item of text) {
            item.style.color = '#ffffff';
        }
        document.getElementById('light-mode_btn').style.display = "block";
        document.getElementById('dark-mode_btn').style.display = "none";
    }
    if (mode == 'light') {
        body.style.backgroundColor = "#ffffff";
        for (let item of text) {
            item.style.color = '#000000';
        }
        document.getElementById('light-mode_btn').style.display = "none";
        document.getElementById('dark-mode_btn').style.display = "block";
    }

}

function changeClock(idb, idn) {
    if (isPomoStarted == true || isFlowStarted == true) {
        if (confirm("Do you want to stop the current timer?")) {
            if (isFlowStarted == true) {
                pauseFlow();
                document.getElementById(idb).style.display = 'block';
                document.getElementById(idn).style.display = 'none';
            }
            else if (isPomoStarted == true) {
                pausePomo()
                document.getElementById(idb).style.display = 'block';
                document.getElementById(idn).style.display = 'none';
            }
        }
    }
    else {
        document.getElementById(idb).style.display = 'block';
        document.getElementById(idn).style.display = 'none';
    }
}