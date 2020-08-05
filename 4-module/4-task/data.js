import fetchJson from '../../utils/fetch-json.js';
/** URL адрес API */
export const API_URL = 'https://course-vue.javascript.ru/api';

/**
 * Выполняет авторизацию по логину и паролю и возвращает результат
 * @param {string} email - email пользователя
 * @param {string} password - пароль пользователя
 * @return {Promise} - объект с данными пользователя
 */
export async function login(email, password) {
  try {
    return await fetchJson(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  } catch (error) {
    switch (error.body.statusCode) {
      case 401:
        throw new Error('Вы не авторизованы');
      case 403:
        throw new Error(error.body.message);
      default:
        throw new Error('Не известная ошибка');
    }
  }
}

/**
 * Выполняет авторизацию по логину и паролю и возвращает результат
 * @param {string} email - email пользователя
 * @param {string} fullname - полное имя пользователя
 * @param {string} password - пароль пользователя
 * @return {Promise} - объект с данными зарегистрированного пользователя
 */
export async function register(email, fullname, password) {
  try {
    return await fetchJson(`${API_URL}/auth/register`, {
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
  } catch (error) {
    switch (error.body.statusCode) {
      case 401:
        throw new Error('Вы не авторизованы');
      case 403:
        throw new Error(error.body.message);
      default:
        throw new Error('Не известная ошибка');
    }
  }
}
