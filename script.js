const gameBoard = (function () {

    function populateBoard(symbol, fieldid) {
        let field = document.querySelector(`#${fieldid}`);
        let content = document.createElement('p');

        if (symbol === 'cross') {
            content.classList.add('cross');
            content.textContent = '+';
        } else if (symbol === 'circle') {
            content.classList.add('cross');
            content.textContent = '◯';
        };

        field.appendChild(content);
    };

    function resetBoard(symbol, fieldid) {

    };

    const allFields = document.querySelectorAll('.playfield');
    allFields.forEach(field => field.addEventListener('click', (e) => console.log(e.target)));

})();