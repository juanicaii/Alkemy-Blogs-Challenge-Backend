module.exports = WithoutError;

function WithoutError(res, message, content, status = 200) {
  return res.status(status).json({ message, content });
}
