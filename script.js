document.addEventListener("DOMContentLoaded", () => {
    const socket = io();

    let name;
    let currentPlayer;

    const setElementDisplay = (id, displayStyle) => {
        document.getElementById(id).style.display = displayStyle;
    };

    const disableButton = (id) => {
        const button = document.getElementById(id);
        button.disabled = true;
        button.style.color = "black";
    };

    setElementDisplay("loading", "none");
    setElementDisplay("bigcont", "none");
    setElementDisplay("userCont", "none");
    setElementDisplay("oppNameCont", "none");
    setElementDisplay("valueCont", "none");
    setElementDisplay("whosTurn", "none");

    document.getElementById('find').addEventListener("click", function () {
        name = document.getElementById("name").value;
        document.getElementById("user").innerText = name;
        if (!name) {
            alert("Please enter a name");
        } else {
            socket.emit("find", { name: name });
            setElementDisplay("loading", "block");
            document.getElementById("find").disabled = true;
        }
    });

    socket.on("find", (e) => {
        let allPlayersArray = e.allPlayers;
        console.log("html", allPlayersArray);

        if (name) {
            setElementDisplay("userCont", "block");
            setElementDisplay("oppNameCont", "block");
            setElementDisplay("valueCont", "block");
            setElementDisplay("loading", "none");
            document.getElementById("name").style.display = "none";
            document.getElementById("find").style.display = "none";
            document.getElementById("enterName").style.display = "none";
            setElementDisplay("bigcont", "block");
            setElementDisplay("whosTurn", "block");
            document.getElementById("whosTurn").innerText = "X's Turn";
        }

        const foundObject = allPlayersArray.find(obj => obj.p1.p1name === name || obj.p2.p2name === name);
        const opponent = foundObject.p1.p1name === name ? foundObject.p2.p2name : foundObject.p1.p1name;
        const value = foundObject.p1.p1name === name ? foundObject.p1.p1value : foundObject.p2.p2value;

        currentPlayer = value;

        document.getElementById("oppName").innerText = opponent;
        document.getElementById("value").innerText = value;
    });

    document.querySelectorAll(".btn").forEach(e => {
        e.addEventListener("click", function () {
            const value = document.getElementById("value").innerText;
            const currentTurn = document.getElementById("whosTurn").innerText[0];

            if (currentTurn === value) {
                e.innerText = value;
                socket.emit("playing", { value: value, id: e.id, name: name });
            } else {
                alert("It's not your turn!");
            }
        });
    });

    socket.on("playing", (e) => {
        const foundObject = (e.allPlayers).find(obj => obj.p1.p1name === name || obj.p2.p2name === name);

        const p1id = foundObject.p1.p1move;
        const p2id = foundObject.p2.p2move;

        if (foundObject.sum % 2 === 0) {
            document.getElementById("whosTurn").innerText = "O's Turn";
        } else {
            document.getElementById("whosTurn").innerText = "X's Turn";
        }

        if (p1id) {
            disableButton(p1id);
            document.getElementById(p1id).innerText = "X";
        }
        if (p2id) {
            disableButton(p2id);
            document.getElementById(p2id).innerText = "O";
        }

        check(name, foundObject.sum);
    });

    function check(name, sum) {
        const btnValues = Array.from({ length: 9 }, (_, i) => document.getElementById(`btn${i + 1}`).innerText || null);

        const winningCombos = [
            [btnValues[0], btnValues[1], btnValues[2]],
            [btnValues[3], btnValues[4], btnValues[5]],
            [btnValues[6], btnValues[7], btnValues[8]],
            [btnValues[0], btnValues[3], btnValues[6]],
            [btnValues[1], btnValues[4], btnValues[7]],
            [btnValues[2], btnValues[5], btnValues[8]],
            [btnValues[0], btnValues[4], btnValues[8]],
            [btnValues[2], btnValues[4], btnValues[6]],
        ];

        const isWin = winningCombos.some(combo => combo.every(val => val === combo[0] && val));

        if (isWin || sum === 10) {
            socket.emit("gameOver", { name: name });
            setTimeout(() => {
                alert(isWin ? (sum % 2 === 0 ? "X WON !!" : "O WON !!") : "DRAW!!");
                setTimeout(() => location.reload(), 2000);
            }, 100);
        }
    }
});
