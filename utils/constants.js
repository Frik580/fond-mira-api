const urlPattern = /https?:\/\/(w{3}\.)?([\w-]{1,}\.)+[\w._~:/?#[\]@!$&'()*+,;=]*#?/i;

// Строчные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 символов
const passwordPattern = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const datePattern = /(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)\d\d/;

module.exports = { urlPattern, passwordPattern, datePattern };
