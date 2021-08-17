//replace fields with data attributes
//change object to array

const displayController = (function () {

    function addFieldEntry(fieldid, symbol) {
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

    function displayStateObject(stateObject) {
        resetField();
        Object.entries(stateObject).forEach(([field, value]) => addFieldEntry(field, value));
    };

    return {displayStateObject};
})();


const gameBoard = (function () {
    let currentState;

    function resetState() {
        currentState = {
            field0 : none, field1 : none, field2 : none,
            field3 : none, field4 : none, field5 : none,
            field6 : none, field7 : none, field8 : none,
        };
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
