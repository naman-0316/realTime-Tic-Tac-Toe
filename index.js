const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("")));

let arr = [];
let playingArray = [];

io.on("connection", (socket) => {
    socket.on("find", (e) => {
        if (e.name) {
            arr.push(e.name);

            if (arr.length >= 2) {
                const p1obj = { p1name: arr[0], p1value: "X", p1move: "" };
                const p2obj = { p2name: arr[1], p2value: "O", p2move: "" };

                const gameObj = { p1: p1obj, p2: p2obj, sum: 1 };
                playingArray.push(gameObj);

                arr.splice(0, 2);
                io.emit("find", { allPlayers: playingArray });
            }
        }
    });

    socket.on("playing", (e) => {
        const gameObj = playingArray.find(obj => obj.p1.p1name === e.name || obj.p2.p2name === e.name);

        if ((gameObj.sum % 2 === 1 && e.value === "X") || (gameObj.sum % 2 === 0 && e.value === "O")) {
            if (e.value === "X") {
                gameObj.p1.p1move = e.id;
            } else if (e.value === "O") {
                gameObj.p2.p2move = e.id;
            }

            gameObj.sum++;
            io.emit("playing", { allPlayers: playingArray });
        }
    });

    socket.on("gameOver", (e) => {
        playingArray = playingArray.filter(obj => obj.p1.p1name !== e.name);
    });
});

app.get("/", (req, res) => res.sendFile("index.html"));

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
