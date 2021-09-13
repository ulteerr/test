import {renderCell} from './renderTable.js';
import {splitArray} from './splitArray.js';

//Форма редактирования
function editTableData(jsonData) {
    const table = document.querySelector('table'),
        editForm = document.querySelector('.form-wrapper'),
        inputs = editForm.querySelectorAll('input'),
        textarea = editForm.querySelector('textarea'),
        btnEdit = editForm.querySelector('.btn-edit'),
        btnClose = editForm.querySelector('.btn-close');

    let CHANGE_ROW; // строка tr которую нужно будет редактировать

    //Используется делегирование событий. При клике на таблицу получает строку по которой кликнули и отображает рядом с ней форму редактирования
    table.addEventListener('click', function (event) {
        const row = event.target.closest('.data-row'); //возвращает ближайщего предка соответствующего селектору.

        CHANGE_ROW = row;

        if (!row) return; //проверка, содержит ли в себе event.target строку row
        if (!table.contains(row)) return; //проверка, прендалежит ли row нашей таблице.
        // При клике появляется форма
        editForm.style.cssText = `display: block;  top: ${row.offsetTop}px; left: ${row.offsetWidth + 20}px;`
        // Создаем функцию, что бы можно было передвигать форму, как нам удобно
        editForm.onmousedown = function(event) {
        // Чтобы получить сдвиг, мы вычитаем координаты:
            let shiftX = event.clientX - editForm.getBoundingClientRect().left;
            let shiftY = event.clientY - editForm.getBoundingClientRect().top;



            moveAt(event.pageX, event.pageY);

            // переносит форму на координаты (pageX, pageY),
            // дополнительно учитывая изначальный сдвиг относительно указателя мыши
            function moveAt(pageX, pageY) {
                editForm.style.left = pageX - shiftX + 'px';
                editForm.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            // передвигаем форму при событии mousemove
            document.addEventListener('mousemove', onMouseMove);

            // отпустить форму, удалить ненужные обработчики
            editForm.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                editForm.onmouseup = null;
            };

        };
        // Убираем раздваивание, если оно будет присутсвовать
        editForm.ondragstart = function() {
            return false;
        };
        // Заполняем форму значениями
        inputs[0].value = row.cells[0].innerHTML;
        inputs[1].value = row.cells[1].innerHTML;
        textarea.value = row.cells[2].innerHTML.slice(0, row.cells[2].innerHTML.length - 3);
        // Чтобы не было в поле с цветом лишних элементов и пробелов
        inputs[2].value = row.cells[3].firstChild.style.cssText.replace('fill:', '').slice(0, -1)
            .split(' ').join('');

    });

    //При нажатии на кнопку редактирования btnEdit содержимое ячеек строки заменяется на содержимое формы
    btnEdit.addEventListener('click', () => {
        const jsonData = JSON.parse(localStorage.getItem('jsonData'));

        //узнаем длину массива, что бы узнать arraySize из функции splitArray. На случай если сделаю чтобы юзер задавал значение arraySize
        const rowAmount = splitArray(jsonData.JSON).length;
        const editedRow = {
            id: CHANGE_ROW.id,
            name: {
                firstName: inputs[0].value,
                lastName: inputs[1].value,
            },
            phone: null,
            about: textarea.value,
            eyeColor: inputs[2].value,
        }

        let editedRowIndex = 0;

        jsonData.JSON.forEach((item, i, arr) => {
            if (item.id === CHANGE_ROW.id) {
                arr.splice(i, 1, editedRow);
                editedRowIndex = i + 1;
            }
        })

        localStorage.setItem(jsonData, JSON.stringify(jsonData));
        editForm.style = '';

        renderCell(jsonData, Math.ceil(editedRowIndex / (jsonData.JSON.length / rowAmount))); // (jsonData.length / rowAmount) - arraySize из функции splitArray
    });

    btnClose.addEventListener('click', () => editForm.style = ''); // закрывает форму редактирования.
}

export {editTableData};