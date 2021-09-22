//получение данных из json
function getData() {
    return fetch('./db/db.json')
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('No data received, error: ' + response.status)
            }
        })
        .catch(err => {
            console.warn(err)
            document.body.innerHTML = '<div class="error">Error! Data not available</div>'
        })
}

export {getData}

