function post(url, data={}) {
    return $.ajax({
        type: 'POST',
        url,
        data: JSON.stringify(data),
        contentType: "application/json",
    })
}

function get(url) {
    return $.ajax({
        type: 'get',
        url,
        contentType: "application/json",
    })
}