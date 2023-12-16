var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var d2gsi = require('dota2-gsi');
const { log } = require('console');
var server = new d2gsi({
    port: 3000,
    tokens: ["production"]
});

app.use(express.static('public')); // Serve static files from 'public' directory

server.events.on('newclient', function (client) {
    console.log("New client connection, IP address: " + client.ip);
    if (client.auth && client.auth.token) {
        console.log("Auth token: " + client.auth.token);
    } else {
        console.log("No Auth token");
    }

    client.on('newdata', function (newdata) {
        if (newdata) {
            console.log(newdata);
            io.emit('newdata', newdata); // Emit the newdata to the client
        }
    })


    client.on('newdata', function (newdata) {
        try {
            if (newdata) {
                // console.log(newdata);

                // Deconstruct the newdata object
                const
                    {
                        activeteam,
                        pick,
                        activeteam_time_remaining,
                        radiant_bonus_time,
                        dire_bonus_time,
                        team2,
                        team3
                    } = newdata.draft;

                // console.log(activeteam);
                // console.log(pick);
                // console.log(activeteam_time_remaining);
                // console.log(radiant_bonus_time);
                // console.log(dire_bonus_time);
                // Emit the properties
                io.emit('activeteam', activeteam);
                io.emit('pick', pick);
                io.emit('activeteam_time_remaining', activeteam_time_remaining);
                io.emit('radiant_bonus_time', radiant_bonus_time);
                io.emit('dire_bonus_time', dire_bonus_time);

                const radiant_picks =
                    [
                        'pick0_class',
                        'pick1_class',
                        'pick2_class',
                        'pick3_class',
                        'pick4_class'
                    ];
                const dire_picks =
                    [
                        'pick0_class',
                        'pick1_class',
                        'pick2_class',
                        'pick3_class',
                        'pick4_class'
                    ];

                const radiant_bans =
                    [
                        'ban0_class',
                        'ban1_class',
                        'ban2_class',
                        'ban3_class',
                        'ban4_class',
                        'ban5_class',
                        'ban6_class'
                    ];
                const dire_bans =
                    [
                        'ban0_class',
                        'ban1_class',
                        'ban2_class',
                        'ban3_class',
                        'ban4_class',
                        'ban5_class',
                        'ban6_class'
                    ];

                // Emit team2 properties
                radiant_picks.forEach(key => {
                    if (team2.hasOwnProperty(key)) {
                        io.emit(`radiant_pick:${key}`, team2[key]);
                        // console.log(team2[key]);
                    }
                });

                dire_picks.forEach(key => {
                    if (team3.hasOwnProperty(key)) {
                        io.emit(`dire_pick:${key}`, team3[key]);
                        // console.log(team3[key]);
                    }
                });

                radiant_bans.forEach(key => {
                    if (team2.hasOwnProperty(key)) {
                        io.emit(`radiant_ban:${key}`, team2[key]);
                        // console.log(team2[key]);
                    }
                });

                dire_bans.forEach(key => {
                    if (team3.hasOwnProperty(key)) {
                        io.emit(`dire_ban:${key}`, team3[key]);
                        // console.log(team3[key]);
                    }
                });

            }
        } catch (error) {
            console.error('Error handling newdata', error);
        }
    });

});

http.listen(3001, function () { // Start the Express server on port 3001
    console.log('listening on *:3001');
});

