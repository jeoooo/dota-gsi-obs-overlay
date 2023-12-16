var socket = io();
socket.on('newdata', function (newdata) {
    document.getElementById('data').innerText = JSON.stringify(newdata);
});
// draft:activeteam
// draft:activeteam_time_remaining
// draft:dire_bonus_time
// draft:pick
// draft:radiant_bonus_time
// draft:team#:home_team
// draft:team#:ban#_class (0-5)
// draft:team#:ban#_id (0-5)
// draft:team#:pick#_class (0-4)
// draft:team#:pick#_id (0-4)

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    // Use padStart to ensure that both minutes and seconds are at least two digits
    const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`;

    return formattedTime;
}

// io.emit('activeteam', activeteam);
// io.emit('pick', pick);
// io.emit('activeteam_time_remaining', activeteam_time_remaining);
// io.emit('radiant_bonus_time', radiant_bonus_time);
// io.emit('dire_bonus_time', dire_bonus_time);
socket.on('activeteam', function (newdata) {
    if (newdata == 2) console.log('radiant'); else console.log('dire');
    document.getElementById('activeteam').innerText = JSON.stringify(newdata);
});
socket.on('activeteam_time_remaining', function (newdata) {
    console.log(formatTime(JSON.stringify(newdata)));
    document.getElementById('activeteam_time_remaining').innerText = formatTime(JSON.stringify(newdata));
});
socket.on('radiant_bonus_time', function (newdata) {
    console.log(formatTime(JSON.stringify(newdata)));
    document.getElementById('radiant_bonus_time').innerText = formatTime(JSON.stringify(newdata));
});
socket.on('dire_bonus_time', function (newdata) {
    console.log(formatTime(JSON.stringify(newdata)));
    document.getElementById('dire_bonus_time').innerText = formatTime(JSON.stringify(newdata));
});





for (let i = 0; i <= 4; i++) {
    let key = `pick${i}_class`;
    socket.on(`radiant_pick:${key}`, function (data) {
        document.getElementById(`radiant_pick:${key}`).innerText = JSON.stringify(data);
    });
}

for (let i = 0; i <= 6; i++) {
    let key = `ban${i}_class`;
    socket.on(`radiant_ban:${key}`, function (data) {
        document.getElementById(`radiant_ban:${key}`).innerText = JSON.stringify(data);
    });
}

for (let i = 0; i <= 4; i++) {
    let key = `pick${i}_class`;
    socket.on(`dire_pick:${key}`, function (data) {
        document.getElementById(`dire_pick:${key}`).innerText = JSON.stringify(data);
    });
}

for (let i = 0; i <= 6; i++) {
    let key = `ban${i}_class`;
    socket.on(`dire_ban:${key}`, function (data) {
        document.getElementById(`dire_ban:${key}`).innerText = JSON.stringify(data);
    });
}



