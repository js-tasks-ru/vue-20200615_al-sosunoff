/** URL адрес API */
export const API_URL = 'https://course-vue.javascript.ru/api';

/**
 * Выполняет авторизацию по логину и паролю и возвращает результат
 * @param {string} email - email пользователя
 * @param {string} password - пароль пользователя
 * @return {Promise} - объект с данными пользователя
 */
export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  let json = await response.json();
  return json;
}

/**
 * Выполняет авторизацию по логину и паролю и возвращает результат
 * @param {string} email - email пользователя
 * @param {string} fullname - полное имя пользователя
 * @param {string} password - пароль пользователя
 * @return {Promise} - объект с данными зарегистрированного пользователя
 */
export async function register(email, fullname, password) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      email,
      fullname,
      password,
    }),
  });

  let json = await response.json();
  return json;
}
