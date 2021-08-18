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
            announcementDiv.onclick = () => removeMessage();
        };
    };

    return {resetField, displayStateArray, displayWinner, markButtonSelected};
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

    function getFieldEmpty(fieldid) {
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

    return {getState, resetState, setFieldSymbol, getFieldEmpty, checkWinner, getRandomFieldID};
})();

const game = (function () {
    
    const player = Player('circle');
    const computer = Player('cross');

    //first move has circle
    let currentMove = 'circle';
    let againstRobot = false;
    let currentRound = 0;

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

    function setRandomMove() {
        let fieldid = gameBoard.getRandomFieldID();
         
        while (!(gameBoard.getFieldEmpty(fieldid))) {
            fieldid = gameBoard.getRandomFieldID();
        };

        setMove(currentMove, fieldid);
    };

    //creates the state array upon execution
    gameBoard.resetState();

    //resets the array and display
    function reset() {
        currentRound = 0;
        displayController.resetField()
        gameBoard.resetState();
    };

    //checks if field is empty, changes the array, and displays the array
    function setMove(symbol, fieldid) {
        fieldid = parseInt(fieldid);
        currentRound += 1;

        let currentState = gameBoard.getState();

        if (!gameBoard.getFieldEmpty(fieldid)) return;
        gameBoard.setFieldSymbol(symbol, fieldid);
        displayController.displayStateArray(currentState);
        
        //checks if current player won
        if (gameBoard.checkWinner(fieldid)) {
            displayController.displayWinner(currentState[fieldid] === 'circle' ? 'O' : 'X');
            reset();
        } else if (currentRound === 9) {
            displayController.displayWinner('DRAW');
            reset();
        };

        changeMove();

        if (againstRobot) {
            currentRound += 1;
            setRandomMove();
            changeMove();
            return;
        };
    };

    const fields = document.querySelectorAll('.playfield');
    fields.forEach(field => field.addEventListener('click', (e) => {
        setMove(currentMove, e.target.getAttribute('data-index'));
    }));

    const restartButton = document.querySelector('.menu-end button');
    restartButton.onclick = () => reset();

    const toggleRobotButton = document.querySelector('.menu-start button');
    toggleRobotButton.onclick = () => {
        displayController.markButtonSelected(toggleRobotButton);
        toggleRobot();
    };

    return {getCurrentMove};
})();
