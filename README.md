# Real Time Tic-Tac-Toe Game with WebSockets

This project is a multiplayer Tic-Tac-Toe game built with HTML, CSS, JavaScript, Node.js, and Socket.IO. Players can join the game, get matched with an opponent, and play Tic-Tac-Toe in real-time.

## Features

- **Real-Time Gameplay**: Experience seamless real-time gameplay with WebSockets using Socket.IO.
- **Player Matching**: Get automatically matched with an opponent when you search for a player.
- **Turn-Based System**: Ensure fair play with an enforced turn-based system.
- **Responsive Design**: Enjoy a clean and responsive user interface.

## How to Run

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/real-time-tic-tac-toe.git
    cd real-time-tic-tac-toe
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Start the Server**:
    ```bash
    node index.js
    ```

4. **Open the Game in Your Browser**:
    Navigate to `http://localhost:3000` in your web browser.

## Project Structure

- **index.html**: The main HTML file containing the structure of the game interface.
- **style.css**: The CSS file for styling the game interface.
- **index.js**: The Node.js server file managing connections, game state, and player interactions.
- **script.js**: The client-side JavaScript file handling the game logic and communication with the server.
- **loading.gif**: A loading animation displayed while searching for an opponent.

## How It Works

1. **Player Name Input**: Enter your name and click "Search for a player" to get matched with an opponent.

2. **Matching**: The server matches you with another player.

3. **Gameplay**: Take turns to place your mark (X or O) on the grid. Only the player whose turn it is can make a move.

4. **Win or Draw**: The game checks for win or draw conditions and displays the result. The game restarts after a short delay.

## Contributions

Contributions are welcome! Feel free to fork the repository and submit pull requests. 

## License
No License

---


