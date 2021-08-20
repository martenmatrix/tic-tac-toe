'use strict';

const Player = function(symbol) {
    let score = 0;

    function addPoint() {
        score += 1;
    };
};

const displayController = (function () {

    function addFieldEntry(symbol, fieldid) {
        let field = document.querySelector(`[data-index="${fieldid}"]`);
        let content = document.createElement('p');

        if (symbol === 'cross') {
            content.classList.add('cross');
            content.textContent = '+';
        } else if (symbol === 'circle') {
            content.classList.add('circle');
            content.textContent = 'O';
        };

        field.appendChild(content);
    };

    function resetField() {
        let allFields = document.querySelectorAll('.playboard p');
        allFields.forEach(field => field.remove());
    };

    function displayStateArray(stateArray) {
        resetField();
        stateArray.forEach((state, index) => addFieldEntry(state, index));
    };

    function markButtonSelected(object) {
        object.classList.toggle('selected');
    };

    function toggleDifficultySelector() {
        const difficultySelector = document.querySelector('.menu-start select');
        if(difficultySelector.style.display) {
            difficultySelector.style.display = '';
        } else {
            difficultySelector.style.display = 'block';
        };
    };
    
    function displayWinner(winner) {
        const announcementDiv = document.querySelector('.winner-announcement');
        const markMessage = document.querySelector('.winner-announcement .mark');
        const gameWrapper = document.querySelector('.wrapper');

        const showMessage = () => {
            markMessage.textContent = winner;
            announcementDiv.classList.add('fadein');
            gameWrapper.classList.add('blur');
        };

        const removeMessage = () => {
            announcementDiv.classList.remove('fadein');
            gameWrapper.classList.remove('blur');
        };

        showMessage();
        if (!announcementDiv.onclick) {
            announcementDiv.onclick = () => {
                game.reset();
                removeMessage();
            };
        };
    };

    return {resetField, displayStateArray, displayWinner, markButtonSelected, toggleDifficultySelector};
})();


const gameBoard = (function () {
    let currentState;

    function getState() {
        return currentState;
    }

    function resetState() {
        currentState = [null, null, null, 
                        null, null, null, 
                        null, null, null,]
    };

    function getRandomFieldID() {
        return Math.floor(Math.random() * 9);
    };

    function getEmptyFieldID() {       

        let isSingleFieldEmpty = currentState.some((element) => element === null);
        if(!isSingleFieldEmpty) return null;

        let currentid = getRandomFieldID();

        while (!isFieldEmpty(currentid)) {
            currentid = getRandomFieldID();
        };

        return currentid;
    };

    function isFieldEmpty(fieldid) {
        if (currentState[fieldid] === null) {
            return true;
        } else {
            return false;
        };
    };

    function setFieldSymbol(symbol, fieldid) {
        currentState[fieldid] = symbol;
    };


    function checkWinner(fieldid) {
        let currentPlayerWinner = false;

        const winnerCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
        
        const isSameState = (possibleCombination) => possibleCombination.every(index => currentState[index] === game.getCurrentMove());

        //for loop trough every array
        let possibleCombinations = winnerCombinations.filter(combination => combination.includes(fieldid));

        //check for every possible combinations, iterate trough array in array if all fields are equal to the current player return winner
        currentPlayerWinner = possibleCombinations.some(possibleCombination => isSameState(possibleCombination));

        return currentPlayerWinner;
    };

    return {getState, resetState, setFieldSymbol, isFieldEmpty, checkWinner, getRandomFieldID, getEmptyFieldID};
})();

const minmax = (function () {

    const aiMark = 'cross';
    const humanMark = 'circle';

    function _getPossibleMovesIDs(currentState) {
        let freeIDs = [];

        currentState.forEach((item, index) => {
            if (item === null) freeIDs.push(index);
        });

        return freeIDs;
    };
    
    function _checkWinner(currentState, currentMark) {
        const winnerCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
        

        const isSameState = (possibleCombination) => possibleCombination.every(index => currentState[index] === currentMark);

        //check for every possible combinations, iterate trough array in array if all fields are equal to the current player return winner
        const currentPlayerWinner = winnerCombinations.some(possibleCombination => isSameState(possibleCombination));

        if (currentPlayerWinner) {
            return true;
        } else {
            return false;
        };
    };

    //currentState = ["circle", "circle", null,
    //               "cross", "cross", "circle",
    //                "cross", null, null]

    function findBestMove(currentState) {
        
        let bestScore = -Infinity;
        let bestMove = null;
        let freeIndexes = _getPossibleMovesIDs(currentState);


        freeIndexes.forEach(possibleMove => {
            currentState[possibleMove] = 'cross';
            let currentScore = minimax(currentState, 0, false)
            currentState[possibleMove] = null;
            if (currentScore > bestScore) {
                bestScore = currentScore;
                bestMove = possibleMove;
            };
        });
        return bestMove;
    };


    function minimax(currentState, depth, isMaximizingPlayer) {
        let score;

        //check if terminal state
        //ai won
        if (_checkWinner(currentState, aiMark)) return score = 1;
        //human won
        if (_checkWinner(currentState, humanMark)) return score = -1;
        //tie
        let freeIndexes = _getPossibleMovesIDs(currentState);
        if(freeIndexes.length === 0) return score = 0;

        if (isMaximizingPlayer) {
            let bestVal = -Infinity;

            let possibleMoves = _getPossibleMovesIDs(currentState);
            possibleMoves.forEach(possibleMove => {

                currentState[possibleMove] = aiMark;
                let value = minimax(currentState, depth+1, false);
                currentState[possibleMove] = null;

                bestVal = Math.max(bestVal, value);

            });
            return bestVal;

            

        } else {
            let bestVal = Infinity;

            let possibleMoves = _getPossibleMovesIDs(currentState);
            possibleMoves.forEach(possibleMove => {

                currentState[possibleMove] = humanMark;
                let value = minimax(currentState, depth+1, true);
                currentState[possibleMove] = null;


                bestVal = Math.min(bestVal, value);

            });
            return bestVal;
        };
    };

    return {findBestMove}

})();

const game = (function () {
    
    const player = Player('circle');
    const computer = Player('cross');

    //first move has circle
    let currentMove = 'circle';
    let againstRobot = false;
    let currentRound = 0;

    let buttonLocked = false;

    function changeMove() {
        if (currentMove === 'circle') {
            currentMove = 'cross';
        } else {
            currentMove = 'circle';
        };
    };

    function toggleRobot() {
        if (againstRobot) {
            againstRobot = false;
        } else {
            againstRobot = true;
        };
    };

    function getCurrentMove() {
        return currentMove;
    };

    function getCurrentRound() {
        return currentRound;
    }

    //creates the state array upon execution
    gameBoard.resetState();

    //resets the array and display
    function reset() {
        currentMove = 'circle';
        currentRound = 0;
        buttonLocked = false;
        displayController.resetField()
        gameBoard.resetState();
    };


    function addRound() {
        currentRound += 1;
    };

    //changes the array, and displays the array
    function setMove(symbol, fieldid) {
        fieldid = parseInt(fieldid);
        gameBoard.setFieldSymbol(symbol, fieldid);
        displayController.displayStateArray(gameBoard.getState());
    };

    function isWinner(fieldid) {
        //checks if current player won
        if (gameBoard.checkWinner(fieldid)) {
            displayController.displayWinner((gameBoard.getState())[fieldid] === 'circle' ? 'O' : 'X');
            return true;
        } else if (currentRound === 9) {
            displayController.displayWinner('DRAW');
            return true;
        };

        return false;
    };

    const fields = document.querySelectorAll('.playfield');
    fields.forEach(field => field.addEventListener('click', (e) => {
        let fieldidString = e.target.getAttribute('data-index');
        let fieldid = parseInt(fieldidString);

        if (!gameBoard.isFieldEmpty(fieldid)) return;
        buttonLocked = true;
        addRound();
        setMove(currentMove, fieldid);
        let isOneWinner = isWinner(fieldid);
        changeMove();

        if (againstRobot && !isOneWinner) {
            addRound();

            const difficultySelector = document.querySelector('.menu-start select');
            let difficulty = difficultySelector.value;

            let fieldid;
            //if difficulty set to unbeatable, do recursive algorithm, else choose random field
            if (difficulty === 'unbeat') {
                let bestMove = minmax.findBestMove(gameBoard.getState());
                fieldid = bestMove;
            } else {
                fieldid = gameBoard.getEmptyFieldID();
            };

            if (fieldid === null) return;
            setMove(currentMove, fieldid);
            isOneWinner = isWinner(fieldid);
            changeMove();
        };
    }));

    const restartButton = document.querySelector('.menu-end button');
    restartButton.onclick = () => reset();

    const toggleRobotButton = document.querySelector('.menu-start button');
    toggleRobotButton.onclick = () => {
        if(buttonLocked) return;
        displayController.toggleDifficultySelector();
        displayController.markButtonSelected(toggleRobotButton);
        toggleRobot();
    };

    return {getCurrentMove, getCurrentRound, reset};
})();
