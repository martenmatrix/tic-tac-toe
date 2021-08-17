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

    function displayStateObject(stateArray) {
        resetField();
        stateArray.forEach((state, index) => addFieldEntry(index, state));
    };

    return {displayStateObject};
})();


const gameBoard = (function () {
    let currentState;

    function resetState() {
        currentState = ['', '', '', '', '', '', '', '', '',]
    };
    function getFieldEmpty(fieldid) {
        if (!currentState[fieldid]) {
            return true;
        } else {
            return false;
        };
    };

    function setFieldSymbol(fieldid, symbol) {
        currentState[fieldid] = symbol;
    };
})();

const player = function(symbol) {
    let score = 0;
};
