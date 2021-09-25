import {getData} from './modules/getData.js'
import {renderCell, renderPagination} from './modules/renderTable.js'
import {eventSortTable} from './modules/sortTable.js'
import {editTableData} from './modules/editTableData.js'
import {hiddenColumn, hiddenAllColumn, showAllColumn} from './modules/heddenColumns.js'


//отресовывает таблицу при изменении размера окна
window.addEventListener('resize', () => {
    getData().then((jsonData) => {
        renderCell(JSON.parse(localStorage.getItem(jsonData)))
    })
})


//Получаем данные, потом выполняться остальные функции
getData().then((jsonData) => {
    renderCell(jsonData)
    renderPagination(jsonData)
    eventSortTable()
    editTableData(jsonData)
    hiddenAllColumn()
    hiddenColumn()
    showAllColumn()
})