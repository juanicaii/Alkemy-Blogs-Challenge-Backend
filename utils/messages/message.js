module.exports = { messageWithoutError, messageWithError };

function messageWithoutError(res, message, content, status = 200) {
  return res.status(status).json({ message, content });
}

function messageWithError(res, message, status) {
  return res.status(status).json({ message, content: null });
}
