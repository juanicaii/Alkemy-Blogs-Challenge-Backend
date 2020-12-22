module.exports = WithoutError;

function WithoutError(res, content, status = 200) {
  return res.status(status).json(content);
}
