import {getData} from './getData.js'
import {renderCell} from './renderTable.js'

const btnHidden = document.querySelector('.btn-hidden_all'),
    tableData = document.querySelector('.container'),
    pointsHidden = document.querySelectorAll('[data-hidden]'),
    table = document.querySelector('.table'),
    hiddenBtns = document.querySelectorAll('.btn-hidden'),
    blockColor = document.getElementById('block'),
    btnShow = document.querySelector('.btn-show_all')


//функция показывает или прячет содержимое страницы или коллонок
function hiddenAllColumn() {
// Скрытие всех элементов, кроме фильтров
    btnHidden.addEventListener('click', () => {
        if (!tableData.dataset.hidden || tableData.dataset.hidden === 'off') {
            tableOn()
            let hiddenClass = ['hidden-1', 'hidden-2', 'hidden-3', 'hidden-4']
            table.classList.add(...hiddenClass)
            pointsHidden.forEach((item) => {
                item.setAttribute('data-hidden', 'on')
            })
        }
    })
}

function showAllColumn() {
    btnShow.addEventListener('click', () => {
        if (tableData.dataset.hidden === 'on') {
            tableOff()
            let hiddenClass = ['hidden-1', 'hidden-2', 'hidden-3', 'hidden-4']
            table.classList.remove(...hiddenClass)
            pointsHidden.forEach((item) => {
                item.setAttribute('data-hidden', 'off')
            })
        }
    })
}

//Скрытитие выбранной колонки
function hiddenColumn() {
    hiddenBtns.forEach((item, i) => {
        item.addEventListener('click', () => {
            //проверка чему равен data-hidden у span внутри кнопки, которая содержит в себе иконку "показать/скрыть"
            if (item.children[0].dataset.hidden === 'off') {
                item.children[0].setAttribute('data-hidden', 'on') //заменяет иконку "показать" на иконку "скрыть"
                table.classList.add(`hidden-${i + 1}`)
                if (table.matches('.hidden-1.hidden-2.hidden-3.hidden-4')) {
                    tableOn()
                }

            } else if (item.children[0].dataset.hidden === 'on') {

                item.children[0].setAttribute('data-hidden', 'off')//заменяет иконку "скрыть" на иконку "показать"
                table.classList.remove(`hidden-${i + 1}`)
                tableOff()
            }

            //перерисовывает таблицу при скрытии колонки
            getData().then((jsonData) => {
                renderCell(JSON.parse(localStorage.getItem(jsonData)))
            })
        })
    })
}

function tableOn() {
    tableData.setAttribute('data-hidden', 'on')
    tableData.style.display = 'none'
    blockColor.style.display = ''
}

function tableOff() {
    tableData.setAttribute('data-hidden', 'off')
    tableData.style.display = ''
    blockColor.style.display = 'none'
}

export {hiddenColumn, hiddenAllColumn, showAllColumn}