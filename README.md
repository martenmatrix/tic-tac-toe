# Tic Tac Toe

In this application, users are able to play Tic Tac Toe against another human or against the computer, which is unbeatable because it uses Artificial Intelligence.

The algorithm used by the AI is a backtracking algorithm called Minimax and works like this: After the opponent plays his move, the computer places the symbol of the enemy at every available spot (one at a time) and then calls the `minimax()` function with the new simulated state of the board.

The `minimax()` function either returns `0`, `1` or, `-1` and accepts three arguments: the state of the current board, the depth and if it's the turn of the maximizing player (the computer).

The `minimax()` function is recursive and works like this:
1. Create a `score` variable with nothing assigned to it.
2. Check if AI won, if yes set score to `1` and return `1`.
3. Check if human won, if yes set score to `-1` and return `-1`.
4. If no fields are empty, return `0` and set score to `0`.
5. Then the function places the symbol of the computer/human at every            empty spot (one at a time) and calls itself and saves its return value to the `value` variable.
6. Depending on, if it's the computer's turn (maximizer) or the human's turn (minimizer) the computer either returns the biggest number or the smallest one.
> :bulb: Keep in mind that only 0, 1 or -1 can be returned, so if two moves would lead to a path, which results in a win for the maximizing player, whatever was calculated at the end would be used as the next move. The computer does not prefer the shorter way to a win because it does ignore the depth in the calculation.

## Table of Contents
- [Deployed links](#globe_with_meridians-deployed-links)
- [Usage](#grey_exclamation-usage)
- [Features](#sparkles-features)
- [Installation](#wrench-installation)
- [Technology stack](#blue_book-technology-stack)
- [License](#scroll-license)

## :globe_with_meridians: Deployed links

The application is hosted at the following address:

- https://martenmatrix.github.io/tic-tac-toe/

## :grey_exclamation: Usage
1. Click the button above the board, if you want to play against the computer.
	1. Use the select element in the top left corner to choose between two difficulties. 
		>*Easy: Computer chooses randomly*.
		
		>*Unbeatable: Computer uses an AI to find the perfect move.*
2. Click a tile to place a mark.
5. Enjoy your game. :tada:
If something does not work as expected, please [create an issue](https://github.com/martenmatrix/tic-tac-toe/issues/new).
	> :bulb: If you want to restart the game, press the button below the board.

## :sparkles: Features
- play tic-tac-toe against a computer, which places random moves or uses an AI
- play tic-tac-toe against a friend
- restart the game at any time

## :wrench: Installation
If you want to run the application on your local pc or just want to contribute, do the following steps:
1. Clone the repository.
`git clone https://github.com/martenmatrix/tic-tac-toe`
2. Open up `index.html` or use an application like [Liver Server for VSC](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for your IDE to load the page.

## :blue_book: Technology Stack
This application is written in vanilla JavaScript.

## :scroll: License
[MIT](https://github.com/martenmatrix/tic-tac-toe/blob/main/LICENSE)
