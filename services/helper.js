export function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

export function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

export function result(res, response, statusCode = 200) {
  res.status(statusCode).json(response);
}

export default {
  getOffset,
  emptyOrRows,
  result
};
