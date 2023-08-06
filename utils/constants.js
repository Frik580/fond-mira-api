const urlPattern =
  /https?:\/\/(w{3}\.)?([\w-]{1,}\.)+[\w._~:/?#[\]@!$&'()*+,;=]*#?/i;

//Строчные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 символов
const passwordPattern =
  /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

module.exports = { urlPattern, passwordPattern };
