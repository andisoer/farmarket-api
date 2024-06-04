function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

function response(res, response, next, statusCode = 200) {
    res.status(statusCode).json(response);
}

module.exports = {
    getOffset,
    emptyOrRows,
    response
}
