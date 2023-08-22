const BAD_REQUEST = 'Переданы некорректные данные';
const UNAUTHORIZED = 'Неправильные почта или пароль';
const NOT_FOUND = 'Страница не найдена';

const NOT_FOUND_TEXT = 'Текст с указанным id не найден';
const BAD_REQUEST_TEXT = 'Некорректный id текста';
const CONFLICT_ERROR_SLUG = 'Такой slag уже существует';
const CONFLICT_ERROR_IMAGE = 'Указанная ссылка на картинку повторяется';

const CONFLICT_ERROR_ADMIN = 'Такой админ уже существует';
const BAD_REQUEST_ADMIN = 'Переданы некорректные данные';
const NOT_FOUND_ADMIN = 'Админ с указанным id не найден';

// const NOT_FOUND_USER = 'Пользователь с указанным id не найдена';
// const BAD_REQUEST_USER = 'Некорректный id карточки';
// const CONFLICT_ERROR_USER = 'Такой пользователь уже существует';
// const CONFLICT_ERROR_USER_EMAIL = 'Этот email занят другим пользователем';

module.exports = {
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  NOT_FOUND_TEXT,
  BAD_REQUEST_TEXT,
  CONFLICT_ERROR_SLUG,
  CONFLICT_ERROR_IMAGE,
  CONFLICT_ERROR_ADMIN,
  BAD_REQUEST_ADMIN,
  NOT_FOUND_ADMIN,
// NOT_FOUND_USER,
// BAD_REQUEST_USER,
// CONFLICT_ERROR_USER,
// CONFLICT_ERROR_USER_EMAIL,
};
