import createError from "http-errors";

// 400 Bad Request
export const badRequest = (err, res) => {
  const error = createError.BadRequest(err.message || "Bad Request");

  // Khi ở môi trường phát triển, trả về stack trace để dễ dàng debug
  if (process.env.NODE_ENV === "development") {
    return res.status(error.status).json({
      err: 1,
      mes: error.message,
      stack: err.stack,
    });
  }

  return res.status(error.status).json({
    err: 1,
    mes: error.message,
  });
};

// 500 Internal Server Error
export const internalServer = (res) => {
  const error = createError.InternalServerError();

  // Trả về lỗi chi tiết trong môi trường phát triển
  if (process.env.NODE_ENV === "development") {
    return res.status(error.status).json({
      err: 1,
      mes: error.message,
      stack: error.stack,
    });
  }

  return res.status(error.status).json({
    err: 1,
    mes: error.message,
  });
};

// 404 Not Found
export const notFound = (req, res) => {
  const error = createError.NotFound("This route is not defined!");

  return res.status(error.status).json({
    err: 1,
    mes: error.message,
  });
};
