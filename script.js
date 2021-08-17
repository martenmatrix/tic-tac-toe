//replace fields with data attributes
//change object to array
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

    return {resetField, displayStateArray};
})();


const gameBoard = (function () {
    let currentState;

    function getState() {
        return currentState;
    }

    function resetState() {
        currentState = [null, null, null, null, null, null, null, null, null,]
    };

    function getFieldEmpty(fieldid) {
        if (!currentState[fieldid]) {
            return true;
        } else {
            return false;
        };
    };

    function setFieldSymbol(symbol, fieldid) {
        currentState[fieldid] = symbol;
    };

    return {getState, resetState, setFieldSymbol, getFieldEmpty};
})();


const game = (function () {

    //creates the state array upon execution
    gameBoard.resetState();

    //resets the array and display
    function reset() {
        displayController.resetField()
        resetState();
    };

    //checks if field is empty, changes the array, and displays the array
    function setMove(symbol, fieldid) {
        if (!gameBoard.getFieldEmpty) return;
        gameBoard.setFieldSymbol(symbol, parseInt(fieldid));
        displayController.displayStateArray(gameBoard.getState());
    };

    const fields = document.querySelectorAll('.playfield');
    fields.forEach(field => field.addEventListener('click', (e) => setMove(currentSymbol, e.target.getAttribute('data-index'))));

})();

const player = function(symbol) {
    let score = 0;
    

    function addPoint() {
        score += 1;
    };
};
