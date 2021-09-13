import {getData} from './getData.js';
import {renderCell} from './renderTable.js';

//функция показывает или прячет содержимое страницы или коллонок
function hiddenAllColumn() {
    const btnHidden = document.querySelector('.btn-hidden_all'),
        tableData = document.querySelector('.container');
// Скрытие всех элементов, кроме фильтров
    btnHidden.addEventListener('click', () => {
        if (!tableData.dataset.hidden || tableData.dataset.hidden === 'off') {
            tableData.setAttribute('data-hidden', 'on');
            btnHidden.innerHTML = 'Show All';
            tableData.style.display = 'none';
        } else if (tableData.dataset.hidden === 'on') {
            tableData.setAttribute('data-hidden', 'off');
            btnHidden.innerHTML = 'Hide All';
            tableData.style.display = '';
        }
    });
}

//Скрытитие выбранной колонки
function hiddenColumn() {
    const hiddenBtns = document.querySelectorAll('.btn-hidden'),
        table = document.querySelector('.table');

    hiddenBtns.forEach((item, i) => {
        item.addEventListener('click', () => {
            //проверка чему равен data-hidden у span внутри кнопки, которая содержит в себе иконку "показать/скрыть"
            if (item.children[0].dataset.hidden === 'off') {
                item.children[0].setAttribute('data-hidden', 'on'); //заменяет иконку "показать" на иконку "скрыть"
                table.classList.add(`hidden-${i + 1}`);
            } else if (item.children[0].dataset.hidden === 'on') {
                item.children[0].setAttribute('data-hidden', 'off'); //заменяет иконку "скрыть" на иконку "показать"
                table.classList.remove(`hidden-${i + 1}`);
            }

            //перерисовывает таблицу при скрытии колонки
            getData().then((jsonData) => {
                renderCell(JSON.parse(localStorage.getItem(jsonData)));
            });
        })
    })
}

export {hiddenColumn, hiddenAllColumn};