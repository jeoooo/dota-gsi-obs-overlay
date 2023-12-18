var socket = io();
socket.on('newdata', function (newdata) {
    document.getElementById('data').innerText = JSON.stringify(newdata);
});

socket.on('activeteam', function (newdata) {
    document.getElementById('activeteam').innerText = newdata;
});



socket.on('activeteam_time_remaining', function (newdata) {
    document.getElementById('activeteam_time_remaining').innerText = TimeFormatter.formatTime(newdata);
});
socket.on('radiant_bonus_time', function (newdata) {
    document.getElementById('radiant_bonus_time').innerText = TimeFormatter.formatTime(newdata);
});
socket.on('dire_bonus_time', function (newdata) {
    document.getElementById('dire_bonus_time').innerText = TimeFormatter.formatTime(newdata);
});

for (let i = 0; i <= 4; i++) {
    let key = `pick${i}_class`;
    let radiantPickListener = function (data) {
        let videoElement = document.getElementById(`radiant_pick:${key}_video`);
        let imageElement = document.getElementById(`radiant_pick:${key}_image`);
        let newSrc = data == "" ? `portraits/black_image.png` : `videos/npc_dota_hero_${data}.webm`;
        if (videoElement.src != newSrc) {
            if (data == "") {
                // Show image
                imageElement.src = newSrc;
                imageElement.style.display = 'block';
                videoElement.style.display = 'none';
            } else {
                // Show video
                videoElement.src = newSrc;
                videoElement.style.display = 'block';
                imageElement.style.display = 'none';
                // Stop listening to this event if data != ""
                socket.off(`radiant_pick:${key}`, radiantPickListener);
            }
        }
    };
    socket.on(`radiant_pick:${key}`, radiantPickListener);

    let direPickListener = function (data) {
        let videoElement = document.getElementById(`dire_pick:${key}_video`);
        let imageElement = document.getElementById(`dire_pick:${key}_image`);
        let newSrc = data == "" ? `portraits/black_image.png` : `videos/npc_dota_hero_${data}.webm`;
        if (videoElement.src != newSrc) {
            if (data == "") {
                // Show image
                imageElement.src = newSrc;
                imageElement.style.display = 'block';
                videoElement.style.display = 'none';
            } else {
                // Show video
                videoElement.src = newSrc;
                videoElement.style.display = 'block';
                imageElement.style.display = 'none';
                // Stop listening to this event if data != ""
                socket.off(`dire_pick:${key}`, direPickListener);
            }
        }
    };
    socket.on(`dire_pick:${key}`, direPickListener);
}

for (let i = 0; i <= 6; i++) {
    let key = `ban${i}_class`;
    socket.on(`radiant_ban:${key}`, function (data) {
        let imageElement = document.getElementById(`radiant_ban:${key}`);
        let newSrc = data == "" ? `portraits/black_image.png` : `portraits/${data}.png`;
        if (imageElement.src != newSrc) {
            imageElement.src = newSrc;
        }
    });

    socket.on(`dire_ban:${key}`, function (data) {
        let imageElement = document.getElementById(`dire_ban:${key}`);
        let newSrc = data == "" ? `portraits/black_image.png` : `portraits/${data}.png`;
        if (imageElement.src != newSrc) {
            imageElement.src = newSrc;
        }
    });
}