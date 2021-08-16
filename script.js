const displayController = (function () {

    function addFieldEntry(symbol, fieldid) {
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

    function removeFieldEntry(fieldid) {
        let field = document.querySelector(`#${fieldid} + p`);
        field.remove()
    };

    function resetField() {
        let allFields = document.querySelectorAll('.playboard p');
        allFields.forEach(field => field.remove());
    };

    return {addFieldEntry, resetField};
})();

