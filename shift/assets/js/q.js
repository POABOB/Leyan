function post(url, data={}) {
    return $.ajax({
        type: 'POST',
        url,
        data: JSON.stringify(data),
        contentType: "application/json",
    })
}

function postImg(url, data={}) {
    return $.ajax({
        type: 'POST',
        url,
        processData: false,
        contentType: false,
        data: data
    })
}

function get(url) {
    return $.ajax({
        type: 'get',
        url,
        contentType: "application/json",
    })
}