

function validationError(res, statusCode) {
  statusCode = statusCode || 422
  return function(err) {
    return res.status(statusCode).json(err)
  }
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity)
    }
    return null
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500
  return function(err) {
    console.log("The error in handleError:", err)
    return res.status(statusCode).send(err)
  }
}
